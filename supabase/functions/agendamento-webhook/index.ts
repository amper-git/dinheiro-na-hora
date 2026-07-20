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
  const quando = inicio.toLocaleString("pt-BR", { dateStyle: "long", timeStyle: "short", timeZone: "America/Sao_Paulo" });
  const html =
    `<h2>Sua vistoria está agendada ✅</h2>
     <p>Recebemos seu pedido de crédito com garantia do veículo <strong>${plate}</strong>.</p>
     <p><strong>Quando:</strong> ${quando}<br><strong>Valor pré-aprovado:</strong> R$ ${valor}</p>
     <p style="color:#666;font-size:13px">${DISCLAIMER}</p>
     <p>Equipe Amper</p>`;
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: "Amper <vistoria@amper.com.br>", to: email,
      subject: "Vistoria agendada — Amper", html }),
  });
  if (!r.ok) console.error("Resend:", await r.text());
}

// ---- WhatsApp (Cloud API) ----
async function enviarWhatsApp({ whatsapp, plate, inicio }) {
  if (!whatsapp) return;
  const to = whatsapp.replace(/\D/g, "").replace(/^0+/, "");
  const numero = to.startsWith("55") ? to : `55${to}`;
  const quando = inicio.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short", timeZone: "America/Sao_Paulo" });
  const texto =
    `✅ Vistoria agendada na Amper!\n\nVeículo ${plate}\n${quando}\n\n${DISCLAIMER}`;
  const phoneId = Deno.env.get("WHATSAPP_PHONE_ID");
  const r = await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
    method: "POST",
    headers: { Authorization: `Bearer ${Deno.env.get("WHATSAPP_TOKEN")}`, "Content-Type": "application/json" },
    body: JSON.stringify({ messaging_product: "whatsapp", to: numero, type: "text", text: { body: texto } }),
  });
  if (!r.ok) console.error("WhatsApp:", await r.text());
}
