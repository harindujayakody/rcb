export interface PavingPattern {
  id: string;
  name: string;
  spec: string;
  badge?: string;
  image: string;
  description: string;
  idealFor: string;
}

export const pavingPatterns: PavingPattern[] = [
  {
    id: "herringbone",
    name: "HERRINGBONE 90° / 45°",
    spec: "60 MM · 41.3 / M²",
    badge: "SIGNATURE FINISH",
    image: "/hero-final-frame.webp",
    description: "Interlocking directional mesh designed for maximum vehicle interlock and structural load distribution.",
    idealFor: "Driveways & Commercial Forecourts",
  },
  {
    id: "stretcher",
    name: "STRETCHER BOND",
    spec: "60 MM · 45.0 / M²",
    badge: "ARCHITECTURAL FAVORITE",
    image: "/paving-after.webp",
    description: "Clean linear geometry providing modern contemporary rhythm for promenades and walkways.",
    idealFor: "Walkways & Courtyards",
  },
  {
    id: "basketweave",
    name: "BASKET WEAVE",
    spec: "60 MM · 50.0 / M²",
    badge: "RESIDENTIAL PRIME",
    image: "/ip.jpg",
    description: "Pairs of blocks arranged alternately to create a balanced parquet texture with timeless character.",
    idealFor: "Patios, Gardens & Pool Decks",
  },
  {
    id: "radial",
    name: "CIRCULAR & RADIAL",
    spec: "80 MM · CUSTOM",
    badge: "CENTRAL FEATURE",
    image: "/paving/radial.jpg",
    description: "Focal centerpiece paving that curves outward to create breathtaking estate drop-off points.",
    idealFor: "Rotundas & Estate Entrances",
  },
  {
    id: "heavy-duty",
    name: "INDUSTRIAL INTERLOCK",
    spec: "80 MM · 36.5 / M²",
    badge: "HEAVY TRAFFIC",
    image: "/paving/industrial.jpg",
    description: "Engineered high-density cement block formulation designed for heavy cargo and equipment traffic.",
    idealFor: "Warehouses, Container Yards & Ports",
  },
];

export interface MachineModel {
  id: string;
  category: "block" | "earthmovers" | "compactors" | "concrete";
  name: string;
  brand: string;
  badge: "IN STOCK" | "ON ORDER" | "AUTHORIZED DISTRIBUTOR";
  image: string;
  specs: {
    power?: string;
    operatingWeight?: string;
    capacity?: string;
    cycleTime?: string;
    dimensions?: string;
  };
  summary: string;
}

export const machineCategories = [
  { id: "block", label: "BLOCK MACHINES" },
  { id: "earthmovers", label: "EARTHMOVERS" },
  { id: "compactors", label: "COMPACTORS" },
  { id: "concrete", label: "CONCRETE PLANTS" },
] as const;

export const machineCatalog: MachineModel[] = [
  {
    id: "qt8-15",
    category: "block",
    name: "QT8-15 HYDRAULIC BLOCK MACHINE",
    brand: "RCB / SHENGYA",
    badge: "IN STOCK",
    image: "/QT8-15.jpg",
    specs: {
      power: "37.5 kW Hydraulic System",
      capacity: "15,000–18,000 blocks / 8 hr",
      cycleTime: "15–20 Seconds per Mould",
      dimensions: "7.8m × 2.1m × 2.9m",
    },
    summary: "Heavy-duty PLC automated block making plant engineered for continuous industrial manufacturing with high-vibration compression.",
  },
  {
    id: "noah-series",
    category: "block",
    name: "NOAH AUTOMATIC BRICK PLANT",
    brand: "NOAH",
    badge: "AUTHORIZED DISTRIBUTOR",
    image: "/noah.jpg",
    specs: {
      power: "22 kW High-Torque",
      capacity: "9,000–12,000 blocks / 8 hr",
      cycleTime: "22 Seconds per Mould",
      dimensions: "5.4m × 1.8m × 2.6m",
    },
    summary: "Precise digital control system ensuring tight block density tolerances for government and commercial building standards.",
  },
  {
    id: "sdlg-l956f",
    category: "earthmovers",
    name: "SDLG L956FH WHEEL LOADER",
    brand: "SDLG (VOLVO GROUP)",
    badge: "IN STOCK",
    image: "/wheel-loader.jpg",
    specs: {
      power: "162 kW Weichai Tier 3",
      operatingWeight: "17,250 kg",
      capacity: "3.2 m³ Heavy Rock Bucket",
      cycleTime: "9.8 Seconds Full Cycle",
    },
    summary: "High breakout force and rugged reinforced chassis built for quarry operations, heavy aggregate handling, and road construction.",
  },
  {
    id: "sdlg-e6210f",
    category: "earthmovers",
    name: "SDLG E6210F HYDRAULIC EXCAVATOR",
    brand: "SDLG",
    badge: "ON ORDER",
    image: "/excavator.jpg",
    specs: {
      power: "123 kW Deutz Engine",
      operatingWeight: "21,250 kg",
      capacity: "1.0 m³ Heavy Digging Bucket",
      dimensions: "9.7m Boom Reach",
    },
    summary: "Fuel-efficient electro-hydraulic control system delivering precision trenching, foundation digging, and rock breaking power.",
  },
  {
    id: "sdlg-rs8140",
    category: "compactors",
    name: "SDLG RS8140 ROAD ROLLER",
    brand: "SDLG",
    badge: "AUTHORIZED DISTRIBUTOR",
    image: "/slide-1.jpg",
    specs: {
      power: "92 kW Turbocharged",
      operatingWeight: "14,000 kg",
      capacity: "Single Drum Vibratory",
      dimensions: "2,130 mm Drum Width",
    },
    summary: "Optimal static linear load and centrifugal compaction force for highway sub-base, asphalt prep, and industrial paving foundation.",
  },
  {
    id: "concrete-plant",
    category: "concrete",
    name: "HZS50 READY-MIX CONCRETE PLANT",
    brand: "RCB HEAVY",
    badge: "ON ORDER",
    image: "/ready-mix-plant.jpg",
    specs: {
      power: "75 kW Twin-Shaft Mixer",
      capacity: "50 m³ / hour continuous",
      dimensions: "Modular High-Stack Silos",
    },
    summary: "Industrial automated batching plant for concrete road projects, precast manufacturing, and high-volume construction supply.",
  },
];

export const statsData = [
  { value: 12, suffix: "+", label: "YEARS OF OPERATION", detail: "ICTAD Registered Construction Entity" },
  { value: 500, suffix: "+", label: "COMPLETED PROJECTS", detail: "Across Private & Government Sectors" },
  { value: 40, suffix: "+", label: "MACHINE MODELS", detail: "SDLG, Yineng, Noah & Shengya" },
  { value: 100, suffix: "%", label: "TESTED QUALITY", detail: "Strict Compressive Strength Standard" },
];

export const awardsData = [
  {
    year: "2013",
    title: "SHRAMABHIMANEE NATIONAL AWARD",
    org: "National Recognition Council",
    detail: "Conferred for outstanding contribution to Sri Lanka's industrial development and job creation.",
    image: "/image.jpg",
  },
  {
    year: "2016",
    title: "CONSTRUCTION EXHIBITION CO-SPONSOR AWARD",
    org: "Ceylon Institute of Builders",
    detail: "Honored for major sponsorship and advancing heavy machinery technology across the island.",
    image: "/image (2).jpg",
  },
];

export const timelineMilestones = [
  {
    year: "FOUNDED",
    title: "ESTABLISHED IN HOKANDARA",
    desc: "Began importing advanced interlock paving machinery and pioneering paving block distribution in the Western Province.",
  },
  {
    year: "2013",
    title: "SHRAMABHIMANEE NATIONAL AWARD",
    desc: "Recognized nationally by the Sri Lankan government for excellence in local construction manufacturing.",
  },
  {
    year: "2016",
    title: "SDLG & INDUSTRIAL EXPANSION",
    desc: "Became the authorized distributor for SDLG wheel loaders, excavators, and road rollers, expanding into heavy earthmoving.",
  },
  {
    year: "TODAY",
    title: "INFRASTRUCTURE PARTNER",
    desc: "A trusted ICTAD registered partner to the Sri Lankan construction community, delivering machines, pavers, and technical support.",
  },
];
