# Gráficos e mídia — landing de empréstimo (emprestimo.html)

Por qué importa: a página tem slots prontos (config `AMPER_MEDIA` no topo do script).
Basta salvar os arquivos em `frontend/assets/` e preencher os caminhos.

## 1. Vídeo do hero (animação IA — substitui a cena 3D)
- Formato: **MP4 (H.264)** — se possível, também WebM/VP9 como segunda versão
- Resolução: **1920×1080** (16:9)
- Duração: **6 a 12 s em loop perfeito** (primeiro e último frame idênticos)
- FPS: 24 ou 30 · **Sem áudio** (roda em autoplay/muted/loop)
- Peso alvo: **≤ 8 MB** (bitrate ~4–6 Mbps)
- Composição: fundo escuro próximo de **#0A0A0A** (funde com a página); destaques em
  amarelo **#FFD60A**; ação principal no **centro-direita** (o texto fica à esquerda no
  desktop); nada importante nas bordas (corte por `object-fit: cover` no mobile)
- Poster: **JPG 1920×1080, ≤ 300 KB** (primeiro frame do vídeo)
- Destino: `assets/video/hero-loop.mp4` + `assets/video/hero-poster.jpg`

## 2. Logo (menu + rodapé)
- **SVG** (ideal) ou PNG fundo transparente, largura ≥ **600 px**
- Versão horizontal, **clara** (para fundo escuro)
- Destino: `assets/img/logo-amper.svg`

## 3. Fundo da seção "Crédito para quem trabalha"
- **JPG ou WebP 2400×1350** (16:9), ≤ 500 KB
- Imagem **bem clara/dessaturada** — será exibida a ~10% de opacidade sobre fundo escuro
- Sugestão: profissionais + veículos (caminhoneiro na estrada, oficina, etc.), sem texto
- Placeholder atual: padrão diagonal sutil amarelo (some ao configurar a imagem)
- Destino: `assets/img/bg-profissionais.jpg`

## 4. Avatares dos depoimentos (3)
- **240×240 px**, JPG/WebP, ≤ 100 KB cada (exibidos a 44 px, redondos)
- Destino: `assets/img/depo-1.jpg` … `depo-3.jpg`

## 5. Logos dos bancos parceiros (quando definidos)
- SVG ou PNG **monocromático branco**, fundo transparente, altura base **48 px**

## 6. Favicon
- PNG **512×512**, fundo transparente (geramos os demais tamanhos)

## 7. OG image (preview no WhatsApp/redes)
- **JPG 1200×630**, ≤ 300 KB — logo + headline "Dinheiro na Hora. Sem Golpes."
- Destino: `assets/img/og-emprestimo.jpg`
