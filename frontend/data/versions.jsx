/* global FIPE */
// Real FIPE-style versions per model. Each version has:
//   name: trim name (e.g. "2.0 350 TSI GLI DSG")
//   specs: { body, engine, turbo, cyl, hp, fuel, gearbox, drive, doors }
//   priceAdj: multiplier vs model base price

const VERSIONS_BY_MODEL = {
  'volkswagen-Gol': [
    { name: '1.0 MPI Trendline', specs: { body: 'Hatch', engine: '1.0L', cyl: 3, hp: 75, fuel: 'Flex', gearbox: 'Manual', drive: '4x2', doors: 4 }, priceAdj: 0.88 },
    { name: '1.6 MSI Comfortline', specs: { body: 'Hatch', engine: '1.6L', cyl: 4, hp: 110, fuel: 'Flex', gearbox: 'Manual', drive: '4x2', doors: 4 }, priceAdj: 1.00 },
    { name: '1.6 MSI Highline', specs: { body: 'Hatch', engine: '1.6L', cyl: 4, hp: 110, fuel: 'Flex', gearbox: 'Automatizada', drive: '4x2', doors: 4 }, priceAdj: 1.12 },
  ],
  'volkswagen-Polo': [
    { name: '1.0 MPI Track', specs: { body: 'Hatch', engine: '1.0L', cyl: 3, hp: 84, fuel: 'Flex', gearbox: 'Manual', drive: '4x2', doors: 4 }, priceAdj: 0.85 },
    { name: '1.0 200 TSI Comfortline', specs: { body: 'Hatch', engine: '1.0L', turbo: true, cyl: 3, hp: 128, fuel: 'Flex', gearbox: 'Automático', drive: '4x2', doors: 4 }, priceAdj: 1.00 },
    { name: '1.0 200 TSI Highline', specs: { body: 'Hatch', engine: '1.0L', turbo: true, cyl: 3, hp: 128, fuel: 'Flex', gearbox: 'Automático', drive: '4x2', doors: 4 }, priceAdj: 1.12 },
    { name: '1.4 250 TSI GTS', specs: { body: 'Hatch', engine: '1.4L', turbo: true, cyl: 4, hp: 150, fuel: 'Flex', gearbox: 'Automático DSG', drive: '4x2', doors: 4 }, priceAdj: 1.28 },
  ],
  'volkswagen-Virtus': [
    { name: '1.0 200 TSI Comfortline', specs: { body: 'Sedã', engine: '1.0L', turbo: true, cyl: 3, hp: 128, fuel: 'Flex', gearbox: 'Automático', drive: '4x2', doors: 4 }, priceAdj: 0.92 },
    { name: '1.0 200 TSI Highline', specs: { body: 'Sedã', engine: '1.0L', turbo: true, cyl: 3, hp: 128, fuel: 'Flex', gearbox: 'Automático', drive: '4x2', doors: 4 }, priceAdj: 1.05 },
    { name: '1.4 250 TSI GTS', specs: { body: 'Sedã', engine: '1.4L', turbo: true, cyl: 4, hp: 150, fuel: 'Flex', gearbox: 'Automático DSG', drive: '4x2', doors: 4 }, priceAdj: 1.22 },
  ],
  'volkswagen-T-Cross': [
    { name: '1.0 200 TSI Comfortline', specs: { body: 'SUV', engine: '1.0L', turbo: true, cyl: 3, hp: 128, fuel: 'Flex', gearbox: 'Automático', drive: '4x2', doors: 4 }, priceAdj: 0.92 },
    { name: '1.0 200 TSI Highline', specs: { body: 'SUV', engine: '1.0L', turbo: true, cyl: 3, hp: 128, fuel: 'Flex', gearbox: 'Automático', drive: '4x2', doors: 4 }, priceAdj: 1.05 },
    { name: '1.4 250 TSI Highline', specs: { body: 'SUV', engine: '1.4L', turbo: true, cyl: 4, hp: 150, fuel: 'Flex', gearbox: 'Automático DSG', drive: '4x2', doors: 4 }, priceAdj: 1.18 },
  ],
  'volkswagen-Nivus': [
    { name: '1.0 200 TSI Comfortline', specs: { body: 'SUV Coupé', engine: '1.0L', turbo: true, cyl: 3, hp: 128, fuel: 'Flex', gearbox: 'Automático', drive: '4x2', doors: 4 }, priceAdj: 0.95 },
    { name: '1.0 200 TSI Highline', specs: { body: 'SUV Coupé', engine: '1.0L', turbo: true, cyl: 3, hp: 128, fuel: 'Flex', gearbox: 'Automático', drive: '4x2', doors: 4 }, priceAdj: 1.08 },
    { name: '1.4 250 TSI Highline', specs: { body: 'SUV Coupé', engine: '1.4L', turbo: true, cyl: 4, hp: 150, fuel: 'Flex', gearbox: 'Automático DSG', drive: '4x2', doors: 4 }, priceAdj: 1.20 },
  ],
  'volkswagen-Taos': [
    { name: '1.4 250 TSI Comfortline', specs: { body: 'SUV', engine: '1.4L', turbo: true, cyl: 4, hp: 150, fuel: 'Flex', gearbox: 'Automático', drive: '4x2', doors: 4 }, priceAdj: 0.92 },
    { name: '1.4 250 TSI Highline', specs: { body: 'SUV', engine: '1.4L', turbo: true, cyl: 4, hp: 150, fuel: 'Flex', gearbox: 'Automático', drive: '4x2', doors: 4 }, priceAdj: 1.05 },
    { name: '2.0 350 TSI Highline', specs: { body: 'SUV', engine: '2.0L', turbo: true, cyl: 4, hp: 220, fuel: 'Gasolina', gearbox: 'Automático DSG', drive: '4x4', doors: 4 }, priceAdj: 1.22 },
  ],
  'volkswagen-Jetta': [
    { name: '1.4 250 TSI Comfortline', specs: { body: 'Sedã', engine: '1.4L', turbo: true, cyl: 4, hp: 150, fuel: 'Flex', gearbox: 'Automático', drive: '4x2', doors: 4 }, priceAdj: 0.95 },
    { name: '1.4 250 TSI R-Line', specs: { body: 'Sedã', engine: '1.4L', turbo: true, cyl: 4, hp: 150, fuel: 'Flex', gearbox: 'Automático', drive: '4x2', doors: 4 }, priceAdj: 1.08 },
    { name: '2.0 350 TSI GLI DSG', specs: { body: 'Sedã', engine: '2.0L', turbo: true, cyl: 4, hp: 231, fuel: 'Gasolina', gearbox: 'Automático DSG', drive: '4x2', doors: 4 }, priceAdj: 1.28 },
  ],
  'volkswagen-Amarok': [
    { name: '2.0 TDI CD 4x2 Trendline', specs: { body: 'Picape', engine: '2.0L', turbo: true, cyl: 4, hp: 180, fuel: 'Diesel', gearbox: 'Automático', drive: '4x2', doors: 4 }, priceAdj: 0.90 },
    { name: '2.0 TDI CD 4x4 Comfortline', specs: { body: 'Picape', engine: '2.0L', turbo: true, cyl: 4, hp: 180, fuel: 'Diesel', gearbox: 'Automático', drive: '4x4', doors: 4 }, priceAdj: 1.05 },
    { name: '3.0 V6 CD 4x4 Highline', specs: { body: 'Picape', engine: '3.0L V6', turbo: true, cyl: 6, hp: 258, fuel: 'Diesel', gearbox: 'Automático', drive: '4x4', doors: 4 }, priceAdj: 1.25 },
  ],
  'volkswagen-Saveiro': [
    { name: '1.6 MSI Robust CS', specs: { body: 'Picape', engine: '1.6L', cyl: 4, hp: 110, fuel: 'Flex', gearbox: 'Manual', drive: '4x2', doors: 2 }, priceAdj: 0.92 },
    { name: '1.6 MSI Trendline CD', specs: { body: 'Picape', engine: '1.6L', cyl: 4, hp: 110, fuel: 'Flex', gearbox: 'Manual', drive: '4x2', doors: 4 }, priceAdj: 1.05 },
    { name: '1.6 MSI Cross CD', specs: { body: 'Picape', engine: '1.6L', cyl: 4, hp: 120, fuel: 'Flex', gearbox: 'Manual', drive: '4x2', doors: 4 }, priceAdj: 1.15 },
  ],

  'chevrolet-Onix': [
    { name: '1.0 LT', specs: { body: 'Hatch', engine: '1.0L', cyl: 3, hp: 82, fuel: 'Flex', gearbox: 'Manual', drive: '4x2', doors: 4 }, priceAdj: 0.90 },
    { name: '1.0 Turbo LTZ', specs: { body: 'Hatch', engine: '1.0L', turbo: true, cyl: 3, hp: 116, fuel: 'Flex', gearbox: 'Automático', drive: '4x2', doors: 4 }, priceAdj: 1.05 },
    { name: '1.0 Turbo Premier', specs: { body: 'Hatch', engine: '1.0L', turbo: true, cyl: 3, hp: 116, fuel: 'Flex', gearbox: 'Automático', drive: '4x2', doors: 4 }, priceAdj: 1.15 },
    { name: '1.2 Turbo RS', specs: { body: 'Hatch', engine: '1.2L', turbo: true, cyl: 3, hp: 133, fuel: 'Flex', gearbox: 'Automático', drive: '4x2', doors: 4 }, priceAdj: 1.20 },
  ],
  'chevrolet-Onix Plus': [
    { name: '1.0 LT', specs: { body: 'Sedã', engine: '1.0L', cyl: 3, hp: 82, fuel: 'Flex', gearbox: 'Manual', drive: '4x2', doors: 4 }, priceAdj: 0.92 },
    { name: '1.0 Turbo LTZ', specs: { body: 'Sedã', engine: '1.0L', turbo: true, cyl: 3, hp: 116, fuel: 'Flex', gearbox: 'Automático', drive: '4x2', doors: 4 }, priceAdj: 1.05 },
    { name: '1.0 Turbo Premier', specs: { body: 'Sedã', engine: '1.0L', turbo: true, cyl: 3, hp: 116, fuel: 'Flex', gearbox: 'Automático', drive: '4x2', doors: 4 }, priceAdj: 1.18 },
  ],
  'chevrolet-Tracker': [
    { name: '1.0 Turbo LT', specs: { body: 'SUV', engine: '1.0L', turbo: true, cyl: 3, hp: 116, fuel: 'Flex', gearbox: 'Automático', drive: '4x2', doors: 4 }, priceAdj: 0.92 },
    { name: '1.0 Turbo LTZ', specs: { body: 'SUV', engine: '1.0L', turbo: true, cyl: 3, hp: 116, fuel: 'Flex', gearbox: 'Automático', drive: '4x2', doors: 4 }, priceAdj: 1.05 },
    { name: '1.2 Turbo Premier', specs: { body: 'SUV', engine: '1.2L', turbo: true, cyl: 3, hp: 133, fuel: 'Flex', gearbox: 'Automático', drive: '4x2', doors: 4 }, priceAdj: 1.18 },
    { name: '1.2 Turbo RS', specs: { body: 'SUV', engine: '1.2L', turbo: true, cyl: 3, hp: 133, fuel: 'Flex', gearbox: 'Automático', drive: '4x2', doors: 4 }, priceAdj: 1.25 },
  ],
  'chevrolet-S10': [
    { name: '2.8 CTDi CD 4x2 LS', specs: { body: 'Picape', engine: '2.8L', turbo: true, cyl: 4, hp: 200, fuel: 'Diesel', gearbox: 'Manual', drive: '4x2', doors: 4 }, priceAdj: 0.92 },
    { name: '2.8 CTDi CD 4x4 LTZ', specs: { body: 'Picape', engine: '2.8L', turbo: true, cyl: 4, hp: 200, fuel: 'Diesel', gearbox: 'Automático', drive: '4x4', doors: 4 }, priceAdj: 1.08 },
    { name: '2.8 CTDi CD 4x4 High Country', specs: { body: 'Picape', engine: '2.8L', turbo: true, cyl: 4, hp: 200, fuel: 'Diesel', gearbox: 'Automático', drive: '4x4', doors: 4 }, priceAdj: 1.20 },
  ],

  'fiat-Mobi': [
    { name: '1.0 Like', specs: { body: 'Hatch', engine: '1.0L', cyl: 4, hp: 75, fuel: 'Flex', gearbox: 'Manual', drive: '4x2', doors: 4 }, priceAdj: 0.95 },
    { name: '1.0 Trekking', specs: { body: 'Hatch', engine: '1.0L', cyl: 4, hp: 75, fuel: 'Flex', gearbox: 'Manual', drive: '4x2', doors: 4 }, priceAdj: 1.05 },
  ],
  'fiat-Pulse': [
    { name: '1.3 Drive AT', specs: { body: 'SUV', engine: '1.3L', cyl: 4, hp: 107, fuel: 'Flex', gearbox: 'Automático CVT', drive: '4x2', doors: 4 }, priceAdj: 0.92 },
    { name: '1.0 Turbo Audace', specs: { body: 'SUV', engine: '1.0L', turbo: true, cyl: 3, hp: 130, fuel: 'Flex', gearbox: 'Automático CVT', drive: '4x2', doors: 4 }, priceAdj: 1.05 },
    { name: '1.0 Turbo Impetus', specs: { body: 'SUV', engine: '1.0L', turbo: true, cyl: 3, hp: 130, fuel: 'Flex', gearbox: 'Automático CVT', drive: '4x2', doors: 4 }, priceAdj: 1.12 },
    { name: '1.3 Turbo 270 Abarth', specs: { body: 'SUV', engine: '1.3L', turbo: true, cyl: 4, hp: 185, fuel: 'Gasolina', gearbox: 'Automático', drive: '4x2', doors: 4 }, priceAdj: 1.28 },
  ],
  'fiat-Toro': [
    { name: '1.3 Turbo 270 Freedom', specs: { body: 'Picape', engine: '1.3L', turbo: true, cyl: 4, hp: 180, fuel: 'Flex', gearbox: 'Automático', drive: '4x2', doors: 4 }, priceAdj: 0.92 },
    { name: '2.0 TDI Volcano 4x4', specs: { body: 'Picape', engine: '2.0L', turbo: true, cyl: 4, hp: 170, fuel: 'Diesel', gearbox: 'Automático', drive: '4x4', doors: 4 }, priceAdj: 1.15 },
    { name: '2.0 TDI Ranch 4x4', specs: { body: 'Picape', engine: '2.0L', turbo: true, cyl: 4, hp: 170, fuel: 'Diesel', gearbox: 'Automático', drive: '4x4', doors: 4 }, priceAdj: 1.25 },
  ],
  'fiat-Strada': [
    { name: '1.3 Endurance CS', specs: { body: 'Picape', engine: '1.3L', cyl: 4, hp: 107, fuel: 'Flex', gearbox: 'Manual', drive: '4x2', doors: 2 }, priceAdj: 0.90 },
    { name: '1.3 Freedom CD', specs: { body: 'Picape', engine: '1.3L', cyl: 4, hp: 107, fuel: 'Flex', gearbox: 'Manual', drive: '4x2', doors: 4 }, priceAdj: 1.05 },
    { name: '1.3 Volcano CD AT', specs: { body: 'Picape', engine: '1.3L', cyl: 4, hp: 107, fuel: 'Flex', gearbox: 'Automático CVT', drive: '4x2', doors: 4 }, priceAdj: 1.15 },
    { name: '1.0 Turbo Ranch CD AT', specs: { body: 'Picape', engine: '1.0L', turbo: true, cyl: 3, hp: 130, fuel: 'Flex', gearbox: 'Automático CVT', drive: '4x2', doors: 4 }, priceAdj: 1.25 },
  ],

  'toyota-Corolla': [
    { name: '2.0 XEi Direct Shift CVT', specs: { body: 'Sedã', engine: '2.0L', cyl: 4, hp: 177, fuel: 'Flex', gearbox: 'Automático CVT', drive: '4x2', doors: 4 }, priceAdj: 0.92 },
    { name: '1.8 Altis Premium Hybrid', specs: { body: 'Sedã', engine: '1.8L Híbrido', cyl: 4, hp: 122, fuel: 'Flex + Elétrico', gearbox: 'Automático CVT', drive: '4x2', doors: 4 }, priceAdj: 1.15 },
    { name: '2.0 XEi GR-Sport', specs: { body: 'Sedã', engine: '2.0L', cyl: 4, hp: 177, fuel: 'Flex', gearbox: 'Automático CVT', drive: '4x2', doors: 4 }, priceAdj: 1.20 },
  ],
  'toyota-Corolla Cross': [
    { name: '2.0 XR Direct Shift CVT', specs: { body: 'SUV', engine: '2.0L', cyl: 4, hp: 177, fuel: 'Flex', gearbox: 'Automático CVT', drive: '4x2', doors: 4 }, priceAdj: 0.92 },
    { name: '1.8 XRX Hybrid', specs: { body: 'SUV', engine: '1.8L Híbrido', cyl: 4, hp: 122, fuel: 'Flex + Elétrico', gearbox: 'Automático CVT', drive: '4x2', doors: 4 }, priceAdj: 1.12 },
    { name: '2.0 XRE GR-Sport', specs: { body: 'SUV', engine: '2.0L', cyl: 4, hp: 177, fuel: 'Flex', gearbox: 'Automático CVT', drive: '4x2', doors: 4 }, priceAdj: 1.18 },
  ],
  'toyota-Hilux': [
    { name: '2.8 TDI CD 4x2 SR', specs: { body: 'Picape', engine: '2.8L', turbo: true, cyl: 4, hp: 204, fuel: 'Diesel', gearbox: 'Automático', drive: '4x2', doors: 4 }, priceAdj: 0.90 },
    { name: '2.8 TDI CD 4x4 SRV', specs: { body: 'Picape', engine: '2.8L', turbo: true, cyl: 4, hp: 204, fuel: 'Diesel', gearbox: 'Automático', drive: '4x4', doors: 4 }, priceAdj: 1.05 },
    { name: '2.8 TDI CD 4x4 SRX', specs: { body: 'Picape', engine: '2.8L', turbo: true, cyl: 4, hp: 204, fuel: 'Diesel', gearbox: 'Automático', drive: '4x4', doors: 4 }, priceAdj: 1.18 },
    { name: '2.8 TDI CD 4x4 GR-Sport', specs: { body: 'Picape', engine: '2.8L', turbo: true, cyl: 4, hp: 224, fuel: 'Diesel', gearbox: 'Automático', drive: '4x4', doors: 4 }, priceAdj: 1.30 },
  ],

  'honda-Civic': [
    { name: '2.0 EX CVT', specs: { body: 'Sedã', engine: '2.0L', cyl: 4, hp: 155, fuel: 'Gasolina', gearbox: 'Automático CVT', drive: '4x2', doors: 4 }, priceAdj: 0.90 },
    { name: '1.5 Turbo Touring', specs: { body: 'Sedã', engine: '1.5L', turbo: true, cyl: 4, hp: 173, fuel: 'Gasolina', gearbox: 'Automático CVT', drive: '4x2', doors: 4 }, priceAdj: 1.12 },
    { name: '2.0 e:HEV Sport Hybrid', specs: { body: 'Sedã', engine: '2.0L Híbrido', cyl: 4, hp: 204, fuel: 'Gasolina + Elétrico', gearbox: 'e-CVT', drive: '4x2', doors: 4 }, priceAdj: 1.28 },
  ],
  'honda-HR-V': [
    { name: '1.5 EX CVT', specs: { body: 'SUV', engine: '1.5L', cyl: 4, hp: 126, fuel: 'Flex', gearbox: 'Automático CVT', drive: '4x2', doors: 4 }, priceAdj: 0.92 },
    { name: '1.5 EXL CVT', specs: { body: 'SUV', engine: '1.5L', cyl: 4, hp: 126, fuel: 'Flex', gearbox: 'Automático CVT', drive: '4x2', doors: 4 }, priceAdj: 1.05 },
    { name: '1.5 Turbo Advance', specs: { body: 'SUV', engine: '1.5L', turbo: true, cyl: 4, hp: 177, fuel: 'Gasolina', gearbox: 'Automático CVT', drive: '4x2', doors: 4 }, priceAdj: 1.22 },
  ],

  'hyundai-HB20': [
    { name: '1.0 Sense', specs: { body: 'Hatch', engine: '1.0L', cyl: 3, hp: 80, fuel: 'Flex', gearbox: 'Manual', drive: '4x2', doors: 4 }, priceAdj: 0.92 },
    { name: '1.0 Comfort Plus', specs: { body: 'Hatch', engine: '1.0L', cyl: 3, hp: 80, fuel: 'Flex', gearbox: 'Manual', drive: '4x2', doors: 4 }, priceAdj: 1.00 },
    { name: '1.0 Turbo Platinum Plus', specs: { body: 'Hatch', engine: '1.0L', turbo: true, cyl: 3, hp: 120, fuel: 'Flex', gearbox: 'Automático', drive: '4x2', doors: 4 }, priceAdj: 1.15 },
  ],
  'hyundai-Creta': [
    { name: '1.0 Turbo Comfort', specs: { body: 'SUV', engine: '1.0L', turbo: true, cyl: 3, hp: 120, fuel: 'Flex', gearbox: 'Automático', drive: '4x2', doors: 4 }, priceAdj: 0.92 },
    { name: '1.0 Turbo Limited', specs: { body: 'SUV', engine: '1.0L', turbo: true, cyl: 3, hp: 120, fuel: 'Flex', gearbox: 'Automático', drive: '4x2', doors: 4 }, priceAdj: 1.05 },
    { name: '2.0 Ultimate', specs: { body: 'SUV', engine: '2.0L', cyl: 4, hp: 167, fuel: 'Flex', gearbox: 'Automático', drive: '4x2', doors: 4 }, priceAdj: 1.18 },
    { name: '1.0 Turbo N Line', specs: { body: 'SUV', engine: '1.0L', turbo: true, cyl: 3, hp: 120, fuel: 'Flex', gearbox: 'Automático', drive: '4x2', doors: 4 }, priceAdj: 1.15 },
  ],

  'jeep-Renegade': [
    { name: '1.3 Turbo 270 Longitude', specs: { body: 'SUV', engine: '1.3L', turbo: true, cyl: 4, hp: 185, fuel: 'Flex', gearbox: 'Automático', drive: '4x2', doors: 4 }, priceAdj: 0.95 },
    { name: '1.3 Turbo 270 Sport', specs: { body: 'SUV', engine: '1.3L', turbo: true, cyl: 4, hp: 185, fuel: 'Flex', gearbox: 'Automático', drive: '4x2', doors: 4 }, priceAdj: 1.05 },
    { name: '2.0 TDI Trailhawk 4x4', specs: { body: 'SUV', engine: '2.0L', turbo: true, cyl: 4, hp: 170, fuel: 'Diesel', gearbox: 'Automático', drive: '4x4', doors: 4 }, priceAdj: 1.20 },
  ],
  'jeep-Compass': [
    { name: '1.3 Turbo 270 Sport', specs: { body: 'SUV', engine: '1.3L', turbo: true, cyl: 4, hp: 185, fuel: 'Flex', gearbox: 'Automático', drive: '4x2', doors: 4 }, priceAdj: 0.92 },
    { name: '1.3 Turbo 270 Longitude', specs: { body: 'SUV', engine: '1.3L', turbo: true, cyl: 4, hp: 185, fuel: 'Flex', gearbox: 'Automático', drive: '4x2', doors: 4 }, priceAdj: 1.02 },
    { name: '1.3 Turbo 270 Limited', specs: { body: 'SUV', engine: '1.3L', turbo: true, cyl: 4, hp: 185, fuel: 'Flex', gearbox: 'Automático', drive: '4x2', doors: 4 }, priceAdj: 1.12 },
    { name: '2.0 TDI Trailhawk 4x4', specs: { body: 'SUV', engine: '2.0L', turbo: true, cyl: 4, hp: 170, fuel: 'Diesel', gearbox: 'Automático', drive: '4x4', doors: 4 }, priceAdj: 1.25 },
  ],

  // Premium brands — shorter list, representative trims
  'bmw-320i': [
    { name: '2.0 Turbo Active Flex', specs: { body: 'Sedã', engine: '2.0L', turbo: true, cyl: 4, hp: 184, fuel: 'Flex', gearbox: 'Automático', drive: '4x2', doors: 4 }, priceAdj: 0.95 },
    { name: '2.0 Turbo M Sport', specs: { body: 'Sedã', engine: '2.0L', turbo: true, cyl: 4, hp: 184, fuel: 'Flex', gearbox: 'Automático', drive: '4x2', doors: 4 }, priceAdj: 1.12 },
  ],
  'porsche-911': [
    { name: '3.0 Carrera S Coupé PDK', specs: { body: 'Coupé', engine: '3.0L', turbo: true, cyl: 6, hp: 450, fuel: 'Gasolina', gearbox: 'Automático PDK', drive: '4x2', doors: 2 }, priceAdj: 0.95 },
    { name: '3.8 Turbo S Coupé', specs: { body: 'Coupé', engine: '3.8L', turbo: true, cyl: 6, hp: 650, fuel: 'Gasolina', gearbox: 'Automático PDK', drive: '4x4', doors: 2 }, priceAdj: 1.40 },
  ],
  'porsche-Cayenne': [
    { name: '3.0 V6 Coupé', specs: { body: 'SUV', engine: '3.0L V6', turbo: true, cyl: 6, hp: 340, fuel: 'Gasolina', gearbox: 'Automático', drive: '4x4', doors: 4 }, priceAdj: 0.95 },
    { name: '4.0 V8 Turbo GT', specs: { body: 'SUV', engine: '4.0L V8', turbo: true, cyl: 8, hp: 640, fuel: 'Gasolina', gearbox: 'Automático', drive: '4x4', doors: 4 }, priceAdj: 1.45 },
  ],
};

// Fallback generator for models without explicit versions
function defaultVersions(brand, model) {
  const isPickup = /Hilux|Ranger|S10|Amarok|Frontier|L200|Toro|Strada|Saveiro|Oroch|Maverick/.test(model);
  const isSUV = /T-Cross|Nivus|Taos|Tracker|Creta|Tucson|Compass|Renegade|HR-V|Kicks|Pulse|Fastback|Territory|Duster|Stonic|Sportage|2008|3008|C3 Aircross|Outlander|Eclipse|RAV4|Yuan|Song/.test(model);
  const body = isPickup ? 'Picape' : isSUV ? 'SUV' : /Corolla|Civic|City|Virtus|Jetta|HB20S|Onix Plus|Cronos|Logan|Sentra|Versa|A 200|C 200|A3|A4|S60/.test(model) ? 'Sedã' : 'Hatch';

  if (isPickup) {
    return [
      { name: '2.0 CD 4x2 Entrada', specs: { body, engine: '2.0L', turbo: true, cyl: 4, hp: 170, fuel: 'Diesel', gearbox: 'Manual', drive: '4x2', doors: 4 }, priceAdj: 0.90 },
      { name: '2.0 CD 4x4 Intermediária', specs: { body, engine: '2.0L', turbo: true, cyl: 4, hp: 170, fuel: 'Diesel', gearbox: 'Automático', drive: '4x4', doors: 4 }, priceAdj: 1.08 },
      { name: '2.0 CD 4x4 Top', specs: { body, engine: '2.0L', turbo: true, cyl: 4, hp: 190, fuel: 'Diesel', gearbox: 'Automático', drive: '4x4', doors: 4 }, priceAdj: 1.22 },
    ];
  }
  return [
    { name: '1.0 Entrada', specs: { body, engine: '1.0L', cyl: 3, hp: 82, fuel: 'Flex', gearbox: 'Manual', drive: '4x2', doors: 4 }, priceAdj: 0.90 },
    { name: '1.0 Turbo Intermediária', specs: { body, engine: '1.0L', turbo: true, cyl: 3, hp: 120, fuel: 'Flex', gearbox: 'Automático', drive: '4x2', doors: 4 }, priceAdj: 1.02 },
    { name: '1.4 Turbo Top', specs: { body, engine: '1.4L', turbo: true, cyl: 4, hp: 150, fuel: 'Flex', gearbox: 'Automático', drive: '4x2', doors: 4 }, priceAdj: 1.18 },
  ];
}

function getVersions(brand, model) {
  const key = `${brand}-${model}`;
  return VERSIONS_BY_MODEL[key] || defaultVersions(brand, model);
}

// Format specs into a readable spec string
function formatSpecs(s) {
  const parts = [
    s.body,
    s.engine,
    s.turbo && 'Turbo',
    s.cyl && `${s.cyl} cilindros`,
    s.hp && `${s.hp} cv`,
    s.fuel,
    s.gearbox,
    s.drive,
    s.doors && `${s.doors} portas`,
  ].filter(Boolean);
  return parts.join(' · ');
}

Object.assign(window, { VERSIONS_BY_MODEL, getVersions, formatSpecs });
