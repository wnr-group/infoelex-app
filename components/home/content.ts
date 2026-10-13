/** Homepage copy and data. Case-study cards are editorial topic pieces: swap in real case studies when available. */

export type SceneKey =
  | "datacenter"
  | "bess"
  | "renewable"
  | "substation"
  | "switchgear"
  | "industrial"
  | "water"
  | "hydrogen"
  | "shipping"
  | "building";

export const SERVICES: {
  title: string;
  blurb: string;
  href: string;
  scene: SceneKey;
}[] = [
  {
    title: "Power Generation, Transmission & Distribution",
    blurb: "Load flow, short-circuit and stability studies for generation, grid connection and network reinforcement.",
    href: "/sectors/transmission-distribution",
    scene: "substation",
  },
  {
    title: "Renewable Energy Integration",
    blurb: "Grid-code compliance, plant modelling and connection studies for solar, wind and hybrid plants.",
    href: "/sectors/renewables-energy-storage",
    scene: "renewable",
  },
  {
    title: "Battery Energy Storage Systems",
    blurb: "Sizing, dispatch strategy, protection and EMT validation for utility and behind-the-meter BESS.",
    href: "/sectors/renewables-energy-storage",
    scene: "bess",
  },
  {
    title: "Data Centers & Critical Infrastructure",
    blurb: "Resilient power architectures, arc-flash and coordination studies.",
    href: "/sectors/data-centres",
    scene: "datacenter",
  },
  {
    title: "PQ Solutions",
    blurb: "Harmonic, flicker and voltage-quality assessment with filtering and compensation design.",
    href: "/services/power-quality",
    scene: "switchgear",
  },
  {
    title: "Industrial Infrastructure",
    blurb: "Plant-wide electrical design, motor-starting and protection studies for process industries.",
    href: "/sectors/industrial",
    scene: "industrial",
  },
  {
    title: "Steel & Cement",
    blurb: "Power and automation engineering for heavy loads, furnaces, drives and captive generation.",
    href: "/sectors/industrial",
    scene: "industrial",
  },
  {
    title: "Water Treatment",
    blurb: "Electrical systems for treatment, pumping and desalination plants, built for continuous duty.",
    href: "/sectors/water",
    scene: "water",
  },
  {
    title: "Green Hydrogen & Green Ammonia",
    blurb: "Electrolyser integration, power-to-X load behaviour and supply studies.",
    href: "/sectors/oil-gas-petrochemical",
    scene: "hydrogen",
  },
  {
    title: "Distribution & Shipping",
    blurb: "Port, terminal and logistics electrification and heavy-duty charging loads.",
    href: "/sectors/industrial",
    scene: "shipping",
  },
  {
    title: "Building Infrastructure",
    blurb: "LV/MV design, single-line diagrams, calculations and BOQ for commercial and residential buildings.",
    href: "/sectors/building-services",
    scene: "building",
  },
];

export const EXPERTISE: {
  index: string;
  tag: string;
  title: string;
  copy: string;
  points: string[];
  href: string;
  scene: SceneKey;
}[] = [
  {
    index: "01",
    tag: "Data Centers & Critical Infrastructure",
    title: "Power that never blinks.",
    copy: "From colocation halls to AI campuses, we engineer the electrical backbone: redundancy, protection and fault behaviour proven in studies before a single cable is pulled.",
    points: ["Load flow & short-circuit", "Arc flash & protection coordination", "Generator, UPS & utility interaction"],
    href: "/sectors/data-centres",
    scene: "datacenter",
  },
  {
    index: "02",
    tag: "Battery Energy Storage",
    title: "Storage the grid can trust.",
    copy: "Utility-scale and behind-the-meter BESS, sized and validated against grid codes, with the protection and control studies that decide whether it stays connected.",
    points: ["Sizing & dispatch strategy", "EMT & RMS model validation", "Grid-code compliance"],
    href: "/sectors/renewables-energy-storage",
    scene: "bess",
  },
  {
    index: "03",
    tag: "Renewable Integration",
    title: "Clean generation, firm connection.",
    copy: "Solar, wind and hybrid plants studied for the weak grids they plug into: stability, harmonics and ride-through, so approvals arrive on schedule.",
    points: ["Connection & stability studies", "Harmonics & power quality", "Plant controller tuning"],
    href: "/sectors/renewables-energy-storage",
    scene: "renewable",
  },
];

export const PROCESS: { step: string; title: string; copy: string }[] = [
  {
    step: "01",
    title: "Study",
    copy: "We model your network and loads, define the fault and operating cases, and surface risk early.",
  },
  {
    step: "02",
    title: "Design",
    copy: "Single-line diagrams, equipment specifications and calculations built directly from the study results.",
  },
  {
    step: "03",
    title: "Validate",
    copy: "Independent checks, dynamic and transient simulations and compliance review before anything is built.",
  },
  {
    step: "04",
    title: "Commission",
    copy: "Settings, witnessing and on-site support so what was engineered is what energises.",
  },
];

export const NUMBERS: { value: number; suffix: string; unit?: string; label: string }[] = [
  { value: 10, suffix: "+", label: "Data center projects delivered" },
  { value: 500, suffix: "+", unit: "MW", label: "Project experience" },
  { value: 8, suffix: "", label: "Sectors served" },
  { value: 11, suffix: "", label: "Specialist service lines" },
];

export const INSIGHTS: {
  tag: string;
  title: string;
  href: string;
  scene: SceneKey;
}[] = [
  {
    tag: "Data Centers",
    title: "Designing power resilience for AI-scale data halls",
    href: "/sectors/data-centres",
    scene: "datacenter",
  },
  {
    tag: "Energy Storage",
    title: "Sizing BESS for grid-code compliance, not just capacity",
    href: "/sectors/renewables-energy-storage",
    scene: "bess",
  },
  {
    tag: "Power Quality",
    title: "Harmonics in renewable-heavy networks: what studies must catch",
    href: "/services/power-quality",
    scene: "substation",
  },
];

export const SECTORS_STRIP: { label: string; href: string }[] = [
  { label: "Power Generation", href: "/sectors/power-generation" },
  { label: "Renewables & Storage", href: "/sectors/renewables-energy-storage" },
  { label: "Transmission & Distribution", href: "/sectors/transmission-distribution" },
  { label: "Oil, Gas & Petrochemical", href: "/sectors/oil-gas-petrochemical" },
  { label: "Industrial", href: "/sectors/industrial" },
  { label: "Data Centres", href: "/sectors/data-centres" },
  { label: "Building Services", href: "/sectors/building-services" },
  { label: "Water", href: "/sectors/water" },
];
