/* global React */
// Shared icons — hand-drawn, thin stroke, geometric feel matching Amper Velocity

const Icon = {
  Plate: (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="2"/>
      <path d="M6 9h2M10 9h2M14 9h2M18 9h.01"/>
      <path d="M6 13h12"/>
    </svg>
  ),
  Car: (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 13l2-5a3 3 0 0 1 2.8-2h8.4A3 3 0 0 1 19 8l2 5"/>
      <path d="M3 13h18v5a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-1H7v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-5z"/>
      <circle cx="7.5" cy="16" r="1"/>
      <circle cx="16.5" cy="16" r="1"/>
    </svg>
  ),
  Shield: (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 2.5l8 3.5v6c0 5-3.5 8.5-8 9.5-4.5-1-8-4.5-8-9.5V6l8-3.5z"/>
      <path d="M9 12l2 2 4-4"/>
    </svg>
  ),
  Bolt: (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/>
    </svg>
  ),
  Check: (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 12.5l4.5 4.5L19 7.5"/>
    </svg>
  ),
  CheckCircle: (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="9.5"/>
      <path d="M8 12l3 3 5-6"/>
    </svg>
  ),
  Arrow: (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 12h14M13 6l6 6-6 6"/>
    </svg>
  ),
  ArrowUp: (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 19V5M6 11l6-6 6 6"/>
    </svg>
  ),
  ArrowDown: (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 5v14M6 13l6 6 6-6"/>
    </svg>
  ),
  Sparkle: (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z"/>
      <path d="M19 16l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2z"/>
    </svg>
  ),
  Clock: (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="9"/>
      <path d="M12 7v5l3 2"/>
    </svg>
  ),
  Money: (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="2.5" y="6" width="19" height="12" rx="2"/>
      <circle cx="12" cy="12" r="2.5"/>
      <path d="M6 10v4M18 10v4"/>
    </svg>
  ),
  Doc: (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5z"/>
      <path d="M14 3v5h5M9 13h6M9 17h4"/>
    </svg>
  ),
  Home: (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9z"/>
    </svg>
  ),
  Menu: (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}>
      <path d="M4 7h16M4 12h16M4 17h16"/>
    </svg>
  ),
  Close: (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}>
      <path d="M6 6l12 12M18 6L6 18"/>
    </svg>
  ),
  Plus: (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}>
      <path d="M12 5v14M5 12h14"/>
    </svg>
  ),
  Minus: (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}>
      <path d="M5 12h14"/>
    </svg>
  ),
  Star: (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...p}>
      <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.9-6.3 3.9 1.7-7L2 9.2l7.1-.6L12 2z"/>
    </svg>
  ),
  Search: (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="11" cy="11" r="7"/>
      <path d="M20 20l-3.5-3.5"/>
    </svg>
  ),
  TrendUp: (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 17l6-6 4 4 8-8"/>
      <path d="M14 7h7v7"/>
    </svg>
  ),
  Phone: (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1A19.5 19.5 0 0 1 5.1 12.8 19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.8.6 2.7a2 2 0 0 1-.4 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2z"/>
    </svg>
  ),
  MapPin: (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M20 10c0 6-8 13-8 13S4 16 4 10a8 8 0 0 1 16 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  User: (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 21a8 8 0 0 1 16 0"/>
    </svg>
  ),
};

// Amper logotype (wordmark). Minimal, Space Grotesk style inline.
const AmperLogo = ({ size = 22, color = 'currentColor' }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color }}>
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect x="1" y="1" width="30" height="30" rx="9" fill="#FFD60A"/>
      <path d="M9 22L16 9l7 13h-3.2l-1.3-2.5h-5l-1.3 2.5H9zm5.2-4.8h3.6L16 13.6l-1.8 3.6z" fill="#0A0A0A"/>
    </svg>
    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: size * 0.82, letterSpacing: '-0.02em' }}>
      amper
    </span>
  </div>
);

// Currency formatter
const fmtBRL = (n) =>
  'R$ ' + Math.round(n).toLocaleString('pt-BR');

const fmtBRLShort = (n) => {
  if (n >= 1000) return 'R$ ' + (n / 1000).toFixed(1).replace('.', ',') + 'k';
  return fmtBRL(n);
};

// Responsive hook — mobile-first breakpoint helper.
// Devuelve true cuando el viewport está por debajo de `bp` (default 768px).
const useIsMobile = (bp = 768) => {
  const query = `(max-width: ${bp}px)`;
  const get = () => (typeof window !== 'undefined' && window.matchMedia(query).matches);
  const [isMobile, setIsMobile] = React.useState(get);
  React.useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    setIsMobile(mq.matches);
    return () => mq.removeEventListener('change', handler);
  }, [query]);
  return isMobile;
};

Object.assign(window, { Icon, AmperLogo, fmtBRL, fmtBRLShort, useIsMobile });
