// Supabase Edge Function — disponibilidade real para vistorias.
//
// Consulta a agenda do Google (freebusy) + a tabela `agendamentos`
// e devolve só os horários realmente livres.
//
// Regras de negócio (ajuste aqui se mudar o atendimento):
//   - Segunda a sexta, 9h às 17h (America/Sao_Paulo)
//   - Duração da vistoria: 40 min
//   - Antecedência mínima: 24h
//   - Janela mostrada: próximos 14 dias
//
// Deploy: supabase functions deploy disponibilidade --no-verify-jwt
// Chamada: GET {SUPABASE_URL}/functions/v1/disponibilidade

import { serve } from "https://deno.land/std@0.208.0/http/server.ts";

// Autenticação Google via service account (JWT → access_token).
// Compartilhado entre as Edge Functions. Sem libs externas.

async function getGoogleToken(scope: string): Promise<string> {
  const sa = JSON.parse(Deno.env.get("GOOGLE_SA_JSON")!);
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const claim = {
    iss: sa.client_email,
    scope,
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };
  const b64 = (o: unknown) =>
    btoa(JSON.stringify(o)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  const unsigned = `${b64(header)}.${b64(claim)}`;

  const pem = sa.private_key.replace(/-----[^-]+-----|\s/g, "");
  const bin = Uint8Array.from(atob(pem), (c) => c.charCodeAt(0));
  const key = await crypto.subtle.importKey(
    "pkcs8", bin, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"],
  );
  const sig = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(unsigned),
  );
  const jwt = `${unsigned}.${
    btoa(String.fromCharCode(...new Uint8Array(sig)))
      .replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
  }`;

  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });
  const j = await r.json();
  if (!j.access_token) throw new Error(`Google token: ${JSON.stringify(j)}`);
  return j.access_token;
}

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};


const HORARIOS = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00"];
const DURACAO_MIN = 40;
const ANTECEDENCIA_H = 24;
const DIAS_JANELA = 14;
const TZ_OFFSET = "-03:00"; // horário de Brasília

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });

  try {
    const agora = new Date();
    const minimo = new Date(agora.getTime() + ANTECEDENCIA_H * 3600 * 1000);
    const fimJanela = new Date(agora.getTime() + DIAS_JANELA * 24 * 3600 * 1000);

    // 1) Períodos ocupados na agenda do Google
    const ocupados = await buscarOcupados(minimo, fimJanela);

    // 2) Horários já agendados na nossa tabela
    const jaAgendados = await buscarAgendados();

    // 3) Monta os dias/slots livres
    const dias: { data: string; slots: string[] }[] = [];
    for (let i = 0; i <= DIAS_JANELA; i++) {
      const d = new Date(agora.getTime() + i * 24 * 3600 * 1000);
      const dow = d.getDay();
      if (dow === 0 || dow === 6) continue;            // só seg–sex
      const iso = d.toISOString().slice(0, 10);

      const slots = HORARIOS.filter((h) => {
        const inicio = new Date(`${iso}T${h}:00${TZ_OFFSET}`);
        const fim = new Date(inicio.getTime() + DURACAO_MIN * 60000);
        if (inicio < minimo) return false;                              // antecedência
        if (jaAgendados.has(`${iso} ${h}`)) return false;               // já vendido
        return !ocupados.some((o) => inicio < o.fim && fim > o.inicio); // choque na agenda
      });

      if (slots.length) dias.push({ data: iso, slots });
    }

    return new Response(JSON.stringify({ ok: true, dias }), {
      headers: { ...CORS, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    // Em caso de falha, o frontend cai no calendário estático (degradação suave)
    return new Response(JSON.stringify({ ok: false, error: String(e) }), {
      status: 500, headers: { ...CORS, "Content-Type": "application/json" },
    });
  }
});

async function buscarOcupados(de: Date, ate: Date) {
  const token = await getGoogleToken("https://www.googleapis.com/auth/calendar.readonly");
  const calendarId = Deno.env.get("CALENDAR_ID") || "primary";
  const r = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      timeMin: de.toISOString(),
      timeMax: ate.toISOString(),
      timeZone: "America/Sao_Paulo",
      items: [{ id: calendarId }],
    }),
  });
  if (!r.ok) throw new Error(`freeBusy: ${await r.text()}`);
  const j = await r.json();
  const busy = j.calendars?.[calendarId]?.busy ?? [];
  return busy.map((b: { start: string; end: string }) => ({
    inicio: new Date(b.start), fim: new Date(b.end),
  }));
}

async function buscarAgendados(): Promise<Set<string>> {
  const url = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const hoje = new Date().toISOString().slice(0, 10);
  const r = await fetch(
    `${url}/rest/v1/agendamentos?select=data,hora&data=gte.${hoje}`,
    { headers: { apikey: key!, Authorization: `Bearer ${key}` } },
  );
  if (!r.ok) return new Set();
  const linhas = await r.json();
  return new Set(linhas.map((l: { data: string; hora: string }) => `${l.data} ${l.hora}`));
}
