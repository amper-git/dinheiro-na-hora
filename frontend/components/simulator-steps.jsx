/* global React, Icon, AmperLogo, fmtBRL, fmtBRLShort, FIPE, YEARS, CONDITIONS, estimatePrice, amperOffer, sampleListings */

const SimulatorNav = ({ onExit, step, totalSteps, onStepClick, completedSteps }) => {
  const stepLabels = ['Marca', 'Modelo', 'Ano', 'Versão', 'Detalhes'];
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 30,
      background: 'var(--paper)', borderBottom: '1px solid var(--ink-100)',
    }}>
      <div style={{ maxWidth: 1360, margin: '0 auto', padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
        <AmperLogo size={24}/>

        <div style={{ flex: 1, maxWidth: 560, margin: '0 40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--ink-500)', marginBottom: 10, fontWeight: 600 }}>
            <span>Avaliação</span>
            <span className="mono">Passo {step} / {totalSteps}</span>
          </div>

          {/* Clickable step dots */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {Array.from({ length: totalSteps }, (_, i) => {
              const n = i + 1;
              const isCurrent = n === step;
              const isCompleted = completedSteps ? completedSteps[n] : n < step;
              const isClickable = !!onStepClick && (isCompleted || isCurrent || n < step);

              return (
                <React.Fragment key={n}>
                  <button
                    onClick={() => isClickable && onStepClick && onStepClick(n)}
                    disabled={!isClickable}
                    title={stepLabels[i]}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      padding: '6px 10px',
                      borderRadius: 99,
                      background: isCurrent ? 'var(--ink-900)' : isCompleted ? 'var(--amper-yellow-soft)' : 'transparent',
                      color: isCurrent ? 'white' : isCompleted ? 'var(--ink-900)' : 'var(--ink-400)',
                      border: 'none',
                      cursor: isClickable ? 'pointer' : 'not-allowed',
                      fontSize: 12.5, fontWeight: 600,
                      transition: 'all 160ms',
                      whiteSpace: 'nowrap',
                    }}>
                    <span style={{
                      width: 20, height: 20, borderRadius: '50%',
                      background: isCurrent ? 'var(--amper-yellow)' : isCompleted ? 'var(--ink-900)' : 'var(--ink-100)',
                      color: isCurrent ? 'var(--ink-900)' : isCompleted ? 'white' : 'var(--ink-500)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)',
                      flexShrink: 0,
                    }}>
                      {isCompleted && !isCurrent
                        ? <Icon.Check width={11} height={11}/>
                        : n
                      }
                    </span>
                    <span>{stepLabels[i]}</span>
                  </button>
                  {n < totalSteps && (
                    <div style={{
                      flex: '0 0 auto', width: 12, height: 2,
                      background: n < step ? 'var(--ink-900)' : 'var(--ink-100)',
                      transition: 'background 160ms',
                    }}/>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <button onClick={onExit} className="btn btn-ghost btn-sm">
          <Icon.Close width={16} height={16}/> Sair
        </button>
      </div>
    </header>
  );
};

const StepShell = ({ title, subtitle, children, onBack, onNext, nextLabel = 'Continuar', nextDisabled, aside }) => (
  <div style={{
    maxWidth: 1100, margin: '0 auto',
    padding: '56px 40px 100px',
    display: 'grid',
    gridTemplateColumns: aside ? '1fr 380px' : '1fr',
    gap: 48,
  }}>
    <div>
      <h1 style={{ fontSize: 44, lineHeight: 1.05, letterSpacing: '-0.03em', fontWeight: 700, marginBottom: 12 }}>{title}</h1>
      {subtitle && <p style={{ fontSize: 17, color: 'var(--ink-600)', marginBottom: 40, lineHeight: 1.5 }}>{subtitle}</p>}
      {children}
      <div style={{ display: 'flex', gap: 12, marginTop: 40 }}>
        {onBack && <button onClick={onBack} className="btn btn-ghost btn-lg">Voltar</button>}
        {onNext && (
          <button onClick={onNext} disabled={nextDisabled} className="btn btn-primary btn-lg" style={{ opacity: nextDisabled ? 0.4 : 1, cursor: nextDisabled ? 'not-allowed' : 'pointer' }}>
            {nextLabel} <Icon.Arrow width={18} height={18}/>
          </button>
        )}
      </div>
    </div>
    {aside && <aside>{aside}</aside>}
  </div>
);

// --- Step: Brand picker ---
const BrandStep = ({ value, onSelect }) => {
  const [q, setQ] = React.useState('');
  const list = FIPE.brands.filter(b => b.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <div style={{ position: 'relative', marginBottom: 24 }}>
        <Icon.Search width={18} height={18} style={{ position: 'absolute', left: 16, top: 17, color: 'var(--ink-400)' }}/>
        <input
          value={q} onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar marca"
          style={{
            width: '100%', height: 52, padding: '0 16px 0 44px',
            border: '1px solid var(--ink-200)', borderRadius: 12,
            fontSize: 15, background: 'var(--paper)',
          }}
        />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {list.map(b => {
          const active = value === b.id;
          return (
            <button key={b.id} onClick={() => onSelect(b.id)} style={{
              padding: 20, borderRadius: 14,
              border: active ? '2px solid var(--ink-900)' : '1px solid var(--ink-200)',
              background: active ? 'var(--amper-yellow-soft)' : 'var(--paper)',
              display: 'flex', alignItems: 'center', gap: 14,
              transition: 'all 140ms',
              fontWeight: 600, fontSize: 15,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 8,
                background: 'var(--ink-900)', color: 'var(--amper-yellow)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700, letterSpacing: 0.5,
              }}>{b.logo}</div>
              {b.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// --- Step: Model ---
const ModelStep = ({ brand, value, onSelect }) => {
  const models = FIPE.models[brand] || [];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
      {models.map(m => {
        const active = value === m;
        const price = FIPE.basePrice[`${brand}-${m}`] || 90000;
        return (
          <button key={m} onClick={() => onSelect(m)} style={{
            padding: 20, borderRadius: 14,
            border: active ? '2px solid var(--ink-900)' : '1px solid var(--ink-200)',
            background: active ? 'var(--amper-yellow-soft)' : 'var(--paper)',
            textAlign: 'left', transition: 'all 140ms',
          }}>
            <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 4 }}>{m}</div>
            <div className="mono" style={{ fontSize: 12, color: 'var(--ink-500)' }}>a partir de {fmtBRLShort(price * 0.55)}</div>
          </button>
        );
      })}
    </div>
  );
};

// --- Step: Year ---
const YearStep = ({ value, onSelect }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
    {YEARS.map(y => {
      const active = value === y;
      return (
        <button key={y} onClick={() => onSelect(y)} style={{
          height: 64, borderRadius: 12,
          border: active ? '2px solid var(--ink-900)' : '1px solid var(--ink-200)',
          background: active ? 'var(--amper-yellow-soft)' : 'var(--paper)',
          fontSize: 20, fontWeight: 700, fontFamily: 'var(--font-mono)',
          letterSpacing: '0.02em',
        }}>{y}</button>
      );
    })}
  </div>
);

// --- Step: Version ---
const VersionStep = ({ brand, model, value, onSelect }) => {
  const versions = window.getVersions(brand, model);
  const [q, setQ] = React.useState('');
  const list = versions.filter(v => v.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <div style={{ position: 'relative', marginBottom: 16 }}>
        <Icon.Search width={18} height={18} style={{ position: 'absolute', left: 16, top: 17, color: 'var(--ink-400)' }}/>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Pesquisar por versão"
          style={{ width: '100%', height: 52, padding: '0 16px 0 44px', border: '1px solid var(--ink-200)', borderRadius: 12, fontSize: 15, background: 'var(--paper)' }}/>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {list.map(v => {
          const active = value === v.name;
          return (
            <button key={v.name} onClick={() => onSelect(v.name)} style={{
              padding: '18px 20px', borderRadius: 14,
              border: active ? '2px solid var(--ink-900)' : '1px solid var(--ink-200)',
              background: active ? 'var(--amper-yellow-soft)' : 'var(--paper)',
              textAlign: 'left', transition: 'all 140ms',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
            }}>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 4 }}>{v.name}</div>
                <div style={{ fontSize: 12.5, color: 'var(--ink-500)', lineHeight: 1.45 }}>{window.formatSpecs(v.specs)}</div>
              </div>
              {active && <Icon.Check width={20} height={20} style={{ flexShrink: 0 }}/>}
            </button>
          );
        })}
      </div>
      <div style={{ marginTop: 18, padding: '12px 16px', background: 'var(--surface)', borderRadius: 10, display: 'flex', gap: 10, fontSize: 12.5, color: 'var(--ink-600)' }}>
        <Icon.Shield width={16} height={16} style={{ flexShrink: 0, marginTop: 1 }}/>
        <div>Versões catalogadas conforme especificação oficial do fabricante.</div>
      </div>
    </div>
  );
};

// --- Step: KM & Condition ---
const DetailsStep = ({ km, setKm, condition, setCondition }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <div className="label">Quilometragem</div>
        <div className="mono" style={{ fontSize: 14, fontWeight: 700 }}>{km.toLocaleString('pt-BR')} km</div>
      </div>
      <input type="range" min="0" max="250000" step="1000" value={km} onChange={(e) => setKm(+e.target.value)}
        style={{ width: '100%', accentColor: '#0A0A0A' }}/>
      <div className="mono" style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--ink-400)', marginTop: 6 }}>
        <span>0</span><span>125k</span><span>250k+</span>
      </div>
    </div>
    <div>
      <div className="label" style={{ marginBottom: 12 }}>Estado de conservação</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        {CONDITIONS.map(c => {
          const active = condition === c.id;
          return (
            <button key={c.id} onClick={() => setCondition(c.id)} style={{
              padding: 18, borderRadius: 14,
              border: active ? '2px solid var(--ink-900)' : '1px solid var(--ink-200)',
              background: active ? 'var(--amper-yellow-soft)' : 'var(--paper)',
              textAlign: 'left', transition: 'all 140ms',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: 16, fontWeight: 600 }}>{c.label}</span>
                {active && <Icon.Check width={18} height={18}/>}
              </div>
              <div style={{ fontSize: 13, color: 'var(--ink-500)' }}>{c.desc}</div>
            </button>
          );
        })}
      </div>
    </div>
  </div>
);

// --- Step: AI Analyzing ---
const AnalyzingStep = () => {
  const [phase, setPhase] = React.useState(0);
  const phases = [
    'Identificando versão e especificações…',
    'Analisando histórico de vendas do modelo…',
    'Calculando valor de mercado…',
    'Aplicando margem e elegibilidade de garantia…',
    'Finalizando sua oferta firme…',
  ];
  React.useEffect(() => {
    if (phase < phases.length - 1) {
      const t = setTimeout(() => setPhase(phase + 1), 700);
      return () => clearTimeout(t);
    }
  }, [phase]);
  return (
    <div style={{ padding: '80px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <div style={{ position: 'relative', width: 120, height: 120, marginBottom: 40 }}>
        <svg viewBox="0 0 120 120" style={{ position: 'absolute', inset: 0 }}>
          <circle cx="60" cy="60" r="52" stroke="var(--ink-100)" strokeWidth="8" fill="none"/>
          <circle cx="60" cy="60" r="52" stroke="var(--amper-yellow)" strokeWidth="8" fill="none" strokeLinecap="round"
            strokeDasharray={`${((phase + 1) / phases.length) * 326.7} 326.7`}
            transform="rotate(-90 60 60)" style={{ transition: 'stroke-dasharray 600ms ease' }}/>
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon.Sparkle width={40} height={40}/>
        </div>
      </div>
      <h2 style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.025em', marginBottom: 32 }}>
        Analisando o mercado para você…
      </h2>
      <div style={{ width: '100%', maxWidth: 460 }}>
        {phases.map((p, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '12px 18px', borderRadius: 10,
            background: i === phase ? 'var(--amper-yellow-soft)' : 'transparent',
            opacity: i <= phase ? 1 : 0.35,
            marginBottom: 4,
            transition: 'all 300ms',
          }}>
            <div style={{
              width: 22, height: 22, borderRadius: '50%',
              background: i < phase ? 'var(--success)' : i === phase ? 'var(--amper-yellow)' : 'var(--ink-200)',
              color: i < phase ? 'white' : 'var(--ink-900)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {i < phase ? <Icon.Check width={14} height={14}/> : <span className="mono" style={{ fontSize: 11, fontWeight: 700 }}>{i + 1}</span>}
            </div>
            <span style={{ fontSize: 14.5, fontWeight: 500, textAlign: 'left' }}>{p}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Aside: live summary
const Summary = ({ brand, model, year, version, km, condition }) => {
  const b = FIPE.brands.find(x => x.id === brand);
  const cond = CONDITIONS.find(x => x.id === condition);
  return (
    <div className="card" style={{ padding: 24, position: 'sticky', top: 120, border: '1px solid var(--ink-100)' }}>
      <div className="label" style={{ marginBottom: 12 }}>Resumo</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[
          { k: 'Marca', v: b?.name || '—' },
          { k: 'Modelo', v: model || '—' },
          { k: 'Ano', v: year || '—' },
          { k: 'Versão', v: version || '—' },
          { k: 'KM', v: km ? `${km.toLocaleString('pt-BR')} km` : '—' },
          { k: 'Estado', v: cond?.label || '—' },
        ].map((r, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
            <span style={{ color: 'var(--ink-500)' }}>{r.k}</span>
            <span style={{ fontWeight: 600 }}>{r.v}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 24, paddingTop: 18, borderTop: '1px solid var(--ink-100)', display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: 'var(--ink-500)' }}>
        <Icon.Shield width={14} height={14}/> Dados protegidos · LGPD
      </div>
    </div>
  );
};

Object.assign(window, { SimulatorNav, StepShell, BrandStep, ModelStep, YearStep, VersionStep, DetailsStep, AnalyzingStep, Summary });
