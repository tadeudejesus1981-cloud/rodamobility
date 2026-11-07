export const INITIAL_BIKES = [
  {
    id: 'pcx-125-red',
    name: 'Scooter 125cc PCX Honda',
    brand: 'Honda',
    model: 'PCX 125 eSP+ Candy Lusty Red 2024',
    category: 'Scooter 125cc',
    plate: '1024-KLM',
    dailyRate: 22,
    deposit: 150,
    status: 'Disponible', // 'Disponible' | 'Alquilada' | 'En Taller'
    color: 'Rojo Brillante / Candy Red',
    engine: '125cc · 4 tiempos (9.2 kW / 12.5 CV)',
    licenseRequired: 'Carnet A1 o Carnet B (+3 años)',
    consumption: '2.1 L / 100km (Autonomía ~380km)',
    features: [
      'Motor Honda eSP+ de bajísimo consumo y gran agilidad urbana',
      'Hueco bajo el asiento para 1 casco integral (30.4 L)',
      'Puerto de carga USB-C para smartphone / GPS',
      'Sistema de frenos ABS delantero de alta seguridad',
      '1 Casco homologado incluido'
    ],
    image: '/bikes/pcx-125-red.jpg',
    tag: 'Económica y Ágil · Honda PCX Roja Oficial · Almería y Playas'
  },
  {
    id: 'pcx-125-black',
    name: 'Scooter 125cc PCX Honda',
    brand: 'Honda',
    model: 'PCX 125 Special Edition Negro Mate 2024',
    category: 'Scooter 125cc',
    plate: '4892-MNP',
    dailyRate: 30,
    deposit: 150,
    status: 'Disponible',
    color: 'Negro Carbón Mate / Special Black',
    engine: '125cc · 4 tiempos (9.2 kW / 12.5 CV)',
    licenseRequired: 'Carnet A1 o Carnet B (+3 años)',
    consumption: '2.1 L / 100km',
    features: [
      'Llave inteligente Honda Smart Key de proximidad',
      'Baúl trasero Shad SH39 con respaldo incluido (Capacidad 2 cascos)',
      'Control de tracción HSTC para máxima seguridad en curvas costeras',
      'Frenada combinada CBS + ABS',
      '1 Casco Premium homologado incluido'
    ],
    image: '/bikes/pcx-125-black.jpg',
    tag: 'Top Confort · Honda PCX Negra con Baúl · Lista para Cabo de Gata'
  },
  {
    id: 'touring-300-maxi',
    name: 'Moto 300cc / Gran Cilindrada',
    brand: 'Honda',
    model: 'Forza 300 ABS / Maxi-Scooter Gran Turismo',
    category: 'Gran Cilindrada',
    plate: '8831-LPB',
    dailyRate: 45,
    deposit: 300,
    status: 'Disponible',
    color: 'Titanium Grey / Carbon Tech',
    engine: '300cc · Inyección PGM-FI (21 kW / 29 CV)',
    licenseRequired: 'Carnet A2 o Carnet A',
    consumption: '3.2 L / 100km (Autopista y Carretera)',
    features: [
      'Pantalla parabrisas electrónica regulable en marcha',
      'Apta para autovía A-7 y curvas de Sierra Alhamilla y Tabernas',
      'Espacio bajo el asiento para dos cascos integrales',
      'Doble disco de freno ABS integral deportivo',
      'Soporte antivibración para navegación GPS'
    ],
    image: '/bikes/forza-300.jpg',
    tag: 'Máxima Potencia y Confort · Autovía A-7 y Rutas Desierto de Tabernas'
  }
];

export const ALMERIA_ROUTES = [
  {
    title: 'Ruta Costera Cabo de Gata & Playas Vírgenes',
    distance: '65 km · 1h 40min',
    difficulty: 'Fácil (Perfecta para Scooter 125cc)',
    highlight: 'Playa de los Genoveses · Playa de Mónsul · San José · Arrecife de las Sirenas',
    description: 'Playas vírgenes de arena fina y aguas cristalinas turquesas en pleno Parque Natural. Acceso cómodo y ágil en moto evitando problemas de aparcamiento.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&auto=format&fit=crop&q=85'
  },
  {
    title: 'Ruta Desierto de Tabernas & Cañones Western',
    distance: '95 km · 2h 10min',
    difficulty: 'Media (Ideal Gran Cilindrada 300cc y 125cc)',
    highlight: 'Badlands de Tabernas · Oasys Mini Hollywood · Cañones y Ramblas',
    description: 'El único desierto oficial de Europa. Paisajes áridos de película con carreteras serpenteantes entre cañones dorados.',
    image: 'https://images.unsplash.com/photo-1547234935-80c7145ec969?w=1000&auto=format&fit=crop&q=85'
  },
  {
    title: 'Ruta de la Alpujarra Almeriense & Miradores',
    distance: '80 km · 2h',
    difficulty: 'Media-Panorámica (125cc o 300cc)',
    highlight: 'Laujar de Andarax · Fondón · Vistas Sierra Nevada y Alborán',
    description: 'Pueblos blancos tradicionales, aire puro de montaña y curvas suaves con asfalto impecable.',
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&auto=format&fit=crop&q=80'
  }
];

export const EXTRA_OPTIONS = [
  {
    id: 'helmet2',
    name: '2º Casco Homologado Talla M/L',
    pricePerDay: 3,
    description: 'Casco integral o jet con visera anti-vaho y protector higiénico'
  },
  {
    id: 'trunk',
    name: 'Baúl Trasero Shad XL (39 Litros)',
    pricePerDay: 3,
    description: 'Capacidad para guardar 2 cascos o mochilas de playa de forma segura'
  },
  {
    id: 'insuranceFull',
    name: 'Seguro Todo Riesgo (Franquicia Cero)',
    pricePerDay: 5,
    description: 'Exención total de daños propios, robo y pinchazos sin franquicia'
  },
  {
    id: 'phoneHolder',
    name: 'Soporte Impermeable Móvil + USB',
    pricePerDay: 1,
    description: 'Soporte con fijación anti-vibración y cable de carga rápida incluido'
  }
];

export const CONTRACT_TERMS = {
  company: 'RODA MOBILITY S.L.',
  cif: 'B-04987213',
  address: 'Paseo Marítimo Carmen de Burgos, 14, 04007 Almería, España',
  phone: '+34 950 123 456 / +34 611 987 654',
  email: 'reservas@rodamobility.com',
  insurancePolicy: 'Mapfre Empresas Póliza Flota Colectiva nº ES-8947209-A',
  rulesSummary: [
    'Uso exclusivo en la provincia de Almería (Cabo de Gata, Tabernas, Alpujarra).',
    'Edad mínima 21 años y carnet B con más de 3 años o carnet específico de moto (A1/A2/A).',
    'Política de combustible: Lleno a Lleno (se entrega depósito completo y se devuelve completo).',
    'Multas e infracciones de tráfico DGT son responsabilidad directa y exclusiva del arrendatario.',
    'Prohibido el uso de la moto en arenas de playa, caminos no asfaltados restringidos del Parque Natural o conducción temeraria.',
    'Fianza obligatoria retenida mediante tarjeta bancaria y liberada en 24h tras la devolución e inspección sin incidencias.',
    'Tratamiento de datos conforme a RGPD UE 2016/679 para la gestión del contrato de alquiler de moto.'
  ]
};
