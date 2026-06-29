/* global React, Icon, AmperLogo, fmtBRL, fmtBRLShort */

const Nav = ({ onStart, compact }) => {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 40,
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      background: scrolled ? 'rgba(247,246,243,0.82)' : 'rgba(247,246,243,0.0)',
      borderBottom: scrolled ? '1px solid var(--ink-100)' : '1px solid transparent',
      transition: 'background 180ms, border-color 180ms',
    }}>
      <div style={{
        maxWidth: 1360, margin: '0 auto',
        padding: '18px 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
      }}>
        <AmperLogo size={26} />
        <nav style={{ display: 'flex', gap: 32, fontSize: 14, fontWeight: 500, color: 'var(--ink-700)' }}>
          <a href="#como-funciona">Como funciona</a>
          <a href="#diferenciais">Por que Amper</a>
          <a href="#vendas">Vendas recentes</a>
          <a href="#comparativo">Compare</a>
          <a href="#faq">Dúvidas</a>
        </nav>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button className="btn btn-ghost btn-sm">Entrar</button>
          <button className="btn btn-primary btn-sm" onClick={onStart}>
            Avaliar meu carro <Icon.Arrow width={16} height={16} />
          </button>
        </div>
      </div>
    </header>
  );
};

/* ---------- HERO ---------- */
const Hero = ({ onStart }) => {
  const [, force] = React.useReducer(x => x + 1, 0);
  React.useEffect(() => {
    const h = () => force();
    window.addEventListener('amper-tweaks-changed', h);
    return () => window.removeEventListener('amper-tweaks-changed', h);
  }, []);
  const copy = (window.__AMPER_COPY) || {};
  const ctaLabel = copy.ctaLabel || 'Ver quanto vale';

  const [tab, setTab] = React.useState('placa');
  const [plate, setPlate] = React.useState('');
  const [brand, setBrand] = React.useState('');
  const [model, setModel] = React.useState('');
  const [year, setYear] = React.useState('');

  const canStartPlate = plate.replace(/[^A-Z0-9]/gi, '').length >= 7;
  const canStartManual = brand && model && year;

  const handlePlate = (e) => {
    let v = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 7);
    if (v.length > 3) v = v.slice(0, 3) + '-' + v.slice(3);
    setPlate(v);
  };

  const startPlate = () => {
    if (!canStartPlate) return;
    onStart({ mode: 'placa', plate });
  };
  const startManual = () => {
    if (!canStartManual) return;
    onStart({ mode: 'manual', brand, model, year });
  };

  return (
    <section style={{ position: 'relative', padding: '60px 40px 80px', overflow: 'hidden' }}>
      {/* decorative scribble */}
      <svg width="420" height="240" viewBox="0 0 420 240" style={{ position: 'absolute', top: 90, right: -60, opacity: 0.5, pointerEvents: 'none' }}>
        <path d="M20 180 C 80 40, 200 220, 260 120 S 400 40, 400 80" stroke="#FFD60A" strokeWidth="36" fill="none" strokeLinecap="round" opacity="0.35"/>
      </svg>

      <div style={{ maxWidth: 1360, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 64, alignItems: 'center' }}>
        {/* Left: headline */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
            <span className="chip chip-dark"><Icon.Sparkle width={12} height={12}/> Amper</span>
            <span style={{ fontSize: 13, color: 'var(--ink-500)' }}>Venda sem sair de casa</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(52px, 5.8vw, 92px)',
            lineHeight: 0.95,
            letterSpacing: '-0.035em',
            fontWeight: 700,
            marginBottom: 28,
          }}>
            Oferta Instantânea.<br/>
            Venda com <span className="hl">Segurança</span>,<br/>
            sem dor de cabeça. Sem Golpes.
          </h1>

          <p style={{ fontSize: 19, lineHeight: 1.5, color: 'var(--ink-600)', maxWidth: 520, marginBottom: 36 }}>
            A Amper cuida de tudo: vistoria cautelar, fotos profissionais, financiamento aprovado pra compradores verificados. Você continua usando o carro até a venda — sem perda de tempo, sem atender desconhecidos.
          </p>

          {/* trust strip */}
          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', alignItems: 'center' }}>
            {[
              { icon: <Icon.CheckCircle/>, text: 'Use o carro até a venda' },
              { icon: <Icon.CheckCircle/>, text: 'Vendemos em poucos dias' },
              { icon: <Icon.CheckCircle/>, text: 'Vistoria Cautelar' },
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--ink-700)' }}>
                <span style={{ color: 'var(--success)' }}>{t.icon}</span>
                {t.text}
              </div>
            ))}
          </div>
        </div>

        {/* Right: simulator card */}
        <div className="card" style={{
          padding: 28,
          borderRadius: 24,
          boxShadow: 'var(--shadow-lift)',
          border: '1px solid var(--ink-100)',
          background: 'white',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <div className="label" style={{ marginBottom: 4 }}>Avaliação instantânea</div>
              <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.015em' }}>Quanto vale o seu carro?</div>
            </div>
            <span className="chip chip-yellow"><Icon.Bolt width={12} height={12}/> 60s</span>
          </div>

          {/* Tabs */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            background: 'var(--surface)', borderRadius: 12, padding: 4, marginBottom: 20, gap: 2,
          }}>
            {[
              { id: 'placa', label: 'Pela placa', icon: <Icon.Plate/> },
              { id: 'manual', label: 'Marca e modelo', icon: <Icon.Car/> },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                style={{
                  height: 44, borderRadius: 9,
                  background: tab === t.id ? 'white' : 'transparent',
                  color: tab === t.id ? 'var(--ink-900)' : 'var(--ink-500)',
                  fontWeight: 600, fontSize: 14,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  boxShadow: tab === t.id ? '0 1px 0 rgba(10,10,10,.08), 0 2px 6px rgba(10,10,10,.04)' : 'none',
                  transition: 'all 180ms',
                }}>
                {React.cloneElement(t.icon, { width: 18, height: 18 })}
                {t.label}
              </button>
            ))}
          </div>

          {tab === 'placa' ? (
            <div>
              <div className="label" style={{ marginBottom: 8 }}>Placa</div>
              <div style={{
                background: 'linear-gradient(180deg, #fff 0%, #fafaf7 100%)',
                border: '2px solid var(--ink-900)',
                borderRadius: 10,
                padding: '14px 18px',
                marginBottom: 6,
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <div style={{
                  background: 'var(--ink-900)', color: 'white',
                  fontSize: 11, fontWeight: 700, letterSpacing: 2,
                  padding: '2px 6px', borderRadius: 3,
                }}>BR</div>
                <input
                  value={plate}
                  onChange={handlePlate}
                  placeholder="ABC-1D23"
                  style={{
                    border: 0, outline: 0, background: 'transparent',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 30, fontWeight: 700, letterSpacing: '0.12em',
                    flex: 1, textAlign: 'center',
                  }}
                />
              </div>
              <div style={{ fontSize: 12, color: 'var(--ink-400)', marginBottom: 20 }}>
                Vamos identificar a marca, modelo e ano automaticamente.
              </div>

              <button
                className="btn btn-primary btn-lg"
                onClick={startPlate}
                disabled={!canStartPlate}
                style={{
                  width: '100%',
                  opacity: canStartPlate ? 1 : 0.5,
                  cursor: canStartPlate ? 'pointer' : 'not-allowed',
                }}>
                {ctaLabel} <Icon.Arrow width={18} height={18}/>
              </button>

                         <div style={{ textAlign: 'center', marginTop: 14 }}>
                <button
                  onClick={() => setTab('manual')}
                  style={{ fontSize: 13, color: 'var(--ink-500)', textDecoration: 'underline' }}>
                  Não sei a placa
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Field label="Marca">
                <select value={brand} onChange={(e) => { setBrand(e.target.value); setModel(''); }} style={selStyle}>
                  <option value="">Selecione</option>
                  {window.FIPE.brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
              </Field>
              <Field label="Modelo">
                <select value={model} onChange={(e) => setModel(e.target.value)} disabled={!brand} style={selStyle}>
                  <option value="">{brand ? 'Selecione' : 'Escolha a marca'}</option>
                  {brand && window.FIPE.models[brand].map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </Field>
              <Field label="Ano">
                <select value={year} onChange={(e) => setYear(e.target.value)} style={selStyle}>
                  <option value="">Selecione</option>
                  {window.YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </Field>
              <button
                className="btn btn-primary btn-lg"
                onClick={startManual}
                disabled={!canStartManual}
                style={{
                  width: '100%', marginTop: 8,
                  opacity: canStartManual ? 1 : 0.5,
                  cursor: canStartManual ? 'pointer' : 'not-allowed',
                }}>
                {ctaLabel} <Icon.Arrow width={18} height={18}/>
              </button>
            </div>
          )}

          <div style={{
            marginTop: 20, paddingTop: 18,
            borderTop: '1px solid var(--ink-100)',
            display: 'flex', alignItems: 'center', gap: 10,
            fontSize: 13, color: 'var(--ink-500)',
          }}>
            <Icon.Shield width={16} height={16} />
            Seus dados são protegidos pela LGPD. Não enviamos spam.
          </div>
        </div>
      </div>
    </section>
  );
};

const selStyle = {
  width: '100%', height: 48, padding: '0 14px',
  border: '1px solid var(--ink-200)', borderRadius: 10,
  background: 'white', fontSize: 15, fontWeight: 500,
  appearance: 'none',
  backgroundImage: 'url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'8\' viewBox=\'0 0 12 8\' fill=\'none\'%3E%3Cpath d=\'M1 1.5L6 6.5L11 1.5\' stroke=\'%230A0A0A\' stroke-width=\'1.6\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3E%3C/svg%3E")',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 14px center',
};

const Field = ({ label, children }) => (
  <label style={{ display: 'block' }}>
    <div className="label" style={{ marginBottom: 6 }}>{label}</div>
    {children}
  </label>
);

/* ---------- BAR: stats row ---------- */
const StatsBar = () => (
  <div style={{
    background: 'var(--ink-900)', color: 'white',
    padding: '28px 40px',
  }}>
    <div style={{
      maxWidth: 1360, margin: '0 auto',
      display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24,
    }}>
      {[
        { k: '+1.000', v: 'veículos vendidos' },
        { k: '4,6 / 5', v: 'avaliação dos clientes' },
        { k: '7 dias', v: 'tempo médio de venda' },
        { k: 'R$ 50M', v: 'transacionados com segurança' },
      ].map((s, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', borderLeft: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.1)', paddingLeft: i === 0 ? 0 : 24 }}>
          <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', fontFamily: 'var(--font-display)' }}>{s.k}</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.v}</div>
        </div>
      ))}
    </div>
  </div>
);

Object.assign(window, { Nav, Hero, StatsBar });
