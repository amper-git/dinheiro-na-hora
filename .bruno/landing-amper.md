# Cambios en la landing Amper (venda seu carro)

Por qué importa: Carlos está iterando el copy y sumando captura de leads en la home.

## Pasos
- [x] Headline → "Oferta Instantânea. Venda com Segurança, sem dor de cabeça. Sem Golpes."
- [x] Subtexto Hero reescrito (vistoria cautelar, compradores verificados)
- [x] Trust strip: "Só paga se vender" → "Vendemos em poucos dias"; "Garantia+fotos+polimento" → "Vistoria Cautelar"
- [x] Stats: +42.000→+1.000 · 4,9→4,6 · R$800M→R$50M
- [ ] Formulario WhatsApp + email en el card del Hero
- [ ] Conectar Supabase (DB de leads) — falta que Carlos cree el proyecto

## Estado hoy
Textos aplicados en components/landing-top.jsx y commiteados. Pendiente: captura de
leads → se eligió Supabase (free). Falta conectar el proyecto Supabase (URL + anon key
como variables de entorno) para wirear el form y demostrarlo funcionando.

## Decisiones
- Leads se guardarán en Supabase (no Google Sheets): es DB real, free, y ya es la infra del cliente.
- En el headline se resaltó "Segurança" en amarillo (mantiene el recurso visual de marca).
