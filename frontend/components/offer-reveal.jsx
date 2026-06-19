/* global React, Icon, AmperLogo, fmtBRL, fmtBRLShort, FIPE, CONDITIONS, estimatePrice, amperOffer, amperOfferRange, extraVsConcessionaria */

// Offer reveal page — what the client sees.
// Explicitly does NOT show: market estimate, FIPE, breakdown, classifieds, +% acima da média.
// Shows: target sale price (above market), what's included (warranty/photos/polish/financing), commission model, schedule.
const OfferReveal = ({ data, apiOffer, onAccept, onReject }) => {
  const [, force] = React.useReducer(x => x + 1, 0);
  React.useEffect(() => {
    const h = () => force();
    window.addEventListener('amper-tweaks-changed', h);
    return () => window.removeEventListener('amper-tweaks-changed', h);
  }, []);
  const showWarranty = window.__AMPER_SHOW_WARRANTY !== false;
  const showRange = window.__AMPER_SHOW_RANGE !== false;
  const showBonus = window.__AMPER_SHOW_BONUS !== false;
  const [revealed, setRevealed] = React.useState(false);

  // Se temos dados reais do backend, usa eles. Caso contrário usa mock.
  const marketPrice = apiOffer?.precoMercado ?? estimatePrice(data);
  const [range] = React.useState(() =>
    apiOffer?.ofertaRange
      ? { ...apiOffer.ofertaRange, center: apiOffer.ofertaAmper }
      : amperOfferRange(marketPrice)
  );
  const [bonus] = React.useState(() =>
    apiOffer?.bonusVsConcessionaria ?? extraVsConcessionaria(marketPrice)
  );

  // Rótulo do veículo: usa dados do backend (resolvidos pela placa) ou o FIPE mock.
  const vehicleName = apiOffer?.veiculo
    ? `${apiOffer.veiculo.marca} ${apiOffer.veiculo.modelo}`
    : null;

  // Scheduling state (embedded on offer page, per user request)
  const [pickedDate, setPickedDate] = React.useState(2);
  const [pickedSlot, setPickedSlot] = React.useState(null);

  React.useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 300);
    return () => clearTimeout(t);
  }, []);

  const brand = FIPE.brands.find(b => b.id === data.brand);
  const cond = CONDITIONS.find(c => c.id === data.condition);

  // next 7 weekdays
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      day: d.getDate(),
      weekday: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'][d.getDay()],
      month: ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'][d.getMonth()],
    };
  });
  const slots = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

  const handleAccept = () => {
    if (pickedSlot === null) {
      // scroll to schedule
      document.getElementById('schedule-anchor')?.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
      return;
    }
    onAccept({ date: dates[pickedDate], slot: slots[pickedSlot], offer: range.center });
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 40px 100px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <span className="chip chip-yellow"><Icon.Sparkle width={12} height={12}/> Análise concluída</span>
        <span style={{ fontSize: 13, color: 'var(--ink-500)' }}>
          Oferta firme · válida por <strong>7 dias</strong>
        </span>
      </div>

      <h1 style={{ fontSize: 44, lineHeight: 1.05, letterSpacing: '-0.03em', fontWeight: 700, marginBottom: 8 }}>
        Sua oferta pelo <span className="hl">{vehicleName || `${brand?.name} ${data.model}`}</span>
      </h1>
      <p style={{ fontSize: 16, color: 'var(--ink-600)', marginBottom: 36 }}>
        {apiOffer?.veiculo
          ? `${apiOffer.veiculo.ano} · ${data.km?.toLocaleString('pt-BR')} km · ${cond?.label}`
          : `${data.year} · ${data.version} · ${data.km?.toLocaleString('pt-BR')} km · ${cond?.label}`
        }
      </p>

      {/* Offer card — big range, bonus vs concessionária, warranty badge */}
      <div style={{
        background: 'var(--ink-900)', color: 'white',
        borderRadius: 28, padding: 48,
        position: 'relative', overflow: 'hidden',
        marginBottom: 28,
      }}>
        <div style={{
          position: 'absolute', top: -80, right: -80,
          width: 360, height: 360, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,214,10,0.20) 0%, transparent 70%)',
        }}/>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 48, alignItems: 'center', position: 'relative' }}>
          <div>
            <div className="label" style={{ color: 'var(--amper-yellow)', marginBottom: 18 }}>Preço-alvo de venda</div>

            {/* Range: from ... to ...  (or center-only when showRange is off) */}
            <div style={{
              opacity: revealed ? 1 : 0, transform: revealed ? 'none' : 'translateY(16px)',
              transition: 'all 600ms cubic-bezier(.2,.8,.2,1)',
            }}>
              {showRange ? (
                <>
                  <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.02em', marginBottom: 8 }}>
                    De
                  </div>
                  <div style={{
                    fontSize: 72, fontWeight: 700, letterSpacing: '-0.035em',
                    lineHeight: 1, fontFamily: 'var(--font-display)',
                  }}>
                    {fmtBRL(range.min)}
                  </div>
                  <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.02em', margin: '16px 0 8px' }}>
                    até
                  </div>
                  <div style={{
                    fontSize: 72, fontWeight: 700, letterSpacing: '-0.035em',
                    lineHeight: 1, fontFamily: 'var(--font-display)',
                  }}>
                    {fmtBRL(range.max)}
                  </div>
                </>
              ) : (
                <div style={{
                  fontSize: 96, fontWeight: 700, letterSpacing: '-0.035em',
                  lineHeight: 1, fontFamily: 'var(--font-display)',
                }}>
                  {fmtBRL(range.center)}
                </div>
              )}
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 18, maxWidth: 440, lineHeight: 1.5 }}>
                Preço que a Amper vai anunciar pelo seu carro. Você recebe esse valor menos a comissão (8%) após a venda — já acima do que loja ou concessionária pagariam à vista.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Bonus vs concessionária */}
            {showBonus && (
            <div style={{
              padding: '20px 22px', background: 'var(--amper-yellow)', color: 'var(--ink-900)',
              borderRadius: 16,
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icon.TrendUp width={14} height={14}/> Você recebe a mais
              </div>
              <div className="mono" style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1 }}>
                +{fmtBRL(bonus)}
              </div>
              <div style={{ fontSize: 13, marginTop: 8, fontWeight: 500, lineHeight: 1.4 }}>
                vs vender pra loja ou concessionária à vista.
              </div>
            </div>
            )}

            {/* Garantia Amper */}
            {showWarranty && (
            <div style={{
              padding: '18px 22px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 16,
              display: 'flex', gap: 14, alignItems: 'flex-start',
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: 'rgba(255,214,10,0.14)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Icon.Shield width={22} height={22} style={{ color: 'var(--amper-yellow)' }}/>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--amper-yellow)', marginBottom: 4 }}>
                  Elegível
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.35, marginBottom: 4 }}>
                  Incluído: garantia + fotos + polimento
                </div>
                <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.55)', lineHeight: 1.4 }}>
                  Certificado 1 ano (motor/câmbio), sessão fotográfica e polimento profissional. Tudo cortesia.
                </div>
              </div>
            </div>
            )}

            <div style={{
              padding: '14px 18px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12,
              display: 'flex', gap: 12, alignItems: 'center',
            }}>
              <Icon.Clock width={18} height={18} style={{ color: 'rgba(255,255,255,0.6)', flexShrink: 0 }}/>
              <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.8)' }}>
                Pagamento <strong style={{ color: 'white' }}>em até 24h</strong> após vistoria (TED).
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded scheduler */}
      <div id="schedule-anchor" className="card" style={{
        padding: 36, border: '1px solid var(--ink-100)',
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4, gap: 16, flexWrap: 'wrap' }}>
          <h3 style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Agende sua vistoria gratuita</h3>
          <span style={{ fontSize: 13, color: 'var(--ink-500)' }}>30 min · em casa ou em loja parceira · sem compromisso</span>
        </div>
        <p style={{ fontSize: 14.5, color: 'var(--ink-600)', marginBottom: 28, maxWidth: 680 }}>
          Nosso avaliador confirma o estado do veículo e libera o pagamento. Escolha o melhor dia e horário para você:
        </p>

        {/* Date grid */}
        <div className="label" style={{ marginBottom: 10 }}>Data</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 10, marginBottom: 28 }}>
          {dates.map((d, i) => {
            const active = pickedDate === i;
            return (
              <button key={i} onClick={() => { setPickedDate(i); setPickedSlot(null); }} style={{
                padding: '14px 0', borderRadius: 12,
                border: active ? '2px solid var(--ink-900)' : '1px solid var(--ink-200)',
                background: active ? 'var(--ink-900)' : 'var(--paper)',
                color: active ? 'white' : 'var(--ink-900)',
                textAlign: 'center', transition: 'all 140ms',
                cursor: 'pointer',
              }}>
                <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', opacity: 0.6, fontWeight: 600 }}>{d.weekday}</div>
                <div style={{ fontSize: 22, fontWeight: 700, fontFamily: 'var(--font-mono)', lineHeight: 1.2 }}>{d.day}</div>
                <div style={{ fontSize: 11, opacity: 0.6 }}>{d.month}</div>
              </button>
            );
          })}
        </div>

        {/* Slot buttons */}
        <div className="label" style={{ marginBottom: 10 }}>Horário disponível</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 32 }}>
          {slots.map((s, i) => {
            const active = pickedSlot === i;
            // mark some as occupied (every 3rd)
            const taken = (pickedDate + i) % 5 === 3;
            return (
              <button
                key={i}
                onClick={() => !taken && setPickedSlot(i)}
                disabled={taken}
                style={{
                  height: 56, borderRadius: 12,
                  border: active ? '2px solid var(--ink-900)' : '1px solid var(--ink-200)',
                  background: taken ? 'var(--surface)' : active ? 'var(--amper-yellow)' : 'var(--paper)',
                  color: taken ? 'var(--ink-400)' : 'var(--ink-900)',
                  fontSize: 16, fontWeight: 700, fontFamily: 'var(--font-mono)',
                  cursor: taken ? 'not-allowed' : 'pointer',
                  textDecoration: taken ? 'line-through' : 'none',
                  transition: 'all 140ms',
                }}>
                {s}
              </button>
            );
          })}
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={handleAccept}
            disabled={pickedSlot === null}
            className="btn btn-primary btn-lg"
            style={{
              flex: 1, minWidth: 300,
              opacity: pickedSlot === null ? 0.5 : 1,
              cursor: pickedSlot === null ? 'not-allowed' : 'pointer',
            }}>
            {pickedSlot !== null
              ? <>Confirmar {dates[pickedDate].day}/{dates[pickedDate].month} às {slots[pickedSlot]} <Icon.Arrow width={18} height={18}/></>
              : <>Selecione um horário</>
            }
          </button>
          <button onClick={onReject} className="btn btn-ghost btn-lg">
            Renegociar
          </button>
        </div>

        <div style={{ marginTop: 18, paddingTop: 18, borderTop: '1px solid var(--ink-100)', display: 'flex', gap: 24, flexWrap: 'wrap', fontSize: 13, color: 'var(--ink-600)' }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Icon.Check width={14} height={14} style={{ color: 'var(--success)' }}/> Vistoria gratuita</div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Icon.Check width={14} height={14} style={{ color: 'var(--success)' }}/> Sem compromisso</div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Icon.Check width={14} height={14} style={{ color: 'var(--success)' }}/> Burocracia por nossa conta</div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { OfferReveal });
