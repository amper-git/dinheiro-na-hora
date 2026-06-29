# Sitio Amper mobile-first

Por qué importa: el sitio estaba clavado a width=1440 (solo desktop). Carlos pidió mobile-first.

## Pasos
- [x] viewport → width=device-width
- [x] hook useIsMobile() en primitives.jsx (breakpoint 768px) — base reutilizable
- [x] Hero / Nav / StatsBar responsive (1 col, stats 2x2)
- [x] landing-mid (cómo funciona, diferenciais, testimonios) → 1 col
- [x] landing-bot (live sales, comparativo, FAQ, partners, blog, footer) → responsive
- [x] simulador (5 pasos + nav) → 1 col, grillas reducidas; verificado con puppeteer
- [x] oferta y sucesso → responsive
- [x] overflow-x:hidden global; sin scroll horizontal en 390px

## Estado hoy
Mobile-first aplicado en todo el sitio público y verificado con capturas reales (390px):
landing completa + simulador paso 1. Pendiente aparte: formulario de leads + Supabase.

## Decisiones
- Estilos inline → responsive vía hook useIsMobile() + ternarios (no media queries, porque inline gana especificidad).
- node_modules/ ignorado; puppeteer-core se usó solo para verificar, no quedó en el repo.
