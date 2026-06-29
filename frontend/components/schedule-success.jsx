/* global React, Icon, AmperLogo, fmtBRL, FIPE */

// Schedule inspection page (after accepting offer)
const Schedule = ({ offer, data, onConfirm, onBack }) => {
  const isMobile = useIsMobile();
  const [mode, setMode] = React.useState('casa');
  const [date, setDate] = React.useState(2);
  const [slot, setSlot] = React.useState(1);
  const [cep, setCep] = React.useState('');
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');

  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      day: d.getDate(),
      weekday: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'][d.getDay()],
      month: ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'][d.getMonth()],
    };
  });
  const slots = ['08:00 – 10:00', '10:00 – 12:00', '13:00 – 15:00', '15:00 – 17:00'];
  const brand = FIPE.brands.find(b => b.id === data.brand);

  const canConfirm = name && phone.length >= 10 && (mode === 'loja' || cep.length >= 8);

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '32px 20px 80px' : '48px 40px 100px' }}>
      <button onClick={onBack} style={{ fontSize: 14, color: 'var(--ink-500)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 24 }}>
        ← Voltar para a oferta
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 400px', gap: isMobile ? 28 : 40 }}>
        <div>
          <span className="chip chip-yellow" style={{ marginBottom: 16 }}><Icon.Check width={12} height={12}/> Oferta aceita</span>
          <h1 style={{ fontSize: isMobile ? 30 : 42, lineHeight: 1.05, letterSpacing: '-0.03em', fontWeight: 700, marginBottom: 12 }}>
            Agende sua vistoria gratuita.
          </h1>
          <p style={{ fontSize: 16, color: 'var(--ink-600)', marginBottom: 40, lineHeight: 1.5 }}>
            Um avaliador técnico faz a vistoria em 30 minutos. É grátis e sem compromisso — você só confirma a venda no final.
          </p>

          {/* Mode */}
          <div className="label" style={{ marginBottom: 12 }}>Onde prefere?</div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 12, marginBottom: 36 }}>
            {[
              { id: 'casa', icon: <Icon.Home/>, title: 'Na sua casa ou trabalho', sub: 'Grátis · avaliador vai até você' },
              { id: 'loja', icon: <Icon.MapPin/>, title: 'Em uma loja parceira', sub: '120+ pontos · horários ampliados' },
            ].map(m => {
              const active = mode === m.id;
              return (
                <button key={m.id} onClick={() => setMode(m.id)} style={{
                  padding: 20, borderRadius: 14,
                  border: active ? '2px solid var(--ink-900)' : '1px solid var(--ink-200)',
                  background: active ? 'var(--amper-yellow-soft)' : 'var(--paper)',
                  textAlign: 'left', display: 'flex', gap: 14, alignItems: 'flex-start',
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: active ? 'var(--amper-yellow)' : 'var(--surface)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    {React.cloneElement(m.icon, { width: 20, height: 20 })}
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 2 }}>{m.title}</div>
                    <div style={{ fontSize: 13, color: 'var(--ink-500)' }}>{m.sub}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Date */}
          <div className="label" style={{ marginBottom: 12 }}>Data</div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(4, 1fr)' : 'repeat(7, 1fr)', gap: 8, marginBottom: 24 }}>
            {dates.map((d, i) => {
              const active = date === i;
              return (
                <button key={i} onClick={() => setDate(i)} style={{
                  padding: '14px 0', borderRadius: 12,
                  border: active ? '2px solid var(--ink-900)' : '1px solid var(--ink-200)',
                  background: active ? 'var(--ink-900)' : 'var(--paper)',
                  color: active ? 'white' : 'var(--ink-900)',
                  textAlign: 'center', transition: 'all 140ms',
                }}>
                  <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', opacity: 0.6, fontWeight: 600 }}>{d.weekday}</div>
                  <div style={{ fontSize: 22, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{d.day}</div>
                  <div style={{ fontSize: 11, opacity: 0.6 }}>{d.month}</div>
                </button>
              );
            })}
          </div>

          {/* Slot */}
          <div className="label" style={{ marginBottom: 12 }}>Horário</div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 8, marginBottom: 36 }}>
            {slots.map((s, i) => {
              const active = slot === i;
              return (
                <button key={i} onClick={() => setSlot(i)} style={{
                  padding: '14px 0', borderRadius: 10,
                  border: active ? '2px solid var(--ink-900)' : '1px solid var(--ink-200)',
                  background: active ? 'var(--amper-yellow-soft)' : 'var(--paper)',
                  fontSize: 14, fontWeight: 600, fontFamily: 'var(--font-mono)',
                }}>{s}</button>
              );
            })}
          </div>

          {/* Contact */}
          <div className="label" style={{ marginBottom: 12 }}>Seus dados</div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <input placeholder="Nome completo" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle}/>
            <input placeholder="(11) 99999-9999" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g,'').slice(0,11))} style={inputStyle}/>
          </div>
          {mode === 'casa' && (
            <input placeholder="CEP (00000-000)" value={cep} onChange={(e) => setCep(e.target.value.replace(/\D/g,'').slice(0,8))} style={{ ...inputStyle, width: '100%' }}/>
          )}

          <button onClick={onConfirm} disabled={!canConfirm} className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 32, opacity: canConfirm ? 1 : 0.4, cursor: canConfirm ? 'pointer' : 'not-allowed' }}>
            Confirmar vistoria <Icon.Arrow width={18} height={18}/>
          </button>
        </div>

        {/* Summary aside */}
        <aside>
          <div className="card" style={{ padding: 28, position: 'sticky', top: 120 }}>
            <div className="label" style={{ marginBottom: 16 }}>Seu carro</div>
            <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.015em', marginBottom: 4 }}>
              {brand?.name} {data.model}
            </div>
            <div style={{ fontSize: 13, color: 'var(--ink-500)', marginBottom: 24 }}>
              {data.year} · {data.version} · {data.km?.toLocaleString('pt-BR')} km
            </div>

            <div style={{ background: 'var(--ink-900)', color: 'white', borderRadius: 14, padding: 20, marginBottom: 20 }}>
              <div style={{ fontSize: 11, color: 'var(--amper-yellow)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 6 }}>Oferta Amper</div>
              <div className="mono" style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.025em' }}>{fmtBRL(offer)}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 4 }}>Válida por 7 dias</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { icon: <Icon.Clock/>, t: 'Vistoria: 30 minutos' },
                { icon: <Icon.Check/>, t: 'Gratuita e sem compromisso' },
                { icon: <Icon.Money/>, t: 'TED em 24h após vistoria' },
                { icon: <Icon.Doc/>, t: 'Burocracia por nossa conta' },
              ].map((x, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, fontSize: 13.5, color: 'var(--ink-700)' }}>
                  <span style={{ color: 'var(--success)', flexShrink: 0 }}>{React.cloneElement(x.icon, { width: 16, height: 16 })}</span>
                  {x.t}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

const inputStyle = {
  height: 52, padding: '0 16px',
  border: '1px solid var(--ink-200)', borderRadius: 10,
  fontSize: 15, background: 'var(--paper)',
  fontFamily: 'var(--font-body)',
};

// Success page
const Success = ({ data, offer, onRestart }) => {
  const isMobile = useIsMobile();
  const brand = FIPE.brands.find(b => b.id === data.brand);
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: isMobile ? '64px 20px' : '100px 40px', textAlign: 'center' }}>
      <div style={{
        width: 96, height: 96, borderRadius: '50%', background: 'var(--amper-yellow)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 32px',
      }}>
        <Icon.Check width={48} height={48}/>
      </div>
      <h1 style={{ fontSize: isMobile ? 34 : 52, lineHeight: 1.02, letterSpacing: '-0.03em', fontWeight: 700, marginBottom: 16 }}>
        Vistoria agendada!
      </h1>
      <p style={{ fontSize: 18, color: 'var(--ink-600)', lineHeight: 1.5, marginBottom: 24, maxWidth: 500, margin: '0 auto 24px' }}>
        {data.scheduled
          ? <>Sua vistoria está marcada para <strong>{data.scheduled.date.weekday}, {data.scheduled.date.day}/{data.scheduled.date.month}</strong> às <strong>{data.scheduled.slot}</strong>. Enviamos os detalhes por e-mail e SMS.</>
          : 'Enviamos um e-mail e SMS com os detalhes. Nosso avaliador entrará em contato 1 hora antes da vistoria.'
        }
      </p>

      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: 'var(--amper-yellow-soft)', borderRadius: 99, marginBottom: 40 }}>
        <Icon.Shield width={16} height={16}/>
        <span style={{ fontSize: 13.5, fontWeight: 600 }}>Carro elegível à Garantia Amper de 1 ano</span>
      </div>

      <div className="card" style={{ padding: 28, textAlign: 'left', marginBottom: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 16, borderBottom: '1px solid var(--ink-100)', marginBottom: 16 }}>
          <div>
            <div className="label">Veículo</div>
            <div style={{ fontSize: 17, fontWeight: 600, marginTop: 4 }}>{brand?.name} {data.model} {data.year}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="label">Oferta firme</div>
            <div className="mono" style={{ fontSize: 20, fontWeight: 700, marginTop: 4 }}>{fmtBRL(offer)}</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { n: 1, t: 'Vistoria técnica (30 min)', s: 'Gratuita, sem compromisso' },
            { n: 2, t: 'Assinatura digital do contrato', s: 'Via gov.br ou e-CPF' },
            { n: 3, t: 'Pagamento via TED', s: 'Em até 24h úteis' },
            { n: 4, t: 'Transferência no Detran', s: 'Cuidamos de tudo' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: 'var(--ink-900)', color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 700, flexShrink: 0,
              }}>{s.n}</div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{s.t}</div>
                <div style={{ fontSize: 13, color: 'var(--ink-500)' }}>{s.s}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={onRestart} className="btn btn-ghost">Voltar para o início</button>
    </div>
  );
};

Object.assign(window, { Schedule, Success });
