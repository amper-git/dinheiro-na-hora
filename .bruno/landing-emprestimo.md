# Landing de empréstimo (crédito com garantia de veículo)

Por qué importa: William quer captar leads do produto "Dinheiro na Hora" (empréstimo
com o carro em garantia) com uma página de alto impacto, separada da landing de venda.

## O que foi feito
- [x] Copy portado da landing de venda e adaptado ao produto crédito ("Sem Golpes", "Justo com você. Brutal com a burocracia", oferta firme, stats +1.000/4,6/R$50M, depoimentos)
- [x] Nova página standalone: `frontend/emprestimo.html` (HTML único, sem build)
- [x] Hero 3D (Three.js r128 via CDN): carro low-poly com faróis acesos + moedas subindo
- [x] Identidade da marca aplicada: `--amper-yellow #FFD60A` sobre ink-900, Lalezar (títulos) + Changa (corpo) — mesmos tokens de `styles/tokens.css`
- [x] Simulador no hero: placa (input estilo Mercosul, aceita ABC1234 e ABC1D23) + WhatsApp + e-mail → valor pré-aprovado (contador animado) → agendamento de vistoria (dia/horário) → sucesso
- [x] Fallback: se a API falhar, botão "Continuar pelo WhatsApp" com mensagem pré-preenchida
- [x] Mobile-first, `prefers-reduced-motion` respeitado (quadro estático), partículas reduzidas no mobile

## Integração com o backend
Segue a convenção de `data/api-client.js`:
- `window.__AMPER_API_MODE = 'real'` ativa chamadas reais; default = demo (valores simulados)
- `window.__AMPER_API_BASE` = URL do proxy (default `http://localhost:3001`)

Endpoints esperados (a criar no proxy):
- `POST /api/pre-qualificacao` → `{ placa, whatsapp, email }` ⇒ `{ aprovado, valor, mensagem? }`
- `POST /api/agendamento` → `{ placa, whatsapp, email, data, hora }` ⇒ `{ ok }`

## Pendente
- [ ] Número real de WhatsApp em `AMPER_CONFIG.whatsappFallback`
- [ ] Mídia (config em `AMPER_MEDIA` no topo do script): logo do menu, vídeo do hero (substitui a cena 3D), imagem de fundo da seção "Crédito para quem trabalha", avatares dos depoimentos — specs em `.bruno/graficos-e-midia.md`
- [ ] Criar os 2 endpoints no proxy (consulta bancária + agenda)
- [ ] Decidir link cruzado entre as duas landings (venda ⇄ empréstimo)
- [ ] Leads desta página também podem ir ao Supabase quando o projeto existir

## Decisões
- Página standalone (não mexe em `components/`) para não interferir na landing de venda
- Tema escuro mantido de propósito: diferencia o produto "crédito" da landing clara de venda, mas 100% dentro da paleta da marca (amarelo Amper como única cor de ação)
