/* global React, Icon, fmtBRL, fmtBRLShort */

/* ---------- HOW IT WORKS ---------- */
const HowItWorks = ({ onStart }) => {
  const steps = [
    {
      n: '01',
      title: 'Informe seu carro',
      desc: 'Digite a placa ou informe marca, modelo e ano. Nossa IA puxa dados da tabela FIPE e de classificados reais.',
      icon: <Icon.Plate width={28} height={28}/>,
    },
    {
      n: '02',
      title: 'Receba uma oferta firme',
      desc: 'Em segundos, mostramos o valor estimado de mercado e nossa oferta, com análise de 300+ anúncios reais.',
      icon: <Icon.Sparkle width={28} height={28}/>,
    },
    {
      n: '03',
      title: 'Vistoria gratuita',
      desc: 'Um avaliador certificado vai até você ou uma loja parceira. Sem custo, sem compromisso.',
      icon: <Icon.Shield width={28} height={28}/>,
    },
    {
      n: '04',
      title: 'Receba o pagamento',
      desc: 'Dinheiro na conta em até 24h após a vistoria. Cuidamos de toda a burocracia: transferência, Detran, quitação.',
      icon: <Icon.Money width={28} height={28}/>,
    },
  ];
  return (
    <section id="como-funciona" style={{ padding: '120px 40px', background: 'var(--paper)' }}>
      <div style={{ maxWidth: 1360, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 80, marginBottom: 64 }}>
          <div>
            <span className="chip chip-outline" style={{ marginBottom: 20 }}>Como funciona</span>
            <h2 style={{ fontSize: 64, lineHeight: 0.98, letterSpacing: '-0.03em', fontWeight: 700 }}>
              Vendemos pelo <span className="hl">melhor preço</span><br/>de forma rápida e segura.
            </h2>
          </div>
          <div style={{ alignSelf: 'end' }}>
            <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--ink-600)', maxWidth: 520 }}>
              <strong style={{ color: 'var(--ink-900)' }}>Venda por mais, com segurança.</strong> Anunciamos seu carro para até 500.000 pessoas, cuidamos da negociação, preparação, polimento cortesia e ainda vendemos com garantia. Tudo para você vender com tranquilidade, sem dor de cabeça e por um preço bacana.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, border: '1px solid var(--ink-100)', borderRadius: 24, overflow: 'hidden' }}>
          {steps.map((s, i) => (
            <div key={i} style={{
              padding: '36px 28px 32px',
              borderRight: i < 3 ? '1px solid var(--ink-100)' : 'none',
              background: 'var(--paper)',
              position: 'relative',
              minHeight: 280,
            }}>
              <div className="mono" style={{ fontSize: 12, color: 'var(--ink-400)', letterSpacing: '0.1em', marginBottom: 28 }}>
                STEP / {s.n}
              </div>
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: 'var(--amper-yellow)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 20,
              }}>
                {s.icon}
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.015em', marginBottom: 10 }}>{s.title}</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.5, color: 'var(--ink-600)' }}>{s.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <button className="btn btn-dark btn-lg" onClick={onStart}>
            Começar avaliação <Icon.Arrow width={18} height={18}/>
          </button>
        </div>
      </div>
    </section>
  );
};

/* ---------- DIFFERENTIALS ---------- */
const Differentials = () => {
  const items = [
    {
      title: 'Venda por mais',
      body: 'Carrão cuidado, com fotos profissionais e garantia, vende em média 10% a mais que concessionária. Você fica com a diferença.',
      kpi: '+10%',
      kpiNote: '',
      big: true,
    },
    {
      title: 'Garantia Amper 1 ano',
      body: 'Carros 2015+ com até 150.000 km recebem certificado de garantia de motor e câmbio para o comprador — cortesia. É o que faz seu carro vender mais rápido e por mais.',
      icon: <Icon.Shield/>,
    },
    {
      title: 'Preparação completa cortesia',
      body: 'Fotos e vídeos profissionais, polimento e cristalização, tapeçaria e pequenos reparos de funilaria (riscos, amassados leves). Seu carro chega pronto pro anúncio.',
      icon: <Icon.Sparkle/>,
    },
    {
      title: 'Financiamento aprovado',
      body: 'Comprador já chega com crédito pré-aprovado nos principais bancos parceiros. Menos atrito, venda mais rápida.',
      icon: <Icon.Money/>,
    },
    {
      title: 'Use o carro até vender',
      body: 'Você não se desfaz do carro antes da hora. Continua dirigindo normalmente — a gente avisa quando aparecer comprador.',
      icon: <Icon.MapPin/>,
    },
    {
      title: 'Só paga se vender',
      body: 'Comissão cobrada apenas após a venda concretizada. Sem mensalidade, sem taxa de anúncio. Risco zero pra você.',
      icon: <Icon.Doc/>,
    },
  ];
  return (
    <section id="diferenciais" style={{ padding: '120px 40px', background: 'var(--surface-warm)' }}>
      <div style={{ maxWidth: 1360, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', marginBottom: 56, gap: 40, flexWrap: 'wrap' }}>
          <div>
            <span className="chip chip-outline" style={{ marginBottom: 20 }}>Por que Amper</span>
            <h2 style={{ fontSize: 64, lineHeight: 0.98, letterSpacing: '-0.03em', fontWeight: 700, maxWidth: 720 }}>
              Justo com você.<br/>Brutal com a <span className="hl">burocracia</span>.
            </h2>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16 }}>
          {/* big card */}
          <div style={{
            gridColumn: 'span 3', gridRow: 'span 2',
            background: 'var(--ink-900)', color: 'white',
            borderRadius: 24, padding: 40,
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            minHeight: 420, position: 'relative', overflow: 'hidden',
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
                <span className="chip chip-yellow"><Icon.Sparkle width={12} height={12}/> Concierge</span>
                <span className="mono" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>AMPER</span>
              </div>
              <h3 style={{ fontSize: 42, lineHeight: 1, letterSpacing: '-0.025em', fontWeight: 600, maxWidth: 380, marginBottom: 18 }}>
                {items[0].title}
              </h3>
              <p style={{ fontSize: 16, lineHeight: 1.55, color: 'rgba(255,255,255,0.7)', maxWidth: 380 }}>
                {items[0].body}
              </p>
            </div>

            {/* mini chart */}
            <div style={{ marginTop: 36 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 16 }}>
                <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--amper-yellow)' }}>+10%</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)' }}>a mais que concessionária</div>
              </div>
              <svg viewBox="0 0 400 80" width="100%" height="80">
                {[45, 52, 48, 58, 54, 62, 56, 65, 72, 68, 74, 82].map((h, i) => (
                  <rect key={i} x={i * 32 + 2} y={80 - h} width="18" height={h} rx="2"
                    fill={i === 11 ? 'var(--amper-yellow)' : 'rgba(255,255,255,0.15)'}/>
                ))}
              </svg>
            </div>
          </div>

          {items.slice(1).map((it, i) => (
            <div key={i} style={{
              gridColumn: 'span 3',
              background: 'var(--paper)', borderRadius: 20, padding: 28,
              border: '1px solid var(--ink-100)',
              display: 'flex', gap: 20, alignItems: 'flex-start',
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 10,
                background: 'var(--surface)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                {React.cloneElement(it.icon, { width: 22, height: 22 })}
              </div>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.015em', marginBottom: 6 }}>{it.title}</h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.5, color: 'var(--ink-600)' }}>{it.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- SOCIAL PROOF ---------- */
const Testimonials = () => {
  const quotes = [
    {
      text: 'Vendi meu Corolla em 5 dias. A oferta da Amper foi R$ 6.500 maior que a melhor proposta que recebi em loja.',
      author: 'Marina L.', carro: 'Corolla XEi 2021', city: 'São Paulo', price: 'R$ 127.500',
    },
    {
      text: 'Estava com medo de golpe anunciando no OLX. A Amper mandou o avaliador em casa, tudo certinho. Recebi por TED no mesmo dia.',
      author: 'Roberto M.', carro: 'HB20 Comfort 2022', city: 'Campinas', price: 'R$ 82.000',
    },
    {
      text: 'Nunca vi algo tão direto. Digitei a placa, apareceu a oferta, marquei vistoria, pronto. Zero ligações, zero estresse.',
      author: 'Camila P.', carro: 'Jeep Compass 2023', city: 'Curitiba', price: 'R$ 184.500',
    },
  ];
  return (
    <section style={{ padding: '120px 40px', background: 'var(--paper)' }}>
      <div style={{ maxWidth: 1360, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 56, flexWrap: 'wrap', gap: 24 }}>
          <h2 style={{ fontSize: 56, lineHeight: 1, letterSpacing: '-0.03em', fontWeight: 700, maxWidth: 720 }}>
            O que dizem quem já vendeu com a Amper.
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', gap: 2 }}>
              {[0,1,2,3,4].map(i => <Icon.Star key={i} width={22} height={22} style={{ color: 'var(--amper-yellow)' }}/>)}
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>4,9 / 5</div>
              <div style={{ fontSize: 13, color: 'var(--ink-500)' }}>em 8.400+ avaliações no Reclame Aqui</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {quotes.map((q, i) => (
            <div key={i} style={{
              background: 'var(--surface)', borderRadius: 20, padding: 32,
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 320,
              border: '1px solid var(--ink-100)',
            }}>
              <div>
                <div style={{ fontSize: 42, lineHeight: 1, color: 'var(--amper-yellow)', fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: 12 }}>"</div>
                <p style={{ fontSize: 17, lineHeight: 1.5, color: 'var(--ink-800)', letterSpacing: '-0.005em' }}>{q.text}</p>
              </div>
              <div style={{ borderTop: '1px solid var(--ink-200)', paddingTop: 18, marginTop: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 12 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{q.author}</div>
                    <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>{q.carro} · {q.city}</div>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{q.price}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { HowItWorks, Differentials, Testimonials });
