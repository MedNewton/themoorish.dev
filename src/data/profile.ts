export const profile = {
  name: 'Mohamed Ben Moussa',
  alias: 'themoorish.dev',
  role: 'Full-Stack & Web3 Engineer',
  tagline: 'I build DeFi, RWA & AI-agent products with obsessive attention to UX.',
  email: 'med.benmoussa.dev@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mohamed-ben-moussa-b60ab498/',
  github: 'https://github.com/MedNewton',
  about: [
    'Full-stack developer focused on modern TypeScript/React apps, Web3 dApps, and agentic AI systems.',
    'I build products around DeFi, tokenization, RWAs, marketplaces and CRMs — comfortable across frontend, backend, smart contracts, and integrations.',
    'Obsessed with clean architecture, good DX, and smooth UX. Fast, clear, no friction.',
  ],
} as const;

export type SkillRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface SkillItem {
  name: string;
  icon: string;
  rarity: SkillRarity;
}

export interface SkillGroup {
  label: string;
  items: SkillItem[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: 'Languages',
    items: [
      { name: 'TypeScript', icon: 'TS', rarity: 'legendary' },
      { name: 'JavaScript', icon: 'JS', rarity: 'epic' },
      { name: 'Python', icon: 'PY', rarity: 'rare' },
      { name: 'PHP', icon: 'PHP', rarity: 'common' },
      { name: 'Rust', icon: 'RS', rarity: 'common' },
      { name: 'Solidity', icon: 'SOL', rarity: 'epic' },
    ],
  },
  {
    label: 'Frontend',
    items: [
      { name: 'React', icon: '⚛', rarity: 'legendary' },
      { name: 'Next.js', icon: 'N', rarity: 'legendary' },
      { name: 'Vite', icon: '⚡', rarity: 'epic' },
      { name: 'React Three Fiber', icon: 'R3F', rarity: 'rare' },
      { name: 'Tailwind CSS', icon: 'TW', rarity: 'epic' },
      { name: 'Radix / shadcn', icon: 'UI', rarity: 'epic' },
      { name: 'MUI', icon: 'M', rarity: 'rare' },
    ],
  },
  {
    label: 'Mobile',
    items: [
      { name: 'React Native', icon: 'RN', rarity: 'epic' },
      { name: 'Expo', icon: 'EX', rarity: 'epic' },
      { name: 'NativeWind', icon: 'NW', rarity: 'rare' },
    ],
  },
  {
    label: 'Backend & APIs',
    items: [
      { name: 'Node.js', icon: 'NJ', rarity: 'epic' },
      { name: 'Express', icon: 'EXP', rarity: 'rare' },
      { name: 'Stripe', icon: '$', rarity: 'rare' },
      { name: 'Clerk', icon: 'CL', rarity: 'rare' },
      { name: 'Resend', icon: '✉', rarity: 'common' },
    ],
  },
  {
    label: 'Web3',
    items: [
      { name: 'Thirdweb', icon: '3W', rarity: 'epic' },
      { name: 'ethers.js', icon: 'ETH', rarity: 'epic' },
      { name: 'Viem', icon: 'V', rarity: 'epic' },
      { name: 'Alchemy', icon: 'AL', rarity: 'rare' },
    ],
  },
  {
    label: 'Data',
    items: [
      { name: 'PostgreSQL', icon: 'PG', rarity: 'epic' },
      { name: 'Supabase', icon: 'SB', rarity: 'epic' },
      { name: 'Firebase', icon: 'FB', rarity: 'rare' },
      { name: 'pgvector', icon: 'VEC', rarity: 'rare' },
    ],
  },
  {
    label: 'AI & Agents',
    items: [
      { name: 'AI Agents', icon: 'AGT', rarity: 'legendary' },
      { name: 'MCP Servers', icon: 'MCP', rarity: 'legendary' },
      { name: 'Vercel AI SDK', icon: 'AI', rarity: 'epic' },
      { name: 'OpenAI', icon: 'OAI', rarity: 'epic' },
      { name: 'RAG Pipelines', icon: 'RAG', rarity: 'epic' },
      { name: 'LiveKit', icon: 'LK', rarity: 'rare' },
    ],
  },
];

export interface Project {
  title: string;
  kind: string;
  description: string;
  stack: string[];
  url?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    title: 'Urano dApp',
    kind: 'Tokenized RWA ecosystem',
    description:
      'Full Web3 application with 11 smart contracts: ERC-20 staking & veToken governance, fractional RWA marketplace, KYC/AML, vesting, presale, and an AI assistant.',
    stack: ['React', 'Vite', 'Thirdweb', 'Viem', 'Supabase'],
    featured: true,
  },
  {
    title: 'NexLabs',
    kind: 'DeFi indices & RWA asset management',
    description:
      'Frontend and dApp work focused on index-based investing UX, embedded wallets and on-chain analytics.',
    stack: ['Next.js', 'TypeScript', 'MUI', 'Web3'],
    url: 'https://www.nexlabs.io/',
    featured: true,
  },
  {
    title: 'SiteLab',
    kind: 'AI-powered website generation',
    description:
      'pnpm monorepo with two Next.js 16 apps, multi-provider AI orchestration with RAG pipelines, multi-tenant architecture, and real-time generation monitoring.',
    stack: ['Next.js 16', 'AI Gateway', 'V0 SDK', 'pgvector'],
    featured: true,
  },
  {
    title: 'Silicon Plan',
    kind: 'AI business planning SaaS',
    description:
      'Business plan editor with 25+ components, pitch deck builder, financial projections with 6 valuation methods, and a consultant marketplace with video meetings.',
    stack: ['Next.js 15', 'React 19', 'OpenAI', 'LiveKit'],
    featured: true,
  },
  {
    title: 'Connections-AI',
    kind: 'Event discovery & ticketing app',
    description:
      'Full-stack mobile app (50 screens) for discovering nearby events on a map, buying tickets via Stripe, QR check-in, and creator event management.',
    stack: ['React Native', 'Expo', 'Stripe', 'Firebase'],
    featured: true,
  },
  {
    title: 'ctrl/shift 2026',
    kind: 'AI, Web3 & Quantum summit',
    description:
      'Art-directed conference website with dynamic hero, agenda, tracks, partners and application flows for a large-scale tech summit in Naples.',
    stack: ['Next.js', 'TypeScript', 'Motion'],
    url: 'https://www.ctrlshift.events/',
    featured: true,
  },
  {
    title: 'Modus dApp',
    kind: 'Tokenized SuperPrime real-estate',
    description:
      'Public site and dApp UI for global investors accessing institutional real-estate via stablecoins and card payments.',
    stack: ['Next.js', 'Web3'],
    url: 'https://www.modusdapp.org/',
    featured: false,
  },
  {
    title: 'Urano Presale',
    kind: '$URANO token presale',
    description:
      'Presale flows around tokenized RWAs: KYC, wallet connection, purchase UX and post-TGE token claim experience.',
    stack: ['React', 'Web3'],
    url: 'https://www.presale.uranoecosystem.com/',
    featured: false,
  },
  {
    title: 'Artrise Marketplace',
    kind: 'NFT marketplace — solo full-stack',
    description:
      'Marketplace for artists with gasless minting, meta-transactions and NFT auctions.',
    stack: ['Firebase', 'Solidity'],
    featured: false,
  },
  {
    title: 'NapulETH 2025',
    kind: 'Web3 conference archive',
    description: "Archive site for Southern Italy's biggest Web3 event.",
    stack: ['Next.js'],
    url: 'https://www.napuleth.org/archive/2025',
    featured: false,
  },
  {
    title: 'Nifty Naples',
    kind: 'Phygital NFT experience',
    description:
      'Blends Naples-inspired physical design and NFTs, onboarding non-crypto users with clear storytelling.',
    stack: ['Next.js', 'NFTs'],
    url: 'https://www.niftynaples.it/',
    featured: false,
  },
  {
    title: 'Mood Global Services',
    kind: 'Blockchain consulting site',
    description:
      'Corporate site presenting services, case studies and technical capabilities.',
    stack: ['Next.js'],
    url: 'https://moodglobalservices.com/',
    featured: false,
  },
  {
    title: 'Axiam Capital Group',
    kind: 'Crypto arbitrage & analytics',
    description:
      'Product site for a crypto arbitrage platform with live market data and analytics dashboards.',
    stack: ['React', 'Charts'],
    url: 'https://axiamcapitalgroup.xyz/',
    featured: false,
  },
];

export const aiCapabilities = [
  {
    cmd: 'agents.design()',
    text: 'Design and implementation of AI agents and multi-agent systems',
  },
  {
    cmd: 'mcp.connect()',
    text: 'MCP servers & clients connecting tools, APIs and external systems to LLMs',
  },
  {
    cmd: 'orchestrate.multi()',
    text: 'Multi-provider AI orchestration with workflows, RAG pipelines, and cost analytics',
  },
  {
    cmd: 'saas.ship()',
    text: 'AI-powered SaaS — business plan generation, website generation, chat assistants',
  },
  {
    cmd: 'workflows.embed()',
    text: 'Agent workflows inside Next.js & Node apps for automation and decision support',
  },
] as const;
