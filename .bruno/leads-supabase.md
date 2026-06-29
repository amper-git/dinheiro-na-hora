# Captura de leads (WhatsApp+email) → Supabase

Por qué importa: la home ahora captura contactos de quien va a avaliar el auto.

## Pasos
- [x] Proyecto Supabase conectado (ref edqzebcvthdpmkfidvdc)
- [x] Tabla public.leads creada (whatsapp, email, plate, brand, model, year, source, created_at)
- [x] RLS: política insert-only `to public` (frontend solo inserta, no lee)
- [x] Helper frontend data/leads.js (URL + publishable key, ambas públicas por diseño)
- [x] Formulario WhatsApp+email en el card del Hero (validación + guardado al iniciar)
- [x] Verificado end-to-end: lead entra a la tabla (probado con puppeteer)
- [x] Hero responsive arreglado (min-width:0 en hijos del grid — bug min-width:auto)

## Estado hoy
Funcionando. Carlos puede ver los leads en Supabase → Table Editor → tabla `leads`.
El form usa solo la publishable key (segura). El access token (sbp_) que cargó para
el setup ya NO se necesita: puede revocarlo en supabase.com/dashboard/account/tokens.

## Decisiones
- URL+publishable key van hardcodeadas en data/leads.js (son públicas; la tabla está protegida por RLS insert-only).
- Política RLS a `public` (no solo `anon`) porque las claves nuevas sb_publishable resolvían distinto rol.
- Tras crear políticas hay que recargar el schema cache de PostgREST (notify pgrst) o el insert da 42501.
