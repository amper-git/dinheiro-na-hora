/* global React, Icon, fmtBRL, fmtBRLShort */

/* ---------- LIVE SALES FEED ---------- */
const LiveSales = () => {
  const isMobile = useIsMobile();
  const sales = [
    { car: 'Honda Civic EXL', year: 2022, city: 'São Paulo, SP', km: 38500, price: 142000, days: 4, avatar: 'J' },
    { car: 'VW T-Cross Highline', year: 2023, city: 'Rio de Janeiro, RJ', km: 22100, price: 156500, days: 6, avatar: 'M' },
    { car: 'Toyota Corolla XEi', year: 2021, city: 'Belo Horizonte, MG', km: 62000, price: 118000, days: 3, avatar: 'A' },
    { car: 'Jeep Compass Limited', year: 2023, city: 'Curitiba, PR', km: 18900, price: 184500, days: 5, avatar: 'R' },
    { car: 'Hyundai HB20 Comfort', year: 2022, city: 'Porto Alegre, RS', km: 41200, price: 82500, days: 7, avatar: 'C' },
    { car: 'Fiat Pulse Impetus', year: 2023, city: 'Salvador, BA', km: 28700, price: 114000, days: 2, avatar: 'L' },
    { car: 'Chevrolet Tracker LTZ', year: 2022, city: 'Brasília, DF', km: 35800, price: 128500, days: 6, avatar: 'P' },
    { car: 'Renault Duster Iconic', year: 2023, city: 'Fortaleza, CE', km: 24300, price: 121000, days: 4, avatar: 'S' },
  ];
  return (
    <section id="vendas" style={{ padding: isMobile ? '80px 20px' : '120px 40px', background: 'var(--surface)' }}>
      <div style={{ maxWidth: 1360, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', marginBottom: 40, gap: 24, flexWrap: 'wrap' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <span className="chip chip-outline">Vendas em tempo real</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--success)', fontWeight: 600 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--success)', boxShadow: '0 0 0 4px rgba(16,185,129,0.15)' }}/>
                Ao vivo
              </span>
            </div>
            <h2 style={{ fontSize: isMobile ? 34 : 56, lineHeight: 1, letterSpacing: '-0.03em', fontWeight: 700, maxWidth: 700 }}>
              Carros vendidos nesta<br/>semana pela Amper.
            </h2>
          </div>
          <button className="btn btn-ghost">Ver todas as vendas <Icon.Arrow width={16} height={16}/></button>
        </div>

        <div style={{
          background: 'var(--paper)', borderRadius: 20, border: '1px solid var(--ink-100)', overflow: isMobile ? 'auto' : 'hidden',
        }}>
          <div style={{ minWidth: isMobile ? 720 : 'auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '36px 1.8fr 1fr 100px 120px 120px 100px',
            gap: 24, padding: '16px 28px',
            background: 'var(--surface)',
            borderBottom: '1px solid var(--ink-100)',
            fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-500)',
          }}>
            <div></div><div>Veículo</div><div>Cidade</div><div>Ano</div><div>KM</div><div style={{ textAlign: 'right' }}>Valor</div><div style={{ textAlign: 'right' }}>Tempo</div>
          </div>
          {sales.map((s, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '36px 1.8fr 1fr 100px 120px 120px 100px',
              gap: 24, padding: '18px 28px',
              borderBottom: i < sales.length - 1 ? '1px solid var(--ink-100)' : 'none',
              alignItems: 'center',
              transition: 'background 140ms',
            }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--surface)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: `hsl(${i * 47}, 50%, 85%)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 600, color: 'var(--ink-800)',
              }}>{s.avatar}</div>
              <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.005em' }}>{s.car}</div>
              <div style={{ fontSize: 14, color: 'var(--ink-600)' }}>{s.city}</div>
              <div className="mono" style={{ fontSize: 13, color: 'var(--ink-600)' }}>{s.year}</div>
              <div className="mono" style={{ fontSize: 13, color: 'var(--ink-600)' }}>{s.km.toLocaleString('pt-BR')} km</div>
              <div className="mono" style={{ fontSize: 15, fontWeight: 700, textAlign: 'right' }}>{fmtBRL(s.price)}</div>
              <div style={{ textAlign: 'right', fontSize: 13, color: 'var(--success)', fontWeight: 600 }}>{s.days}d</div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- COMPARATIVO ---------- */
const Comparativo = () => {
  const isMobile = useIsMobile();
  const rows = [
    { label: 'Tempo médio para vender', amper: '7 dias', loja: '30-60 dias', anuncio: '45-90 dias' },
    { label: 'Preço recebido', amper: 'Acima da média', loja: '15-20% abaixo', anuncio: 'Variável' },
    { label: 'Você cuida da burocracia?', amper: 'Não, é conosco', loja: 'Parcial', anuncio: 'Sim, tudo' },
    { label: 'Ligações e visitas', amper: 'Zero', loja: 'Baixa', anuncio: 'Dezenas' },
    { label: 'Risco de golpe', amper: 'Nenhum', loja: 'Baixo', anuncio: 'Alto' },
    { label: 'Vistoria gratuita', amper: 'Sim, em casa', loja: 'Na loja', anuncio: 'Por sua conta' },
    { label: 'Pagamento à vista', amper: '24h após vistoria', loja: 'Pode ter parcela', anuncio: 'Depende do comprador' },
  ];
  return (
    <section id="comparativo" style={{ padding: isMobile ? '80px 20px' : '120px 40px', background: 'var(--ink-900)', color: 'white' }}>
      <div style={{ maxWidth: 1360, margin: '0 auto' }}>
        <div style={{ marginBottom: isMobile ? 32 : 56, maxWidth: 720 }}>
          <span className="chip chip-yellow" style={{ marginBottom: 20 }}>Compare</span>
          <h2 style={{ fontSize: isMobile ? 40 : 64, lineHeight: 0.98, letterSpacing: '-0.03em', fontWeight: 700 }}>
            Três caminhos.<br/>Um <span className="hl">sem dor</span>.
          </h2>
        </div>

        <div style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, overflow: isMobile ? 'auto' : 'hidden' }}>
          <div style={{ minWidth: isMobile ? 640 : 'auto' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1.3fr 1fr 1fr 1fr',
            padding: '24px 28px',
            background: 'rgba(255,255,255,0.03)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.5)',
          }}>
            <div></div>
            <div style={{ color: 'var(--amper-yellow)' }}>Amper</div>
            <div>Loja / concessionária</div>
            <div>Anunciar por conta</div>
          </div>
          {rows.map((r, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '1.3fr 1fr 1fr 1fr',
              padding: '22px 28px',
              borderBottom: i < rows.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              alignItems: 'center',
            }}>
              <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.85)' }}>{r.label}</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--amper-yellow)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icon.Check width={18} height={18}/> {r.amper}
              </div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)' }}>{r.loja}</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)' }}>{r.anuncio}</div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- FAQ ---------- */
const FAQ = () => {
  const isMobile = useIsMobile();
  const [open, setOpen] = React.useState(0);
  const qs = [
    { q: 'Como vocês chegam ao preço da oferta?', a: 'Cruzamos dados de mercado em portais de venda, também vemos o giro de cada veículo, e entregamos o preço acima de concessionária, de forma rápida e segura.' },
    { q: 'A oferta muda depois da vistoria?', a: 'A oferta é firme desde que o veículo corresponda às informações fornecidas. Se a vistoria revelar divergências (avarias não informadas, quilometragem diferente), apresentamos um novo valor — e você pode aceitar ou desistir sem custo.' },
    { q: 'Meu carro está financiado. Consigo vender?', a: 'Sim. Pagamos a quitação do seu financiamento diretamente com o banco e repassamos a diferença para você. Enviamos tudo documentado.' },
    { q: 'Em quanto tempo vocês vendem?', a: 'Depende do veículo, variando entre 3 a 20 dias em média. Carros mais procurados (SUVs compactos, picapes leves, sedãs populares) costumam sair na primeira semana.' },
    { q: 'E a transferência do veículo?', a: 'Cuidamos 100% do processo. Você assina a autorização de transferência digital (via e-CPF ou gov.br) e a gente resolve com o Detran.' },
    { q: 'Tem taxa ou comissão?', a: 'Não. A Amper não cobra nada de você. Nosso lucro vem da revenda do veículo.' },
    { q: 'Em quais cidades vocês atendem?', a: 'São Paulo capital e região metropolitana.' },
  ];
  return (
    <section id="faq" style={{ padding: isMobile ? '80px 20px' : '120px 40px', background: 'var(--surface)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: isMobile ? 32 : 56 }}>
          <span className="chip chip-outline" style={{ marginBottom: 20 }}>Dúvidas frequentes</span>
          <h2 style={{ fontSize: isMobile ? 34 : 56, lineHeight: 1, letterSpacing: '-0.03em', fontWeight: 700 }}>
            Perguntas que <span className="hl">todo mundo faz</span>.
          </h2>
        </div>

        <div style={{ border: '1px solid var(--ink-100)', borderRadius: 20, overflow: 'hidden', background: 'var(--paper)' }}>
          {qs.map((item, i) => (
            <div key={i} style={{ borderBottom: i < qs.length - 1 ? '1px solid var(--ink-100)' : 'none' }}>
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                style={{
                  width: '100%', padding: '24px 28px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20,
                  textAlign: 'left',
                }}>
                <span style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.01em' }}>{item.q}</span>
                <span style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: open === i ? 'var(--amper-yellow)' : 'var(--surface)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, transition: 'background 180ms',
                }}>
                  {open === i ? <Icon.Minus width={16} height={16}/> : <Icon.Plus width={16} height={16}/>}
                </span>
              </button>
              <div style={{
                maxHeight: open === i ? 200 : 0,
                overflow: 'hidden', transition: 'max-height 260ms ease',
              }}>
                <div style={{ padding: '0 28px 24px', fontSize: 15.5, lineHeight: 1.55, color: 'var(--ink-600)', maxWidth: 780 }}>
                  {item.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- PARTNERS + BLOG + FOOTER ---------- */
const Partners = () => {
  const isMobile = useIsMobile();
  return (
  <section style={{ padding: isMobile ? '60px 20px' : '80px 40px', background: 'var(--paper)', borderTop: '1px solid var(--ink-100)', borderBottom: '1px solid var(--ink-100)' }}>
    <div style={{ maxWidth: 1360, margin: '0 auto' }}>
      <div style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-500)', marginBottom: 32, textAlign: 'center', fontWeight: 600 }}>
        Parceiros e imprensa
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(6, 1fr)', gap: 24, alignItems: 'center' }}>
        {['Itaú', 'Bradesco', 'Santander', 'Porto Seguro', 'Exame', 'Valor Econômico'].map((name, i) => (
          <div key={i} style={{
            height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em',
            color: 'var(--ink-400)',
            fontFamily: 'var(--font-display)',
          }}>{name}</div>
        ))}
      </div>
    </div>
  </section>
  );
};

const Blog = () => {
  const isMobile = useIsMobile();
  const posts = [
    { cat: 'Guia', title: 'Como precificar seu carro usado em 2026: o que mudou', time: '6 min', color: '#FFF4B8' },
    { cat: 'Mercado', title: 'Elétricos usados: vale a pena vender agora ou esperar?', time: '4 min', color: '#DDF5E8' },
    { cat: 'Documentação', title: 'Passo a passo: quitar financiamento e transferir o veículo', time: '8 min', color: '#E5E4FF' },
  ];
  return (
    <section style={{ padding: isMobile ? '80px 20px' : '120px 40px', background: 'var(--paper)' }}>
      <div style={{ maxWidth: 1360, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 40, flexWrap: 'wrap', gap: 24 }}>
          <h2 style={{ fontSize: isMobile ? 34 : 56, lineHeight: 1, letterSpacing: '-0.03em', fontWeight: 700 }}>Guias e mercado.</h2>
          <button className="btn btn-ghost">Todos os artigos <Icon.Arrow width={16} height={16}/></button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 20 }}>
          {posts.map((p, i) => (
            <article key={i} style={{
              borderRadius: 20, overflow: 'hidden',
              border: '1px solid var(--ink-100)', background: 'var(--paper)',
              cursor: 'pointer', transition: 'transform 180ms',
            }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ height: 200, background: p.color, display: 'flex', alignItems: 'end', padding: 20 }}>
                <span className="chip chip-dark">{p.cat}</span>
              </div>
              <div style={{ padding: 24 }}>
                <h3 style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.015em', lineHeight: 1.25, marginBottom: 14 }}>{p.title}</h3>
                <div style={{ fontSize: 13, color: 'var(--ink-500)', display: 'flex', gap: 8, alignItems: 'center' }}>
                  <Icon.Clock width={14} height={14}/> {p.time} de leitura
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = ({ onStart }) => {
  const isMobile = useIsMobile();
  return (
  <footer style={{ background: 'var(--ink-900)', color: 'white', padding: isMobile ? '60px 20px 40px' : '100px 40px 40px' }}>
    <div style={{ maxWidth: 1360, margin: '0 auto' }}>
      {/* Big CTA */}
      <div style={{
        background: 'var(--amper-yellow)', color: 'var(--ink-900)',
        borderRadius: 28, padding: isMobile ? '40px 24px' : '64px 48px',
        display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr', gap: isMobile ? 24 : 40, alignItems: 'center',
        marginBottom: isMobile ? 56 : 80,
      }}>
        <div>
          <h2 style={{ fontSize: isMobile ? 38 : 64, lineHeight: 0.98, letterSpacing: '-0.035em', fontWeight: 700 }}>
            Pronto para vender<br/>sem dor de cabeça?
          </h2>
        </div>
        <div style={{ textAlign: isMobile ? 'left' : 'right' }}>
          <p style={{ fontSize: 17, lineHeight: 1.5, color: 'var(--ink-800)', marginBottom: 28, maxWidth: 360, marginLeft: isMobile ? 0 : 'auto' }}>
            Avaliação em 60 segundos. Sem cadastro, sem compromisso.
          </p>
          <button className="btn btn-dark btn-lg" onClick={onStart}>
            Avaliar meu carro <Icon.Arrow width={18} height={18}/>
          </button>
        </div>
      </div>

      {/* Columns */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : '1.4fr 1fr 1fr 1fr 1fr', gap: isMobile ? 24 : 40, marginBottom: 60 }}>
        <div>
          <AmperLogo size={26} color="white"/>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', marginTop: 20, maxWidth: 280, lineHeight: 1.55 }}>
            A forma mais segura e justa de vender seu carro no Brasil. Licenciada e regulada.
          </p>
        </div>
        {[
          { title: 'Produto', links: ['Avaliar carro', 'Como funciona', 'Vendas recentes', 'Comparativo'] },
          { title: 'Empresa', links: ['Sobre', 'Carreiras', 'Imprensa', 'Parceiros'] },
          { title: 'Ajuda', links: ['Central de ajuda', 'Dúvidas frequentes', 'Contato', 'WhatsApp'] },
          { title: 'Legal', links: ['Termos', 'Privacidade', 'Cookies', 'LGPD'] },
        ].map((col, i) => (
          <div key={i}>
            <div style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 16, fontWeight: 600 }}>{col.title}</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {col.links.map((l, j) => (
                <li key={j}><a href="#" style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{
        paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16,
        fontSize: 13, color: 'rgba(255,255,255,0.4)',
      }}>
        <div>© 2026 Amper Veículos S.A. · CNPJ 42.181.734/0001-92 · Av. Paulista 1578, São Paulo — SP</div>
        <div style={{ display: 'flex', gap: 20 }}>
          <a href="#">Instagram</a>
          <a href="#">YouTube</a>
          <a href="#">LinkedIn</a>
        </div>
      </div>
    </div>
  </footer>
  );
};

Object.assign(window, { LiveSales, Comparativo, FAQ, Partners, Blog, Footer });
