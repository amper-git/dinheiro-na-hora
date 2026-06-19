/* global window */
// API client for the Amper backend proxy.
// Toggle between mock (in-memory from data/fipe.jsx) and real (backend proxy) via window.__AMPER_API_MODE.
// Default: 'mock'. Set to 'real' to hit the proxy at window.__AMPER_API_BASE (default http://localhost:3001).

const MODE = () => window.__AMPER_API_MODE || 'mock';
const BASE = () => window.__AMPER_API_BASE || 'http://localhost:3001';

async function req(path, { method = 'GET', body } = {}) {
  const res = await fetch(`${BASE()}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  return data;
}

// ============================================================
// Unified API — the simulator calls these; mode decides backend.
// ============================================================

window.AmperAPI = {
  mode: () => MODE(),

  /** Get list of brands. Returns [{ nome, codigo }]. */
  async getMarcas(tipo = 1) {
    if (MODE() === 'mock') {
      // Adapt the mock FIPE.brands to {nome, codigo} shape
      return Object.keys(window.FIPE.brands).map((slug, i) => ({
        nome: slug.charAt(0).toUpperCase() + slug.slice(1),
        codigo: String(i + 1),
        slug,
      }));
    }
    const data = await req(`/api/fipe/marcas?tipo=${tipo}`);
    return data.marcas || data; // PlacaFipe returns { marcas: [...] } — adjust if needed
  },

  async getModelos(tipo, codigoMarca) {
    if (MODE() === 'mock') {
      // Find the brand slug from codigoMarca (which is our index+1)
      const slugs = Object.keys(window.FIPE.brands);
      const slug = slugs[Number(codigoMarca) - 1];
      return (window.FIPE.brands[slug] || []).map((nome, i) => ({
        nome, codigo: String(i + 1),
      }));
    }
    const data = await req(`/api/fipe/modelos?tipo=${tipo}&marca=${codigoMarca}`);
    return data.modelos || data;
  },

  async getVersao(codigoFipe, ano) {
    if (MODE() === 'mock') {
      // Mock: no real FIPE versions, return a stub
      return { valor: 0, mes_referencia: 'mock' };
    }
    return req(`/api/fipe/versao?codigoFipe=${codigoFipe}&ano=${ano}`);
  },

  /** Plate → vehicle + FIPE matches. */
  async consultarPlaca(placa) {
    if (MODE() === 'mock') {
      await new Promise((r) => setTimeout(r, 1200));
      return { codigo: 1, msg: 'mock', informacoes_veiculo: null, fipe: [] };
    }
    return req('/api/placa', { method: 'POST', body: { placa } });
  },

  /**
   * Fluxo principal: placa → veículo → FIPE → OLX → oferta.
   * O cliente entra só com a placa, km e condição. O backend resolve o resto.
   */
  async avaliarPlaca({ placa, km, condicao, uf }) {
    if (MODE() === 'mock') {
      await new Promise((r) => setTimeout(r, 2000));
      const market = window.estimatePrice({ km, condition: condicao, year: 2021 });
      const offer  = window.amperOffer(market);
      const range  = window.amperOfferRange(market);
      const conc   = window.concessionariaOffer ? window.concessionariaOffer(market) : Math.round(market * 0.78);
      return {
        precoMercado:          market,
        ofertaAmper:           offer,
        ofertaRange:           range,
        concessionaria:        conc,
        bonusVsConcessionaria: offer - conc,
        elegivel_garantia:     true,
        veiculo: { marca: 'FORD', modelo: 'ECOSPORT FSL 1.6', ano: 2021, modeloFipe: 'ECOSPORT FSL 1.6 Flex' },
        _debug: { fonte: 'mock' },
      };
    }
    return req('/api/avaliar-placa', { method: 'POST', body: { placa, km, condicao, uf } });
  },

  /** Fluxo manual: usuário escolheu a versão FIPE manualmente. */
  async precoMercado({ codigoFipe, ano, km, condicao, uf, combustivelId, brand, model, version }) {
    if (MODE() === 'mock') {
      // Fall back to the in-memory estimator
      const market = window.estimatePrice({ brand, model, year: ano, version, condition: condicao, km });
      const offer = window.amperOffer(market);
      const range = window.amperOfferRange(market);
      const conc = window.concessionariaOffer(market);
      return {
        precoMercado: market,
        ofertaAmper: offer,
        ofertaRange: range,
        concessionaria: conc,
        bonusVsConcessionaria: offer - conc,
        elegivel_garantia: true,
        _debug: { fonte: 'mock' },
      };
    }
    return req('/api/preco-mercado', {
      method: 'POST',
      body: { codigoFipe, ano, km, condicao, uf, combustivelId },
    });
  },

  async health() {
    if (MODE() === 'mock') return { ok: true, mode: 'mock' };
    return req('/api/health');
  },
};
