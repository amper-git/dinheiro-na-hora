/* global React, useTweaks, TweaksPanel, TweakSection, TweakSlider, TweakToggle, TweakRadio, TweakColor, TweakText */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "primaryColor": "#FFD60A",
  "inkColor": "#0A0A0A",
  "surfaceColor": "#F7F6F3",
  "radius": 12,
  "heroHeadline": "Venda seu carro em 24 horas.",
  "heroSubhead": "Oferta firme online. Vistoria em casa. Pagamento no mesmo dia.",
  "ctaLabel": "Ver quanto vale",
  "marketDiscount": 10,
  "concessionariaDiscount": 22,
  "showWarranty": true,
  "showRange": true,
  "showBonusBadge": true,
  "apiMode": "mock",
  "apiBase": "http://localhost:3001"
}/*EDITMODE-END*/;

function AmperTweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply tweaks to CSS variables + globals
  React.useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty('--amper-yellow', t.primaryColor);
    r.style.setProperty('--ink-900', t.inkColor);
    r.style.setProperty('--surface', t.surfaceColor);
    r.style.setProperty('--radius-md', `${t.radius}px`);

    // Pricing tunables — read by fipe.jsx
    window.__AMPER_MARKET_DISCOUNT = t.marketDiscount / 100;
    window.__AMPER_CONCESSIONARIA_DISCOUNT = t.concessionariaDiscount / 100;

    // Feature flags — read by offer-reveal.jsx
    window.__AMPER_SHOW_WARRANTY = t.showWarranty;
    window.__AMPER_SHOW_RANGE = t.showRange;
    window.__AMPER_SHOW_BONUS = t.showBonusBadge;

    // Copy overrides — read by landing-top.jsx (Hero)
    window.__AMPER_COPY = {
      heroHeadline: t.heroHeadline,
      heroSubhead: t.heroSubhead,
      ctaLabel: t.ctaLabel,
    };

    // API mode — read by api-client.js
    window.__AMPER_API_MODE = t.apiMode;
    window.__AMPER_API_BASE = t.apiBase;

    // Nudge React to re-render subscribers
    window.dispatchEvent(new CustomEvent('amper-tweaks-changed', { detail: t }));
  }, [t]);

  return (
    <TweaksPanel title="Tweaks — Amper">
      <TweakSection label="Identidade visual"/>
      <TweakColor label="Cor primária" value={t.primaryColor}
        onChange={(v) => setTweak('primaryColor', v)}/>
      <TweakColor label="Tinta (ink)" value={t.inkColor}
        onChange={(v) => setTweak('inkColor', v)}/>
      <TweakColor label="Fundo (surface)" value={t.surfaceColor}
        onChange={(v) => setTweak('surfaceColor', v)}/>
      <TweakSlider label="Raio dos cards" value={t.radius} min={0} max={24} unit="px"
        onChange={(v) => setTweak('radius', v)}/>

      <TweakSection label="Copy do Hero"/>
      <TweakText label="Headline" value={t.heroHeadline}
        onChange={(v) => setTweak('heroHeadline', v)}/>
      <TweakText label="Subhead" value={t.heroSubhead}
        onChange={(v) => setTweak('heroSubhead', v)}/>
      <TweakText label="CTA" value={t.ctaLabel}
        onChange={(v) => setTweak('ctaLabel', v)}/>

      <TweakSection label="Precificação"/>
      <TweakSlider label="Desconto Amper vs mercado" value={t.marketDiscount}
        min={5} max={20} step={1} unit="%"
        onChange={(v) => setTweak('marketDiscount', v)}/>
      <TweakSlider label="Desconto concessionária (ref.)" value={t.concessionariaDiscount}
        min={15} max={35} step={1} unit="%"
        onChange={(v) => setTweak('concessionariaDiscount', v)}/>

      <TweakSection label="Página de oferta"/>
      <TweakToggle label="Mostrar garantia 1 ano" value={t.showWarranty}
        onChange={(v) => setTweak('showWarranty', v)}/>
      <TweakToggle label="Mostrar range min–max" value={t.showRange}
        onChange={(v) => setTweak('showRange', v)}/>
      <TweakToggle label="Badge +R$ vs concessionária" value={t.showBonusBadge}
        onChange={(v) => setTweak('showBonusBadge', v)}/>

      <TweakSection label="Integração PlacaFipe"/>
      <TweakRadio label="Modo API" value={t.apiMode}
        options={['mock', 'real']}
        onChange={(v) => setTweak('apiMode', v)}/>
      <TweakText label="URL do backend" value={t.apiBase}
        onChange={(v) => setTweak('apiBase', v)}/>
    </TweaksPanel>
  );
}

window.AmperTweaks = AmperTweaks;
