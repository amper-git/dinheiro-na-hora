# Integração do agendamento: Supabase + Google Calendar + e-mail + WhatsApp

Por qué importa: o formulário da landing de empréstimo precisa (1) guardar o lead e o
agendamento organizados e (2) ao confirmar a vistoria, criar evento no Google Calendar
do William e enviar e-mail + WhatsApp de confirmação — deixando explícito que a vistoria
NÃO garante aprovação.

## Arquitetura (por que assim)
Frontend estático não pode guardar segredos (qualquer um lê o HTML). Então:
- Frontend só faz INSERT no Supabase com a *publishable key* (pública, tabela protegida por RLS).
- Uma Edge Function (server-side, com os segredos guardados no Supabase) faz o resto:
  Calendar + e-mail + WhatsApp.

Fluxo: simular → `leads` (INSERT) · confirmar vistoria → `agendamentos` (INSERT)
       → Database Webhook → Edge Function `agendamento-webhook` → Calendar + e-mail + WhatsApp.

## Já feito (frontend, no ar)
- [x] `data/leads.js`: `saveLead` (já existia) + novo `saveAgendamento`
- [x] `emprestimo.html`: salva lead ao simular (`source:'emprestimo'`) e agendamento ao confirmar
- [x] Mensagem de sucesso já traz o aviso "a vistoria não garante a aprovação"
- [x] Cor da marca corrigida para `#F3E23D` (diretrizes) em toda a página
- [x] E-mail redesenhado com identidade Amper + endereço da vistoria (secret `ENDERECO_VISTORIA`) e link do mapa
- [x] Endereço também no campo `location` do evento do Calendar
- [x] Disponibilidade real funcionando (horário ocupado some da lista)

## Falta você fazer (backend — precisa das chaves)

### 1. Tabela `agendamentos` no Supabase
No SQL Editor do projeto `edqzebcvthdpmkfidvdc`:
```sql
create table if not exists public.agendamentos (
  id uuid primary key default gen_random_uuid(),
  whatsapp text, email text, plate text, valor numeric,
  data date, hora text, source text default 'emprestimo',
  created_at timestamptz default now()
);
alter table public.agendamentos enable row level security;
create policy "insert agendamentos" on public.agendamentos
  for insert to public with check (true);
-- recarrega o cache do PostgREST (senão o 1º insert dá 42501):
notify pgrst, 'reload schema';
```

### 2. Google Calendar (service account)
1. console.cloud.google.com → novo projeto → ative "Google Calendar API"
2. Crie uma *Service Account* → gere uma chave JSON
3. Abra seu Google Calendar → Configurações da agenda → "Compartilhar com pessoas
   específicas" → adicione o e-mail da service account com permissão
   "Fazer alterações nos eventos"
4. Guarde o JSON e o ID da agenda (o seu e-mail, ou o "ID da agenda" nas configurações)

### 3. E-mail (Resend — simples) — resend.com
- Crie conta, verifique o domínio amper.com.br, gere API key
- (alternativa: SendGrid, muda só a chamada no index.ts)

### 4. WhatsApp (Cloud API)
Ver checklist completo em `.bruno/whatsapp-producao.md`.
Resumo: token permanente via usuário do sistema + template `vistoria_confirmada`
aprovado + verificação da empresa + número novo exclusivo da API.

### 4b. Disponibilidade real (Google Calendar freebusy)
A página agora busca os horários livres em vez de mostrar slots fixos.
Regras: seg–sex, 9h–17h, vistoria de 40 min, antecedência mínima 24h, janela de 14 dias.
Se a function não responder, o frontend cai num calendário estático (degradação suave).
Para mudar as regras: `supabase/functions/disponibilidade/index.ts` (constantes no topo).

### 5. Deploy da Edge Function
```bash
supabase functions deploy agendamento-webhook
supabase functions deploy disponibilidade --no-verify-jwt
supabase secrets set \
  GOOGLE_SA_JSON="$(cat service-account.json)" \
  CALENDAR_ID="seu-email@gmail.com" \
  RESEND_API_KEY="re_..." \
  WHATSAPP_TOKEN="EAA..." \
  WHATSAPP_PHONE_ID="123456789"
```

### 6. Webhook que dispara a função
Supabase → Database → Webhooks → Create:
- Tabela `agendamentos`, evento **INSERT**
- Tipo HTTP Request → URL da function (Edge Functions → agendamento-webhook → copy URL)

## Testar
Simule e agende na página → confira: linha em `agendamentos`, evento no Calendar,
e-mail recebido, WhatsApp recebido. Logs em Supabase → Edge Functions → Logs.

## Segurança
- Publishable key no frontend é ok (RLS insert-only).
- TODOS os outros segredos (Google JSON, Resend, WhatsApp) só no `supabase secrets`.
- Nunca commitar service-account.json (está no .gitignore abaixo).
