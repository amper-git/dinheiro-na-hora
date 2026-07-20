// Supabase Edge Function — disparada quando um agendamento é criado.
// Cria o evento no Google Calendar, envia e-mail e WhatsApp de confirmação.
// As chaves secretas ficam nos SECRETS do Supabase, nunca no frontend.
//
// Deploy:  supabase functions deploy agendamento-webhook
// Secrets: supabase secrets set GOOGLE_SA_JSON=... RESEND_API_KEY=... \
//          WHATSAPP_TOKEN=... WHATSAPP_PHONE_ID=... CALENDAR_ID=...
//
// Gatilho: crie um Database Webhook (Supabase → Database → Webhooks) na tabela
// `agendamentos`, evento INSERT, apontando para a URL desta function.

import { serve } from "https://deno.land/std@0.208.0/http/server.ts";

const DISCLAIMER =
  "Importante: a vistoria é uma etapa de avaliação e não garante a aprovação do crédito. " +
  "O valor final depende da análise do veículo e da documentação.";

serve(async (req) => {
  try {
    const { record } = await req.json();               // linha inserida
    const { whatsapp, email, plate, data, hora, valor } = record;
    const inicio = new Date(`${data}T${hora}:00-03:00`); // horário de Brasília
    const fim = new Date(inicio.getTime() + 40 * 60000); // 40 min

    // 1) Google Calendar — cria o evento na sua agenda
    await criarEventoCalendar({ plate, email, inicio, fim, valor });

    // 2) E-mail de confirmação (Resend)
    await enviarEmail({ email, plate, inicio, valor });

    // 3) WhatsApp de confirmação (WhatsApp Cloud API)
    await enviarWhatsApp({ whatsapp, plate, inicio });

    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ ok: false, error: String(e) }), {
      status: 500, headers: { "Content-Type": "application/json" },
    });
  }
});

// ---- Google Calendar via service account (JWT) ----
async function criarEventoCalendar({ plate, email, inicio, fim, valor }) {
  const sa = JSON.parse(Deno.env.get("GOOGLE_SA_JSON")!);
  const token = await getGoogleToken(sa, "https://www.googleapis.com/auth/calendar");
  const calendarId = Deno.env.get("CALENDAR_ID") || "primary";

  const evento = {
    summary: `Vistoria Amper — placa ${plate}`,
    location: Deno.env.get("ENDERECO_VISTORIA") || undefined,
    description:
      `Agendamento de vistoria (Dinheiro na Hora).\n` +
      `Placa: ${plate}\nValor pré-aprovado: R$ ${valor}\nContato: ${email}\n\n${DISCLAIMER}`,
    start: { dateTime: inicio.toISOString(), timeZone: "America/Sao_Paulo" },
    end:   { dateTime: fim.toISOString(),    timeZone: "America/Sao_Paulo" },
    // Sem `attendees`: uma service account não pode convidar participantes sem
    // domain-wide delegation (retorna 403 forbiddenForServiceAccounts).
    // O cliente é avisado pelo e-mail do Resend e pelo WhatsApp.
  };

  const r = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`,
    { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(evento) });
  if (!r.ok) throw new Error(`Calendar: ${await r.text()}`);
}

// Assina um JWT e troca por access_token (service account, sem libs externas)
async function getGoogleToken(sa: any, scope: string) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const claim = { iss: sa.client_email, scope, aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600 };
  const enc = (o: any) => btoa(JSON.stringify(o)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  const unsigned = `${enc(header)}.${enc(claim)}`;

  const keyData = sa.private_key.replace(/-----[^-]+-----|\s/g, "");
  const bin = Uint8Array.from(atob(keyData), (c) => c.charCodeAt(0));
  const key = await crypto.subtle.importKey("pkcs8", bin,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(unsigned));
  const jwt = `${unsigned}.${btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}`;

  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}` });
  const j = await r.json();
  if (!j.access_token) throw new Error(`Google token: ${JSON.stringify(j)}`);
  return j.access_token;
}

// ---- E-mail (Resend) ----
async function enviarEmail({ email, plate, inicio, valor }) {
  if (!email) return;
  const quando = inicio.toLocaleString("pt-BR", {
    dateStyle: "long", timeStyle: "short", timeZone: "America/Sao_Paulo",
  });
  // Endereço da vistoria — defina o secret ENDERECO_VISTORIA no Supabase.
  const endereco = Deno.env.get("ENDERECO_VISTORIA") ||
    "Endereço da loja Amper — a confirmar";
  const mapa = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}`;
  const valorFmt = Number(valor || 0).toLocaleString("pt-BR");

  const html = `
<!DOCTYPE html>
<html lang="pt-BR"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F2EFE9;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F2EFE9;padding:24px 12px;">
<tr><td align="center">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#FFFFFF;border-radius:14px;overflow:hidden;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">

    <!-- cabeçalho -->
    <tr><td style="background:#0A0A0A;padding:26px 30px;">
      <span style="font-family:'Arial Black',Arial,sans-serif;font-size:26px;letter-spacing:1.5px;color:#FFFFFF;text-transform:uppercase;">AMPER</span>
    </td></tr>

    <!-- faixa amarela -->
    <tr><td style="background:#F3E23D;padding:22px 30px;">
      <div style="font-family:'Arial Black',Arial,sans-serif;font-size:23px;line-height:1.15;color:#000000;text-transform:uppercase;">
        Vistoria agendada
      </div>
      <div style="font-size:15px;color:#000000;margin-top:6px;">
        Placa <strong>${plate}</strong>
      </div>
    </td></tr>

    <!-- corpo -->
    <tr><td style="padding:30px;">
      <p style="margin:0 0 22px;font-size:16px;line-height:1.55;color:#141312;">
        Tudo certo! Recebemos seu pedido de crédito com garantia de veículo. Abaixo estão os detalhes do seu agendamento.
      </p>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E5E1D8;border-radius:10px;">
        <tr><td style="padding:16px 18px;border-bottom:1px solid #E5E1D8;">
          <div style="font-size:11px;letter-spacing:1.2px;text-transform:uppercase;color:#78736A;">Data e hora</div>
          <div style="font-size:17px;color:#141312;font-weight:600;margin-top:3px;">${quando}</div>
        </td></tr>
        <tr><td style="padding:16px 18px;border-bottom:1px solid #E5E1D8;">
          <div style="font-size:11px;letter-spacing:1.2px;text-transform:uppercase;color:#78736A;">Onde levar o carro</div>
          <div style="font-size:16px;color:#141312;font-weight:600;margin-top:3px;">${endereco}</div>
          <a href="${mapa}" style="display:inline-block;margin-top:8px;font-size:14px;color:#8A6D00;font-weight:600;text-decoration:none;">Ver no mapa &rarr;</a>
        </td></tr>
        <tr><td style="padding:16px 18px;">
          <div style="font-size:11px;letter-spacing:1.2px;text-transform:uppercase;color:#78736A;">Valor pré-aprovado</div>
          <div style="font-family:'Arial Black',Arial,sans-serif;font-size:26px;color:#1F7A3D;margin-top:3px;">R$ ${valorFmt}</div>
        </td></tr>
      </table>

      <p style="margin:24px 0 6px;font-size:15px;line-height:1.55;color:#57534B;">
        A vistoria leva cerca de 40 minutos. Leve o documento do veículo e um documento com foto.
      </p>

      <!-- aviso -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;background:#F2EFE9;border-radius:10px;">
        <tr><td style="padding:14px 16px;font-size:13.5px;line-height:1.5;color:#57534B;">
          <strong style="color:#141312;">Importante:</strong> a vistoria é uma etapa de avaliação e
          <strong>não garante a aprovação do crédito</strong>. O valor final depende da análise do veículo e da documentação.
        </td></tr>
      </table>
    </td></tr>

    <!-- rodapé -->
    <tr><td style="background:#0A0A0A;padding:22px 30px;">
      <div style="font-family:'Arial Black',Arial,sans-serif;font-size:15px;letter-spacing:1.2px;color:#FFFFFF;text-transform:uppercase;">AMPER</div>
      <div style="font-size:12.5px;color:#A19B90;margin-top:6px;line-height:1.5;">
        Crédito com garantia de veículo &middot; Sujeito a análise.<br>
        Você recebeu este e-mail porque agendou uma vistoria com a Amper.
      </div>
    </td></tr>

  </table>
</td></tr></table>
</body></html>`;

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      // EMAIL_FROM (secret) quando o domínio estiver verificado no Resend,
      // ex.: "Amper <vistoria@amper.com.br>". Enquanto isso, o domínio de testes
      // do Resend funciona — mas só entrega no e-mail dono da conta Resend.
      from: Deno.env.get("EMAIL_FROM") || "Amper <onboarding@resend.dev>",
      to: email,
      subject: `Vistoria agendada — ${quando}`, html }),
  });
  if (!r.ok) console.error("Resend:", await r.text());
}

// ---- WhatsApp (Cloud API) ----
// A Meta só permite TEXTO LIVRE dentro de 24h após o cliente escrever para você.
// Como aqui nós iniciamos a conversa, é obrigatório usar um TEMPLATE aprovado.
// Crie no WhatsApp Manager um template UTILITY chamado `vistoria_confirmada`
// (pt_BR) com o corpo:
//
//   Vistoria agendada na Amper!
//   Veículo: {{1}}
//   Quando: {{2}}
//   Importante: a vistoria é uma etapa de avaliação e não garante a aprovação
//   do crédito. O valor final depende da análise do veículo e da documentação.
//
// Ajuste o nome pelo secret WHATSAPP_TEMPLATE, se usar outro.
async function enviarWhatsApp({ whatsapp, plate, inicio }) {
  if (!whatsapp) return;
  const to = whatsapp.replace(/\D/g, "").replace(/^0+/, "");
  const numero = to.startsWith("55") ? to : `55${to}`;
  const quando = inicio.toLocaleString("pt-BR", {
    dateStyle: "short", timeStyle: "short", timeZone: "America/Sao_Paulo",
  });

  const phoneId = Deno.env.get("WHATSAPP_PHONE_ID");
  const template = Deno.env.get("WHATSAPP_TEMPLATE") || "vistoria_confirmada";

  const r = await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Deno.env.get("WHATSAPP_TOKEN")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: numero,
      type: "template",
      template: {
        name: template,
        language: { code: "pt_BR" },
        components: [{
          type: "body",
          parameters: [
            { type: "text", text: plate },
            { type: "text", text: quando },
          ],
        }],
      },
    }),
  });
  if (!r.ok) console.error("WhatsApp:", await r.text());
}
