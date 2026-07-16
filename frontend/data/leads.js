/* Captura de leads → Supabase (tabla public.leads).
   La URL y a chave publishable são públicas por design (a tabela só permite INSERT,
   nunca leitura, via RLS). Nenhum segredo aqui. */
(function () {
  const SUPABASE_URL = 'https://edqzebcvthdpmkfidvdc.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_z8g0pD7c4n8D2qMDjbTo7Q_kBossQxg';

  // Salva um lead. Retorna {ok:true} ou {ok:false, error}.
  async function saveLead(payload) {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({
          whatsapp: payload.whatsapp || '',
          email:    payload.email || '',
          plate:    payload.plate || null,
          brand:    payload.brand || null,
          model:    payload.model || null,
          year:     payload.year || null,
          source:   payload.source || 'hero',
        }),
      });
      if (!res.ok) {
        const txt = await res.text();
        console.error('[AmperLeads] erro ao salvar lead:', res.status, txt);
        return { ok: false, error: txt };
      }
      return { ok: true };
    } catch (e) {
      console.error('[AmperLeads] falha de rede ao salvar lead:', e.message);
      return { ok: false, error: e.message };
    }
  }

  // Salva um agendamento de vistoria. Dispara (via trigger/Edge Function no Supabase)
  // a criação do evento no Google Calendar + e-mail + WhatsApp de confirmação.
  async function saveAgendamento(payload) {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/agendamentos`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({
          whatsapp: payload.whatsapp || '',
          email:    payload.email || '',
          plate:    payload.plate || null,
          valor:    payload.valor || null,
          data:     payload.data || null,   // 'YYYY-MM-DD'
          hora:     payload.hora || null,    // 'HH:MM'
          source:   'emprestimo',
        }),
      });
      if (!res.ok) {
        const txt = await res.text();
        console.error('[AmperLeads] erro ao salvar agendamento:', res.status, txt);
        return { ok: false, error: txt };
      }
      return { ok: true };
    } catch (e) {
      console.error('[AmperLeads] falha de rede no agendamento:', e.message);
      return { ok: false, error: e.message };
    }
  }

  window.AmperLeads = { saveLead, saveAgendamento };
})();
