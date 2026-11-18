/**
 * Copy and data for the section pages (Our Edge → Contact).
 * Only facts already present elsewhere on the site are used here (500+ MW, 8 sectors, 11 service lines,
 * GCC & India, quarterly blood drives, tree plantation, computers for government schools).
 * Add real project case studies to PROJECTS; optional fields (location) render only when set.
 */

export const STATS = [
  { value: "500 MW+", label: "Project experience" },
  { value: "8", label: "Sectors served" },
  { value: "11", label: "Specialist service lines" },
  { value: "GCC & India", label: "Regional presence" },
] as const;

export const DIFFERENTIATORS = [
  {
    title: "Study-first engineering",
    copy: "Every recommendation is backed by simulation: load flow, short-circuit, arc flash and transients. Risk is found on screen, not on site.",
  },
  {
    title: "Built for critical infrastructure",
    copy: "Data centers and high-availability facilities are where we go deepest: redundancy, selectivity and fault ride-through designed in from day one.",
  },
  {
    title: "Rooted in the GCC and India",
    copy: "Local standards, utilities and approval routes are familiar ground, with delivery that works the same way across both regions.",
  },
  {
    title: "One team, study to switch-on",
    copy: "The same engineers carry a project from first study through design, validation and commissioning support. Nothing is lost in hand-offs.",
  },
] as const;

export const SECTORS = [
  { label: "Power Generation", href: "/sectors/power-generation" },
  { label: "Renewables & Storage", href: "/sectors/renewables-energy-storage" },
  { label: "Transmission & Distribution", href: "/sectors/transmission-distribution" },
  { label: "Oil, Gas & Petrochemical", href: "/sectors/oil-gas-petrochemical" },
  { label: "Industrial", href: "/sectors/industrial" },
  { label: "Data Centres", href: "/sectors/data-centres" },
  { label: "Building Services", href: "/sectors/building-services" },
  { label: "Water", href: "/sectors/water" },
] as const;

export type DiagramKey = "studies" | "electrical" | "protection" | "automation" | "design" | "consultancy";

export const CAPABILITIES: {
  id: DiagramKey;
  index: string;
  title: string;
  lead: string;
  points: string[];
  deliverables: string[];
  href: string;
}[] = [
  {
    id: "studies",
    index: "01",
    title: "Power System Studies",
    lead: "We model the network, then stress it: normal operation, faults, switching and grid-code events, before anything is built or energised.",
    points: ["Load flow and voltage profile", "Short-circuit and stability", "Harmonics and power quality", "Grid-code compliance"],
    deliverables: ["Study report", "Risk register"],
    href: "/services/power-system-analysis",
  },
  {
    id: "electrical",
    index: "02",
    title: "Electrical Engineering",
    lead: "LV and MV system engineering that carries a design from concept through load calculation, equipment sizing and system architecture.",
    points: ["Load and demand calculations", "Cable, transformer and switchgear sizing", "Earthing and grounding", "System architecture"],
    deliverables: ["Calculations", "Single-line diagrams"],
    href: "/services/earthing-grounding",
  },
  {
    id: "protection",
    index: "03",
    title: "Protection Engineering",
    lead: "Protection that clears the fault and nothing else: settings, coordination and arc-flash assessment worked out against the real network.",
    points: ["Relay settings and coordination", "Arc-flash incident energy", "Selectivity and ride-through", "Setting verification on site"],
    deliverables: ["Protection settings", "Coordination curves"],
    href: "/services/protection-arc-flash",
  },
  {
    id: "automation",
    index: "04",
    title: "Automation and Control",
    lead: "Control and automation solutions that tie power equipment, supervision and operating logic into one system that operators can trust.",
    points: ["Control philosophy and logic", "Supervision and monitoring", "Controller tuning", "Integration with power systems"],
    deliverables: ["Control specifications", "Integration support"],
    href: "/services/dynamic-transients-rms",
  },
  {
    id: "design",
    index: "05",
    title: "Electrical Design",
    lead: "Buildable drawings and documents: the single-line diagrams, layouts, specifications and bill of quantities a contractor can price and install.",
    points: ["Single-line diagrams", "Layouts and schematics", "Equipment specifications", "Bill of quantities"],
    deliverables: ["Drawing set", "Specifications", "BOQ"],
    href: "/sectors/building-services",
  },
  {
    id: "consultancy",
    index: "06",
    title: "Technical Consultancy",
    lead: "Independent technical judgement for owners and developers: design reviews, compliance checks and specialist advice at the decisions that matter.",
    points: ["Independent design review", "Compliance review", "Specialist studies", "On-site engineering support"],
    deliverables: ["Review report", "Compliance statement"],
    href: "/services/specialist-studies",
  },
];

export const CRITICAL_CONCEPTS = [
  {
    word: "Reliability",
    line: "How rarely a system fails.",
    copy: "Sound components, conservative ratings and maintainable design reduce the probability that any failure happens at all.",
  },
  {
    word: "Redundancy",
    line: "What happens when something does.",
    copy: "Independent, spare power paths mean one failed component or feeder does not interrupt the load it was serving.",
  },
  {
    word: "Resilience",
    line: "How the facility rides through abnormal events.",
    copy: "Faults, grid disturbances and switching events are studied up front, so the system absorbs them and recovers by design.",
  },
] as const;

export const CRITICAL_AREAS = [
  { title: "Data Center Power Architecture", copy: "Utility, generator, UPS and distribution arranged as one coordinated system, sized for the hall it feeds." },
  { title: "Power Redundancy", copy: "N+1, 2N and distributed-redundant topologies compared on risk, cost and maintainability." },
  { title: "Electrical Reliability", copy: "Fault levels, selectivity and arc-flash proven in studies before equipment is specified." },
  { title: "Resilience Engineering", copy: "Utility, generator and UPS interaction tested against disturbances and failure scenarios." },
  { title: "Critical Infrastructure Design", copy: "Drawings, specifications and calculations for facilities where interruption is not acceptable." },
  { title: "Power Distribution Systems", copy: "MV and LV distribution to the rack and to the plant, built for concurrent maintainability." },
] as const;

export type Project = {
  slug: string;
  title: string;
  industry: string;
  location?: string;
  scope: string[];
  summary: string;
  detail: string;
  image: string;
  imageAlt: string;
  href: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "transmission-distribution",
    title: "Transmission & Distribution Networks",
    industry: "Transmission & Distribution",
    scope: ["Load flow", "Short-circuit", "Stability", "Network reinforcement"],
    summary: "Load flow, short-circuit and stability studies for grid connection and network reinforcement.",
    detail:
      "Network models are built and tested across normal and fault conditions to show where reinforcement is needed and what a new connection will do to the system around it.",
    image: "/photos/pylon-sunset.webp",
    imageAlt: "Transmission pylon silhouetted against a sunset sky",
    href: "/sectors/transmission-distribution",
  },
  {
    slug: "renewable-integration",
    title: "Renewable Energy Integration",
    industry: "Renewables & Energy Storage",
    scope: ["Grid-code compliance", "Plant modelling", "Connection studies", "Controller tuning"],
    summary: "Grid-code compliance, plant modelling and connection studies for solar, wind and hybrid plants.",
    detail:
      "Solar, wind and hybrid plants are studied for the weak grids they plug into: stability, harmonics and ride-through, so connection approvals arrive on schedule.",
    image: "/photos/wind-turbines.webp",
    imageAlt: "Wind turbines in an open landscape",
    href: "/sectors/renewables-energy-storage",
  },
  {
    slug: "solar-and-storage",
    title: "Solar and Battery Storage",
    industry: "Renewables & Energy Storage",
    scope: ["BESS sizing", "Dispatch strategy", "EMT validation", "Protection"],
    summary: "Sizing, dispatch strategy, protection and EMT validation for utility and behind-the-meter storage.",
    detail:
      "Storage is sized and validated against grid codes, with the protection and control studies that decide whether it stays connected when the grid is disturbed.",
    image: "/photos/solar-farm.webp",
    imageAlt: "Rows of solar panels in a field",
    href: "/sectors/renewables-energy-storage",
  },
  {
    slug: "power-generation-industrial",
    title: "Power Generation & Industrial Plant",
    industry: "Power Generation · Industrial",
    scope: ["Plant-wide design", "Motor starting", "Protection", "Captive generation"],
    summary: "Plant-wide electrical design, motor-starting and protection studies for process industries.",
    detail:
      "Heavy loads, drives and captive generation are engineered as one system, with studies that show how the plant behaves during starts, faults and changeovers.",
    image: "/powered-shell-bg.webp",
    imageAlt: "Industrial power plant and switchyard at dusk under a stormy sky",
    href: "/sectors/power-generation",
  },
];

export const METHOD = [
  {
    step: "01",
    title: "Scope and data",
    does: "We agree the question, the standards that apply and the data needed, and flag gaps early.",
    gets: ["Study basis", "Data request"],
  },
  {
    step: "02",
    title: "Model",
    does: "The network, loads and sources are modelled and checked against the data supplied.",
    gets: ["Network model", "Assumptions log"],
  },
  {
    step: "03",
    title: "Analyse",
    does: "Normal, fault and switching cases are run, and the results are tested against acceptance criteria.",
    gets: ["Study report", "Risk register"],
  },
  {
    step: "04",
    title: "Design",
    does: "Results are turned into drawings, specifications and calculations that can be built from.",
    gets: ["Single-line diagrams", "Specifications", "BOQ"],
  },
  {
    step: "05",
    title: "Verify",
    does: "An independent check of calculations and a dynamic simulation confirm the design before issue.",
    gets: ["Validation report", "Compliance review"],
  },
  {
    step: "06",
    title: "Commission",
    does: "We support protection settings, witnessing and energisation on site, then hand over a documented system.",
    gets: ["Protection settings", "On-site support"],
  },
] as const;

export const PRINCIPLES = [
  { word: "Verified", copy: "Results are checked, not assumed. Calculations are reviewed and designs are validated by simulation before issue." },
  { word: "Traceable", copy: "Every number traces to an input, an assumption and a standard, so any result can be reproduced and defended." },
  { word: "Precise", copy: "Models are built from supplied data and gaps are called out, never filled with quiet guesses." },
] as const;

export const CSR_STORIES = [
  {
    index: "01",
    title: "Blood donation drives",
    tag: "Every quarter",
    figure: "4×",
    figureLabel: "a year, without fail",
    copy: "Our teams organise and take part in blood donation camps once every quarter, supporting local hospitals and blood banks with a steady, reliable supply. The drives are open to employees across all our offices and run in partnership with local hospitals and blood banks.",
  },
  {
    index: "02",
    title: "Computers for government schools",
    tag: "Education support",
    figure: "PCs",
    figureLabel: "donated directly to schools",
    copy: "We donate computers to government schools so that students get hands-on access to digital learning, regardless of what their school can afford. The aim is practical, hands-on skills for students with limited access to computers.",
  },
  {
    index: "03",
    title: "Tree plantation",
    tag: "Ongoing",
    figure: "100s",
    figureLabel: "of saplings planted to date",
    copy: "We have planted hundreds of trees as part of our commitment to greener, more liveable communities, choosing native species for long-term survival, and we keep adding to that count each year.",
  },
  {
    index: "04",
    title: "Food distribution",
    tag: "Community support",
    copy: "Our teams take part in food distribution drives for families and individuals in need in the communities around our offices.",
  },
  {
    index: "05",
    title: "Youth development",
    tag: "Next generation",
    copy: "We support young people with skills, mentoring and exposure to engineering careers, so more of them can see a path into the profession.",
  },
] as const;

export const CONTACT = {
  email: "contact@infoelex.com",
  phone: "+91 422 400 0000",
  phoneHref: "tel:+914220000000",
  office: ["Infoelex Electrical Consulting", "Coimbatore, Tamil Nadu, India"],
} as const;

export const ENQUIRY_TYPES = [
  "Power System Studies",
  "Electrical Design & Engineering",
  "Protection Engineering",
  "Automation Solutions",
  "Data Center Consulting",
  "Business collaboration",
  "Project discussion",
  "Other enquiry",
] as const;

export const PRESENCE = [
  { region: "India", detail: "Headquarters in Coimbatore, Tamil Nadu, with delivery across the country." },
  { region: "GCC", detail: "Engineering for utilities, developers and operators across the Gulf region." },
] as const;

export const PHILOSOPHY = {
  quote: "A design is only as good as the evidence behind it.",
  copy: "We treat engineering as something to be proven, not asserted. Every recommendation is modelled, checked and documented so it can be reproduced by someone who was not in the room.",
} as const;

export const APPROACH = [
  { title: "Study first", copy: "The network is modelled and stressed on screen before any design decision is locked." },
  { title: "Standards-led", copy: "International standards and local grid codes set the acceptance criteria, stated up front." },
  { title: "Independent checks", copy: "Calculations are reviewed by a second engineer, and dynamic results are validated by simulation." },
  { title: "Documented end to end", copy: "Inputs, assumptions and results are recorded, so any number can be traced and defended." },
] as const;

export const TOOLS = [
  { title: "Steady-state analysis", copy: "Load flow, short-circuit and voltage studies on a fully modelled network." },
  { title: "Dynamic and transient simulation", copy: "RMS stability and electromagnetic transient (EMT) simulation for fast events and converter-based plant." },
  { title: "Protection and arc-flash analysis", copy: "Coordination and incident-energy tools used against the real settings and equipment." },
  { title: "Harmonics and power quality", copy: "Harmonic and flicker assessment against grid-code limits." },
] as const;
