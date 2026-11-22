// Design-agnostic source of truth for the site's content.
// Mirrors resume.md — no presentation copy lives here.

export const identity = {
  name: 'Mohamed Ben Moussa',
  role: 'Full-Stack & Web3 Engineer',
  location: 'Morocco',
  email: 'med.benmoussa.dev@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mohamed-ben-moussa-b60ab498/',
  github: 'https://github.com/MedNewton',
  githubUser: 'MedNewton',
  site: 'themoorish.dev',
  summary:
    'Full-stack developer focused on modern TypeScript/React apps, Web3 dApps, and agentic AI systems.',
  availability:
    'Open to collaborations on DeFi, RWAs, Web3 infra, or AI-agent products.',
};

export const about = [
  'Building products around DeFi, tokenization, RWAs, marketplaces and CRMs.',
  'Experience designing AI agents, multi-agent systems and MCP servers/clients.',
  'Comfortable across frontend, backend, smart contracts, and integrations.',
  'Obsessed with clean architecture, good DX, and smooth UX (fast, clear, no friction).',
];

export interface StackGroup {
  title: string;
  items: string[];
}

export const stack: StackGroup[] = [
  {
    title: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'PHP', 'Rust (foundational)'],
  },
  {
    title: 'Frontend',
    items: [
      'React',
      'Next.js',
      'Vite',
      'React Three Fiber',
      'MUI',
      'Radix UI',
      'shadcn/ui',
      'Tailwind CSS',
      'HTML5',
      'CSS3',
    ],
  },
  { title: 'Mobile', items: ['React Native', 'Expo', 'NativeWind'] },
  {
    title: 'Backend & APIs',
    items: ['Node.js', 'Express.js', 'REST', 'Stripe', 'Clerk', 'Resend'],
  },
  {
    title: 'Web3 & Blockchain',
    items: ['Thirdweb', 'ethers.js', 'Viem', 'Alchemy', 'Ethereum', 'Solidity'],
  },
  { title: 'Data & Storage', items: ['PostgreSQL', 'Supabase', 'Firebase'] },
  {
    title: 'AI & Agents',
    items: [
      'OpenAI',
      'Vercel AI SDK',
      'LiveKit',
      'MCP servers & clients',
      'RAG pipelines',
    ],
  },
  {
    title: 'Tools & Workflow',
    items: ['Git', 'GitHub', 'Vercel', 'Notion', 'Trello', 'Slack', 'Discord'],
  },
];

export const aiCapabilities = [
  'Design and implementation of AI agents and multi-agent systems.',
  'MCP (Model Context Protocol) servers and clients — connecting tools, APIs and external systems to LLMs.',
  'Multi-provider AI orchestration with workflows, RAG pipelines and cost analytics.',
  'AI-powered SaaS products: business-plan generation, website generation, AI chat assistants.',
  'Agent workflows integrated into Next.js and Node.js apps for automation, data processing and decision support.',
];

export type ProjectCategory = 'web3' | 'ai' | 'mobile' | 'web';

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  categories: ProjectCategory[];
  tech: string[];
  url?: string;
  solo?: boolean;
}

// Many of these are client or team projects — code may live in private repos.
export const projects: Project[] = [
  {
    slug: 'nexlabs',
    name: 'NexLabs',
    tagline: 'DeFi indices & RWA asset management',
    description:
      'Frontend and dApp work focusing on index-based investing UX, embedded wallets and on-chain analytics.',
    categories: ['web3'],
    tech: ['Next.js', 'TypeScript', 'MUI', 'Web3'],
    url: 'https://www.nexlabs.io/',
  },
  {
    slug: 'modus',
    name: 'Modus dApp',
    tagline: 'Tokenized SuperPrime real-estate platform',
    description:
      'Contributed to the public site and dApp UI for global investors accessing institutional real estate via stablecoins and card payments.',
    categories: ['web3'],
    tech: [],
    url: 'https://www.modusdapp.org/',
  },
  {
    slug: 'urano-presale',
    name: 'Urano Ecosystem Presale',
    tagline: '$URANO token presale',
    description:
      'Built presale flows around tokenized RWAs: KYC, wallet connection, purchase UX and the post-TGE token claim experience.',
    categories: ['web3'],
    tech: [],
    url: 'https://www.presale.uranoecosystem.com/',
  },
  {
    slug: 'ctrl-shift-2026',
    name: 'ctrl/shift 2026',
    tagline: 'AI, Web3 & Quantum summit',
    description:
      'Art-directed conference website with dynamic hero, agenda, tracks, partners and application flows for a large-scale tech summit in Naples.',
    categories: ['web'],
    tech: [],
    url: 'https://www.ctrlshift.events/',
  },
  {
    slug: 'napuleth-2025',
    name: 'NapulETH 2025 Archive',
    tagline: 'Web3 conference archive',
    description:
      'Archive and landing pages for Southern Italy’s biggest Web3 event, aligned with the NapulETH brand and community.',
    categories: ['web', 'web3'],
    tech: [],
    url: 'https://www.napuleth.org/archive/2025',
  },
  {
    slug: 'nifty-naples',
    name: 'Nifty Naples',
    tagline: 'Phygital NFT & cultural experience',
    description:
      'Site blending Naples-inspired physical design and NFTs, focused on onboarding non-crypto users with clear storytelling.',
    categories: ['web3', 'web'],
    tech: [],
    url: 'https://www.niftynaples.it/',
  },
  {
    slug: 'mood-global-services',
    name: 'Mood Global Services',
    tagline: 'Blockchain consulting corporate site',
    description:
      'Corporate site for a blockchain solutions provider, presenting services, case studies and technical capabilities.',
    categories: ['web'],
    tech: [],
    url: 'https://moodglobalservices.com/',
  },
  {
    slug: 'axiam-capital',
    name: 'Axiam Capital Group',
    tagline: 'Crypto arbitrage & analytics',
    description:
      'Product and marketing site for a crypto arbitrage platform with live market data and analytics dashboards.',
    categories: ['web3', 'web'],
    tech: [],
    url: 'https://axiamcapitalgroup.xyz/',
  },
  {
    slug: 'artrise',
    name: 'Artrise Marketplace',
    tagline: 'NFT marketplace (solo full-stack)',
    description:
      'Designed and implemented a marketplace for artists with smart contracts featuring gasless minting, meta-transactions and NFT auctions.',
    categories: ['web3'],
    tech: ['Firebase (Firestore, Realtime DB, Storage)', 'Smart contracts'],
    solo: true,
  },
  {
    slug: 'urano-dapp',
    name: 'Urano dApp',
    tagline: 'Tokenized RWA ecosystem dApp',
    description:
      'Full Web3 application with 11 smart contracts on Ethereum Sepolia: ERC-20 token with staking & veToken governance, uShare fractional RWA marketplace, KYC/AML via Persona, vesting, presale, and an AI assistant.',
    categories: ['web3', 'ai'],
    tech: [
      'React',
      'Vite',
      'Thirdweb SDK',
      'Viem',
      'TanStack Query',
      'Tailwind CSS',
      'Vercel serverless',
      'Supabase',
    ],
  },
  {
    slug: 'connections-ai',
    name: 'Connections-AI',
    tagline: 'Social event discovery & ticketing mobile app',
    description:
      'Full-stack app (50 screens) for discovering nearby events on a map, purchasing tickets, and creating/managing events as a creator. QR check-in, email invitations, email OTP & social sign-in, and i18n (EN/IT).',
    categories: ['mobile'],
    tech: [
      'React Native',
      'Expo',
      'Stripe',
      'Resend',
      'Firebase Realtime Database',
      'Better Auth',
    ],
  },
  {
    slug: 'sitelab',
    name: 'SiteLab',
    tagline: 'AI-powered website generation platform',
    description:
      'pnpm monorepo with two Next.js 16 apps (client questionnaire + admin backoffice) and three shared packages. Multi-provider AI orchestration with RAG pipelines, multi-tenant architecture, 26 database tables, and real-time generation monitoring.',
    categories: ['ai', 'web'],
    tech: [
      'Next.js 16',
      'TypeScript',
      'Vercel AI Gateway',
      'V0 SDK',
      'Supabase PostgreSQL',
      'pgvector',
      'Radix UI',
      'shadcn/ui',
      'Tailwind CSS',
    ],
  },
  {
    slug: 'silicon-plan',
    name: 'Silicon Plan',
    tagline: 'AI-powered business planning SaaS',
    description:
      'Business plan editor (25+ components, drag-and-drop), 6 canvas model templates, pitch deck builder, financial projections with 6 valuation methods, and a consultant marketplace with video meetings. Multi-format export (PDF, DOCX, PPTX, Excel) and i18n (EN/IT).',
    categories: ['ai', 'web'],
    tech: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'dnd-kit',
      'LiveKit',
      'OpenAI gpt-4o',
      'Clerk',
    ],
  },
];
