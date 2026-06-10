export const PAPER = {
  name: 'The Moorish Times',
  tagline: 'All the Code That’s Fit to Ship',
  edition: 'Vol. I — No. 1 · Final Edition ★★★',
  origin: 'Printed in Casablanca · Distributed on the Cloud',
  price: 'Price: One GitHub Star',
};

export const CONTACT = {
  email: 'med.benmoussa.dev@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mohamed-ben-moussa-b60ab498/',
  github: 'https://github.com/MedNewton',
};

export const TICKER_ITEMS = [
  'BREAKING — BUILD PASSES ON FIRST TRY; WITNESSES STUNNED',
  'MARKETS — TYPESCRIPT HOLDS FIRM AMID ANY-TYPE SELL-OFF',
  'WIRE — MCP SERVERS NOW SPEAKING FLUENT LLM',
  'WEATHER — PARTLY CLOUDY WITH A CHANCE OF SERVERLESS',
  'SPORTS — LOCAL DEV LIFTS 26 DATABASE TABLES, UNASSISTED',
  'CLASSIFIEDS — GAS FEES AT RECORD LOWS, SAYS MAN WHO CHECKS HOURLY',
  'CULTURE — CLEAN ARCHITECTURE DECLARED “TIMELESS” BY CRITICS',
];

export const LEAD = {
  kicker: 'The Front Page',
  headline:
    'ENGINEER SHIPS FULL-STACK, WEB3 & A.I. — REFUSES TO COMPROMISE ON UX',
  dek: 'From DeFi indices to multi-agent systems, Mohamed Ben Moussa — known on the wire as “The Moorish” — builds the whole edition himself: frontend, backend, smart contracts, and the agents in between.',
  dateline: 'CASABLANCA',
  paragraphs: [
    'Sources across the industry confirm what the markets long suspected: a full-stack developer focused on modern TypeScript and React applications, Web3 dApps, and agentic AI systems has been shipping at a pace described by one observer as “frankly suspicious.”',
    'The engineer’s portfolio reads like a market index of its own — DeFi protocols, tokenized real-world assets, marketplaces, and CRMs — each delivered with an obsession witnesses describe as “clean architecture, good DX, and UX with no friction whatsoever.”',
    'Asked to comment on the breadth of the operation, which spans frontend, backend, smart contracts, and third-party integrations, the developer reportedly shrugged and opened another terminal. “Fast, clear, no friction,” he was heard muttering, before the build completed in record time.',
    'Analysts note a recent expansion into artificial intelligence: agents, multi-agent systems, and Model Context Protocol servers now roll off the same presses. The product desk has been advised to expect further editions.',
  ],
  continued: 'Continued on every scroll below ☟',
  photoCaption:
    'Our correspondent, M. Ben Moussa — photographed at the news desk, mid-deploy.',
  pullQuote: '“Fast, clear, no friction.”',
  pullQuoteAttribution: '— The Editor, on everything he ships',
};

export type Trend = 'up' | 'hot' | 'steady';

export interface MarketRow {
  sym: string;
  name: string;
  desk: string;
  note: string;
  trend: Trend;
}

export const MARKET_ROWS: MarketRow[] = [
  {
    sym: 'TS',
    name: 'TypeScript',
    desk: 'LANG',
    note: 'blue chip — strict since listing',
    trend: 'up',
  },
  {
    sym: 'REACT',
    name: 'React 19',
    desk: 'FRONT',
    note: 'pays dividends in components',
    trend: 'up',
  },
  {
    sym: 'NEXT',
    name: 'Next.js',
    desk: 'FRONT',
    note: 'app-router division expanding',
    trend: 'up',
  },
  {
    sym: 'TW',
    name: 'Tailwind CSS',
    desk: 'FRONT',
    note: 'utilities at all-time high',
    trend: 'hot',
  },
  {
    sym: 'R3F',
    name: 'React Three Fiber',
    desk: 'FRONT',
    note: 'third dimension acquired',
    trend: 'up',
  },
  {
    sym: 'NODE',
    name: 'Node.js',
    desk: 'BACK',
    note: 'steady industrial output',
    trend: 'up',
  },
  {
    sym: 'STRP',
    name: 'Stripe',
    desk: 'BACK',
    note: 'payments clearing nightly',
    trend: 'up',
  },
  {
    sym: 'SOL',
    name: 'Solidity',
    desk: 'CHAIN',
    note: 'eleven contracts on record',
    trend: 'up',
  },
  {
    sym: 'VIEM',
    name: 'Viem / ethers.js',
    desk: 'CHAIN',
    note: 'typed rails to mainnet',
    trend: 'up',
  },
  {
    sym: 'TWEB',
    name: 'Thirdweb',
    desk: 'CHAIN',
    note: 'embedded wallets in vault',
    trend: 'up',
  },
  {
    sym: 'PG',
    name: 'PostgreSQL',
    desk: 'DATA',
    note: 'heavy industry, dependable',
    trend: 'up',
  },
  {
    sym: 'SUPA',
    name: 'Supabase',
    desk: 'DATA',
    note: 'realtime utilities surging',
    trend: 'up',
  },
  {
    sym: 'RN',
    name: 'React Native / Expo',
    desk: 'MOBILE',
    note: 'fifty screens strong',
    trend: 'up',
  },
  {
    sym: 'PY',
    name: 'Python',
    desk: 'LANG',
    note: 'scripting commodities stable',
    trend: 'steady',
  },
  {
    sym: 'RS',
    name: 'Rust',
    desk: 'LANG',
    note: 'long position, accumulating',
    trend: 'steady',
  },
  {
    sym: 'AGNT',
    name: 'AI Agents / MCP',
    desk: 'A.I.',
    note: 'growth stock of the decade',
    trend: 'hot',
  },
];

export interface Dispatch {
  kicker: string;
  headline: string;
  dateline: string;
  body: string;
  href?: string;
}

export const DISPATCHES: Dispatch[] = [
  {
    kicker: 'DeFi · RWA',
    headline: 'Index Funds Go On-Chain: NexLabs Brings Portfolio Logic to Web3',
    dateline: 'MAINNET',
    body: 'Frontend and dApp work for a DeFi indices and RWA asset-management platform — Next.js, TypeScript, MUI and Web3 — focused on index-based investing UX, embedded wallets and on-chain analytics.',
    href: 'https://www.nexlabs.io/',
  },
  {
    kicker: 'Real Assets',
    headline: 'Eleven Contracts, One Ecosystem: Urano Tokenizes the Real World',
    dateline: 'SEPOLIA',
    body: 'A full Web3 application with 11 smart contracts: ERC-20 staking and veToken governance, a fractional RWA marketplace, KYC/AML via Persona, vesting, presale — plus a resident AI assistant. React, Vite, Thirdweb, Viem, TanStack Query, with Vercel serverless and Supabase behind the counter.',
  },
  {
    kicker: 'A.I.',
    headline: 'Machines Now Build Websites; Local Monorepo Held Responsible',
    dateline: 'THE PRESSES',
    body: 'SiteLab: a pnpm monorepo with two Next.js 16 apps and three shared packages. Multi-provider AI orchestration via Vercel AI Gateway and the V0 SDK, RAG pipelines, multi-tenant architecture, and Supabase Postgres with pgvector across 26 tables — generation monitored in real time.',
  },
  {
    kicker: 'SaaS',
    headline: 'Business Plans Write Themselves; Consultants Join by Video',
    dateline: 'SILICON PLAN',
    body: 'An AI-powered business planning platform on Next.js 15 and React 19: a 25-component drag-and-drop plan editor, six canvas templates, pitch deck builder, financial projections with six valuation methods, a consultant marketplace with LiveKit video — exported to PDF, DOCX, PPTX and Excel.',
  },
  {
    kicker: 'Mobile',
    headline: 'Fifty Screens and a Map: Event App Puts the City in Your Pocket',
    dateline: 'CONNECTIONS-AI',
    body: 'A full-stack React Native/Expo app for discovering nearby events on a map, buying tickets via Stripe, and running events as a creator — QR check-in, Resend invitations, Firebase Realtime Database, Better Auth with email OTP, in English and Italian.',
  },
  {
    kicker: 'Events',
    headline: 'A.I., Web3 & Quantum Summit Descends Upon Naples',
    dateline: 'NAPLES',
    body: 'Art-directed conference website for ctrl/shift 2026 — dynamic hero, agenda, tracks, partners and application flows for a large-scale technology summit in the south of Italy.',
    href: 'https://www.ctrlshift.events/',
  },
];

export interface Brief {
  title: string;
  text: string;
  href?: string;
}

export const BRIEFS: Brief[] = [
  {
    title: 'Modus dApp',
    text: 'Tokenized SuperPrime real estate for global investors — stablecoins and card payments accepted.',
    href: 'https://www.modusdapp.org/',
  },
  {
    title: 'Urano Presale',
    text: '$URANO token presale flows: KYC, wallet connection, purchase UX and post-TGE claims.',
    href: 'https://www.presale.uranoecosystem.com/',
  },
  {
    title: 'NapulETH 2025',
    text: 'Archive for Southern Italy’s biggest Web3 event, on brand and on time.',
    href: 'https://www.napuleth.org/archive/2025',
  },
  {
    title: 'Nifty Naples',
    text: 'Phygital NFTs blending Neapolitan design with on-chain storytelling for non-crypto natives.',
    href: 'https://www.niftynaples.it/',
  },
  {
    title: 'Mood Global Services',
    text: 'Corporate site for a blockchain solutions provider — services, case studies, capabilities.',
    href: 'https://moodglobalservices.com/',
  },
  {
    title: 'Axiam Capital',
    text: 'Crypto arbitrage and analytics platform with live market data dashboards.',
    href: 'https://axiamcapitalgroup.xyz/',
  },
  {
    title: 'Artrise Marketplace',
    text: 'Solo full-stack NFT marketplace: gasless minting, meta-transactions and auctions on Firebase.',
  },
];

export interface ReportItem {
  slug: string;
  text: string;
}

export const SPECIAL_REPORT: ReportItem[] = [
  {
    slug: 'Agents, Assembled',
    text: 'Design and implementation of AI agents and multi-agent systems — coordinated, observable, and gainfully employed.',
  },
  {
    slug: 'The Protocol Desk',
    text: 'MCP servers and clients wiring tools, APIs and external systems straight into LLMs. The machines now take calls.',
  },
  {
    slug: 'Orchestration at Scale',
    text: 'Multi-provider AI workflows with RAG pipelines and cost analytics — every token accounted for on the ledger.',
  },
  {
    slug: 'SaaS on the Presses',
    text: 'AI-powered products shipped to production: business-plan generation, website generation, chat assistants — embedded into Next.js and Node.js apps for automation and decision support.',
  },
];

export interface Ad {
  heading: string;
  body: string;
  cta?: string;
  href?: string;
}

export const ADS: Ad[] = [
  {
    heading: 'Situations Wanted',
    body: 'FULL-STACK ENGINEER, end-to-end, seeks ambitious DeFi, RWA or AI-agent product. Clean architecture guaranteed. No friction. Serious inquiries only — all inquiries are serious.',
    cta: 'Apply Within ☞',
    href: 'mailto:med.benmoussa.dev@gmail.com',
  },
  {
    heading: 'Tip Line',
    body: 'Got a product that needs shipping? The editor answers his own mail, usually within the hour.',
    cta: 'med.benmoussa.dev@gmail.com',
    href: 'mailto:med.benmoussa.dev@gmail.com',
  },
  {
    heading: 'The Wire',
    body: 'Professional correspondence, references and the occasional hot take — transmitted via LinkedIn.',
    cta: 'Connect on LinkedIn ☞',
    href: 'https://www.linkedin.com/in/mohamed-ben-moussa-b60ab498/',
  },
  {
    heading: 'Public Archives',
    body: 'Selected works available for inspection. Many holdings remain in private vaults, as is the custom with client editions.',
    cta: 'github.com/MedNewton ☞',
    href: 'https://github.com/MedNewton',
  },
];

export const NAV = [
  { label: 'The Markets', page: 'p.2', href: '#markets' },
  { label: 'Dispatches', page: 'p.3', href: '#dispatches' },
  { label: 'Special Report', page: 'p.4', href: '#report' },
  { label: 'Classifieds', page: 'p.5', href: '#classifieds' },
];
