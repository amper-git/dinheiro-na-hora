/* global React */
// FIPE-style data store for the simulator.
// Structure mirrors real FIPE: brand -> models -> years -> versions -> base price
// Prices are realistic BRL ranges for Brazilian market (early 2026).

const FIPE = {
  brands: [
    { id: 'volkswagen', name: 'Volkswagen', logo: 'VW' },
    { id: 'chevrolet', name: 'Chevrolet', logo: 'CH' },
    { id: 'fiat', name: 'Fiat', logo: 'FI' },
    { id: 'toyota', name: 'Toyota', logo: 'TO' },
    { id: 'honda', name: 'Honda', logo: 'HO' },
    { id: 'hyundai', name: 'Hyundai', logo: 'HY' },
    { id: 'ford', name: 'Ford', logo: 'FO' },
    { id: 'renault', name: 'Renault', logo: 'RE' },
    { id: 'nissan', name: 'Nissan', logo: 'NI' },
    { id: 'jeep', name: 'Jeep', logo: 'JE' },
    { id: 'bmw', name: 'BMW', logo: 'BM' },
    { id: 'mercedes', name: 'Mercedes-Benz', logo: 'MB' },
    { id: 'audi', name: 'Audi', logo: 'AU' },
    { id: 'porsche', name: 'Porsche', logo: 'PO' },
    { id: 'volvo', name: 'Volvo', logo: 'VO' },
    { id: 'peugeot', name: 'Peugeot', logo: 'PE' },
    { id: 'citroen', name: 'Citroën', logo: 'CI' },
    { id: 'mitsubishi', name: 'Mitsubishi', logo: 'MI' },
    { id: 'kia', name: 'Kia', logo: 'KI' },
    { id: 'byd', name: 'BYD', logo: 'BY' },
  ],
  models: {
    volkswagen: ['Gol', 'Polo', 'Virtus', 'T-Cross', 'Nivus', 'Taos', 'Jetta', 'Amarok', 'Saveiro'],
    chevrolet: ['Onix', 'Onix Plus', 'Tracker', 'Spin', 'S10', 'Cruze', 'Equinox'],
    fiat: ['Mobi', 'Argo', 'Cronos', 'Pulse', 'Fastback', 'Toro', 'Strada'],
    toyota: ['Corolla', 'Corolla Cross', 'Yaris', 'Hilux', 'SW4', 'RAV4'],
    honda: ['Civic', 'City', 'HR-V', 'WR-V', 'Fit'],
    hyundai: ['HB20', 'HB20S', 'Creta', 'Tucson', 'Santa Fe'],
    ford: ['Ranger', 'Maverick', 'Territory', 'Bronco Sport'],
    renault: ['Kwid', 'Sandero', 'Logan', 'Duster', 'Oroch', 'Kardian'],
    nissan: ['Kicks', 'Versa', 'Sentra', 'Frontier'],
    jeep: ['Renegade', 'Compass', 'Commander', 'Wrangler'],
    bmw: ['320i', '330i', 'X1', 'X3', 'X5', 'M3', 'M4'],
    mercedes: ['A 200', 'C 200', 'C 300', 'GLA', 'GLB', 'GLC'],
    audi: ['A3', 'A4', 'Q3', 'Q5', 'RS3'],
    porsche: ['911', 'Cayenne', 'Macan', 'Taycan', 'Panamera'],
    volvo: ['XC40', 'XC60', 'XC90', 'S60'],
    peugeot: ['208', '2008', '3008', '5008'],
    citroen: ['C3', 'C3 Aircross', 'Basalt'],
    mitsubishi: ['L200 Triton', 'Eclipse Cross', 'Outlander'],
    kia: ['Stonic', 'Sportage', 'Sorento', 'EV6'],
    byd: ['Dolphin', 'Yuan Plus', 'Seal', 'Song Plus', 'King'],
  },
  // price anchors ≈ current MARKET PRICE for a "new-year" version (2024/2025 year model, bom condition, 15k km).
  // Calibrated to approximate Brazilian used-car market averages as of 2025.
  // For cars no longer produced (Gol, Fit, etc.) the anchor represents the LATEST model-year price in the market.
  basePrice: {
    'volkswagen-Gol': 68000, 'volkswagen-Polo': 95000, 'volkswagen-Virtus': 115000,
    'volkswagen-T-Cross': 145000, 'volkswagen-Nivus': 135000, 'volkswagen-Taos': 195000,
    'volkswagen-Jetta': 225000, 'volkswagen-Amarok': 295000, 'volkswagen-Saveiro': 108000,
    'chevrolet-Onix': 92000, 'chevrolet-Onix Plus': 105000, 'chevrolet-Tracker': 145000,
    'chevrolet-Spin': 125000, 'chevrolet-S10': 265000, 'chevrolet-Cruze': 145000,
    'chevrolet-Equinox': 265000,
    'fiat-Mobi': 72000, 'fiat-Argo': 88000, 'fiat-Cronos': 98000,
    'fiat-Pulse': 115000, 'fiat-Fastback': 145000, 'fiat-Toro': 185000,
    'fiat-Strada': 118000,
    'toyota-Corolla': 185000, 'toyota-Corolla Cross': 205000, 'toyota-Yaris': 115000,
    'toyota-Hilux': 325000, 'toyota-SW4': 425000, 'toyota-RAV4': 295000,
    'honda-Civic': 205000, 'honda-City': 135000, 'honda-HR-V': 175000,
    'honda-WR-V': 125000, 'honda-Fit': 85000,
    'hyundai-HB20': 92000, 'hyundai-HB20S': 105000, 'hyundai-Creta': 145000,
    'hyundai-Tucson': 265000, 'hyundai-Santa Fe': 425000,
    'ford-Ranger': 325000, 'ford-Maverick': 295000, 'ford-Territory': 215000,
    'ford-Bronco Sport': 265000,
    'renault-Kwid': 75000, 'renault-Sandero': 88000, 'renault-Logan': 82000,
    'renault-Duster': 135000, 'renault-Oroch': 148000, 'renault-Kardian': 125000,
    'nissan-Kicks': 135000, 'nissan-Versa': 115000, 'nissan-Sentra': 165000,
    'nissan-Frontier': 305000,
    'jeep-Renegade': 135000, 'jeep-Compass': 185000, 'jeep-Commander': 295000,
    'jeep-Wrangler': 395000,
    'bmw-320i': 295000, 'bmw-330i': 345000, 'bmw-X1': 335000, 'bmw-X3': 425000,
    'bmw-X5': 595000, 'bmw-M3': 695000, 'bmw-M4': 735000,
    'mercedes-A 200': 265000, 'mercedes-C 200': 355000, 'mercedes-C 300': 405000,
    'mercedes-GLA': 325000, 'mercedes-GLB': 385000, 'mercedes-GLC': 475000,
    'audi-A3': 225000, 'audi-A4': 345000, 'audi-Q3': 285000, 'audi-Q5': 415000,
    'audi-RS3': 525000,
    'porsche-911': 865000, 'porsche-Cayenne': 695000, 'porsche-Macan': 495000,
    'porsche-Taycan': 795000, 'porsche-Panamera': 895000,
    'volvo-XC40': 275000, 'volvo-XC60': 395000, 'volvo-XC90': 595000, 'volvo-S60': 325000,
    'peugeot-208': 85000, 'peugeot-2008': 125000, 'peugeot-3008': 185000, 'peugeot-5008': 235000,
    'citroen-C3': 78000, 'citroen-C3 Aircross': 115000, 'citroen-Basalt': 105000,
    'mitsubishi-L200 Triton': 285000, 'mitsubishi-Eclipse Cross': 175000, 'mitsubishi-Outlander': 225000,
    'kia-Stonic': 105000, 'kia-Sportage': 195000, 'kia-Sorento': 345000, 'kia-EV6': 485000,
    'byd-Dolphin': 145000, 'byd-Yuan Plus': 195000, 'byd-Seal': 285000,
    'byd-Song Plus': 245000, 'byd-King': 165000,
  },
  // Versions (trim levels)
  versions: (brand, model) => {
    const common = ['Entrada', 'Comfortline', 'Highline', 'GT'];
    if (['bmw', 'mercedes', 'audi', 'porsche', 'volvo'].includes(brand)) {
      return ['Standard', 'Sport', 'M Sport', 'Exclusive'];
    }
    if (model.includes('Hilux') || model.includes('Ranger') || model.includes('S10') || model.includes('Amarok') || model.includes('Frontier') || model.includes('L200') || model.includes('Toro')) {
      return ['XLS 4x2', 'SRX 4x4', 'SRV 4x4', 'Limited 4x4'];
    }
    return common;
  },
};

// Available years (dynamic)
const YEARS = Array.from({ length: 15 }, (_, i) => 2026 - i);

// Condition options
const CONDITIONS = [
  { id: 'excelente', label: 'Excelente', desc: 'Sem marcas, revisões em dia', factor: 1.05 },
  { id: 'bom', label: 'Bom', desc: 'Pequenos desgastes normais de uso', factor: 1.00 },
  { id: 'regular', label: 'Regular', desc: 'Marcas visíveis, precisa de retoques', factor: 0.92 },
  { id: 'precisa', label: 'Precisa reparos', desc: 'Reparos mecânicos ou de funilaria', factor: 0.82 },
];

// Compute price based on year, condition, km, version
function estimatePrice({ brand, model, year, version, condition = 'bom', km = 60000 }) {
  const key = `${brand}-${model}`;
  let base = FIPE.basePrice[key] || 90000;
  // Apply version priceAdj if available
  if (version && window.getVersions) {
    const v = window.getVersions(brand, model).find(x => x.name === version);
    if (v && v.priceAdj) base = base * v.priceAdj;
  }
  const age = 2026 - year;
  // Depreciation curve calibrated to Brazilian used-car market:
  //   year 0 (new): 0%    year 1: 8%    year 2: 14%    year 3: 20%
  //   year 4: 26%         year 5: 31%   year 6: 36%    year 7: 40%   year 8+: +3%/yr capped at 55%
  const depTable = [0, 0.08, 0.14, 0.20, 0.26, 0.31, 0.36, 0.40];
  let depreciation;
  if (age <= 0) depreciation = 0;
  else if (age < depTable.length) depreciation = depTable[age];
  else depreciation = Math.min(0.55, 0.40 + (age - 7) * 0.03);
  let price = base * (1 - depreciation);
  // Condition adjust
  const c = CONDITIONS.find((x) => x.id === condition) || CONDITIONS[1];
  price *= c.factor;
  // KM penalty: baseline 15k/yr expected
  const expectedKm = Math.max(15000, age * 15000);
  const kmDiff = km - expectedKm;
  const kmPenalty = (kmDiff / 100000) * 0.04; // 4% per 100k over
  price *= Math.max(0.75, 1 - kmPenalty);
  return Math.round(price / 500) * 500;
}

// Amper offer = market estimate -10% (for operational margin). Concessionária paga ~-25%.
// We return a RANGE (min–max) so client sees a band, not a single number.
const AMPER_MARKET_DISCOUNT = 0.10;        // 10% below market
const CONCESSIONARIA_DISCOUNT = 0.22;      // dealer offers ~22-28% below market
function amperOffer(marketPrice) {
  // central offer: 10% below market, rounded to R$500
  return Math.round((marketPrice * (1 - AMPER_MARKET_DISCOUNT)) / 500) * 500;
}
function amperOfferRange(marketPrice) {
  const center = amperOffer(marketPrice);
  // ±2% range around center
  const min = Math.round((center * 0.98) / 500) * 500;
  const max = Math.round((center * 1.02) / 500) * 500;
  return { min, max, center };
}
function concessionariaOffer(marketPrice) {
  // dealer lowball
  return Math.round((marketPrice * (1 - CONCESSIONARIA_DISCOUNT - Math.random() * 0.06)) / 500) * 500;
}
function extraVsConcessionaria(marketPrice) {
  return amperOffer(marketPrice) - concessionariaOffer(marketPrice);
}

// Sample listings (for AI "real classifieds" reveal)
function sampleListings({ brand, model, year, marketPrice }) {
  const sites = ['OLX', 'Webmotors', 'Mercado Livre', 'iCarros', 'Mobiauto', 'Meu Carango'];
  const n = 6;
  return Array.from({ length: n }, (_, i) => {
    const variance = 0.86 + Math.random() * 0.22; // 0.86 – 1.08
    const price = Math.round((marketPrice * variance) / 500) * 500;
    const km = Math.round((40000 + Math.random() * 80000) / 1000) * 1000;
    const cities = ['São Paulo, SP', 'Rio de Janeiro, RJ', 'Belo Horizonte, MG', 'Curitiba, PR', 'Porto Alegre, RS', 'Brasília, DF', 'Campinas, SP', 'Salvador, BA'];
    return {
      site: sites[i % sites.length],
      price,
      km,
      city: cities[Math.floor(Math.random() * cities.length)],
      days: Math.floor(1 + Math.random() * 40),
    };
  }).sort((a, b) => a.price - b.price);
}

Object.assign(window, { FIPE, YEARS, CONDITIONS, estimatePrice, amperOffer, amperOfferRange, concessionariaOffer, extraVsConcessionaria, sampleListings });
