export const identity = {
  name: 'Mohamed Ben Moussa',
  role: 'Full-Stack & Web3 Engineer',
  email: 'med.benmoussa.dev@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mohamed-ben-moussa-b60ab498/',
  github: 'https://github.com/MedNewton',
  site: 'themoorish.dev',
  location: 'Morocco',
};

export const marqueeItems = [
  'DEFI',
  'RWA TOKENIZATION',
  'A.I. AGENTS',
  'MCP SERVERS',
  'DAPPS',
  'SMART CONTRACTS',
  'MARKETPLACES',
  'MOBILE',
  'SAAS',
  'CLEAN ARCHITECTURE',
];

export const manifesto =
  'I build modern TypeScript and React applications, Web3 dApps and agentic A.I. systems — products around DeFi, tokenized real-world assets, marketplaces and CRMs — comfortable across frontend, backend, smart contracts and integrations, obsessed with clean architecture, good DX and friction-free UX.';

export interface StackRow {
  label: string;
  items: string[];
}

export const stackRows: StackRow[] = [
  {
    label: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'PHP', 'Rust'],
  },
  {
    label: 'Frontend',
    items: [
      'React',
      'Next.js',
      'Vite',
      'React Three Fiber',
      'MUI',
      'Radix UI',
      'shadcn/ui',
      'Tailwind CSS',
    ],
  },
  {
    label: 'Mobile',
    items: ['React Native', 'Expo', 'NativeWind'],
  },
  {
    label: 'Backend',
    items: ['Node.js', 'Express', 'REST', 'Stripe', 'Clerk', 'Resend'],
  },
  {
    label: 'Web3',
    items: ['Solidity', 'Thirdweb', 'ethers.js', 'Viem', 'Alchemy', 'Ethereum'],
  },
  {
    label: 'Data',
    items: ['PostgreSQL', 'Supabase', 'Firebase', 'pgvector'],
  },
  {
    label: 'A.I.',
    items: ['OpenAI', 'Vercel AI SDK', 'LiveKit', 'MCP', 'RAG'],
  },
];

export interface Work {
  index: string;
  title: string;
  tag: string;
  description: string;
  tech: string;
  link?: string;
}

export const works: Work[] = [
  {
    index: '01',
    title: 'Urano dApp',
    tag: 'Web3 / RWA',
    description:
      'Complete tokenized-RWA ecosystem on Ethereum Sepolia: 11 smart contracts — ERC-20 with staking and veToken governance, uShare fractional RWA marketplace, KYC/AML via Persona, vesting, presale and a built-in A.I. assistant.',
    tech: 'React · Vite · Thirdweb · Viem · TanStack Query · Tailwind · Supabase',
  },
  {
    index: '02',
    title: 'NexLabs',
    tag: 'DeFi',
    description:
      'Frontend and dApp work for on-chain index investing — embedded wallets, index UX and on-chain analytics.',
    tech: 'Next.js · TypeScript · MUI · Web3',
    link: 'https://www.nexlabs.io/',
  },
  {
    index: '03',
    title: 'Modus dApp',
    tag: 'Real Estate',
    description:
      'Public site and dApp UI for tokenized SuperPrime real estate — global investors via stablecoins and card payments.',
    tech: 'Next.js · TypeScript · Web3',
    link: 'https://www.modusdapp.org/',
  },
  {
    index: '04',
    title: 'Urano Presale',
    tag: 'Markets',
    description:
      'Presale flows for the $URANO token: KYC, wallet connection, purchase UX and post-TGE claim experience.',
    tech: 'React · Web3 · KYC',
    link: 'https://www.presale.uranoecosystem.com/',
  },
  {
    index: '05',
    title: 'ctrl/shift 2026',
    tag: 'Events',
    description:
      'Art-directed site for an A.I., Web3 & Quantum summit in Naples — dynamic hero, agenda, tracks, partners, applications.',
    tech: 'Next.js · TypeScript',
    link: 'https://www.ctrlshift.events/',
  },
  {
    index: '06',
    title: 'NapulETH 2025',
    tag: 'Archive',
    description: 'Archive and landing for Southern Italy’s biggest Web3 event.',
    tech: 'Next.js · TypeScript',
    link: 'https://www.napuleth.org/archive/2025',
  },
  {
    index: '07',
    title: 'Nifty Naples',
    tag: 'Culture',
    description:
      'Phygital NFT experience blending Naples-inspired physical design with clear storytelling for non-crypto users.',
    tech: 'React · NFTs',
    link: 'https://www.niftynaples.it/',
  },
  {
    index: '08',
    title: 'Mood Global Services',
    tag: 'Corporate',
    description:
      'Corporate site for a blockchain solutions provider — services, case studies, capabilities.',
    tech: 'React · TypeScript',
    link: 'https://moodglobalservices.com/',
  },
  {
    index: '09',
    title: 'Axiam Capital',
    tag: 'Markets',
    description:
      'Product site for a crypto arbitrage platform with live market data and analytics dashboards.',
    tech: 'React · Live Data',
    link: 'https://axiamcapitalgroup.xyz/',
  },
  {
    index: '10',
    title: 'Artrise',
    tag: 'NFT Marketplace',
    description:
      'Solo full-stack build: marketplace for artists with gasless minting, meta-transactions and NFT auctions.',
    tech: 'Firebase · Smart Contracts',
  },
  {
    index: '11',
    title: 'Connections-AI',
    tag: 'Mobile',
    description:
      '50-screen React Native/Expo app: event discovery on a map, Stripe ticketing, QR check-in, Resend invitations, Better Auth, EN/IT.',
    tech: 'React Native · Expo · Stripe · Firebase',
  },
  {
    index: '12',
    title: 'SiteLab',
    tag: 'A.I. SaaS',
    description:
      'A.I. website-generation platform: pnpm monorepo, two Next.js 16 apps, multi-provider orchestration with RAG, multi-tenant Supabase + pgvector, real-time generation monitoring.',
    tech: 'Next.js 16 · AI Gateway · V0 SDK · pgvector',
  },
  {
    index: '13',
    title: 'Silicon Plan',
    tag: 'A.I. SaaS',
    description:
      'A.I. business-planning platform: drag-and-drop plan editor, 6 canvas templates, financial projections with 6 valuation methods, consultant marketplace with LiveKit video, multi-format export, EN/IT.',
    tech: 'Next.js 15 · React 19 · GPT-4o · Clerk · LiveKit',
  },
];

export const machines = [
  'Design and implementation of A.I. agents and multi-agent systems.',
  'MCP servers and clients — wiring tools, APIs and external systems straight into LLMs.',
  'Multi-provider orchestration with workflows, RAG pipelines and cost analytics.',
  'A.I.-powered SaaS: business-plan generation, website generation, chat assistants.',
  'Agent workflows inside Next.js and Node.js apps — automation, data processing, decision support.',
];
