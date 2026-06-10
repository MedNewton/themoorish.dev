export const identity = {
  name: 'Mohamed Ben Moussa',
  role: 'Full-Stack & Web3 Engineer',
  email: 'med.benmoussa.dev@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mohamed-ben-moussa-b60ab498/',
  github: 'https://github.com/MedNewton',
  site: 'themoorish.dev',
};

export const tickerItems = [
  'ENGINEER SHIPS FULL-STACK, WEB3 & A.I. PRODUCTS',
  '11 SMART CONTRACTS DEPLOYED ON SEPOLIA',
  'MCP SERVERS NOW SPEAKING FLUENTLY TO LLMS',
  'DEFI INDICES GO LIVE — CLIENTS REJOICE',
  'TOKENIZED REAL ESTATE OPEN TO THE PUBLIC',
  '50-SCREEN MOBILE APP HITS THE STREETS',
  'BUSINESS PLANS NOW WRITTEN BY MACHINES',
  'CLEAN ARCHITECTURE DECLARED NON-NEGOTIABLE',
];

export interface StackAd {
  title: string;
  note: string;
  items: string[];
  flair?: string;
}

export const stackAds: StackAd[] = [
  {
    title: 'Languages',
    note: 'Spoken daily, no accent',
    items: ['TypeScript', 'JavaScript', 'Python', 'PHP', 'Rust (foundational)'],
    flair: 'FLUENT!',
  },
  {
    title: 'Frontend',
    note: 'Interfaces, hand-set',
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
  {
    title: 'Mobile',
    note: 'Pocket editions available',
    items: ['React Native', 'Expo', 'NativeWind'],
  },
  {
    title: 'Backend & APIs',
    note: 'The engine room',
    items: ['Node.js', 'Express.js', 'REST', 'Stripe', 'Clerk', 'Resend'],
  },
  {
    title: 'Web3 & Blockchain',
    note: 'On-chain since the early days',
    items: ['Thirdweb', 'ethers.js', 'Viem', 'Alchemy', 'Ethereum', 'Solidity'],
    flair: 'ON-CHAIN!',
  },
  {
    title: 'Data & Storage',
    note: 'Filed and indexed',
    items: ['PostgreSQL', 'Supabase', 'Firebase'],
  },
  {
    title: 'A.I. & Agents',
    note: 'The thinking machines desk',
    items: [
      'OpenAI',
      'Vercel AI SDK',
      'LiveKit',
      'MCP servers & clients',
      'RAG pipelines',
    ],
    flair: 'NEW!',
  },
  {
    title: 'Tools & Workflow',
    note: 'The print room',
    items: ['Git', 'GitHub', 'Vercel', 'Notion', 'Trello', 'Slack', 'Discord'],
  },
];

export interface Dispatch {
  no: number;
  kicker: string;
  headline: string;
  dek: string;
  link?: string;
  linkLabel?: string;
}

export const leadDispatch: Dispatch = {
  no: 1,
  kicker: 'The Lead Story · Web3',
  headline: 'Eleven Smart Contracts, One Ecosystem: Urano dApp Ships in Full',
  dek: 'A complete tokenized-RWA platform on Ethereum Sepolia — ERC-20 token with staking and veToken governance, a uShare fractional real-world-asset marketplace, KYC/AML via Persona, vesting, presale, and a built-in A.I. assistant. Set in React, Vite, Thirdweb SDK, Viem, TanStack Query and Tailwind CSS, with Vercel serverless and Supabase running the back office.',
};

export const dispatches: Dispatch[] = [
  {
    no: 2,
    kicker: 'Finance',
    headline: 'Index Funds Go On-Chain as NexLabs Rethinks Asset Management',
    dek: 'Frontend and dApp work in Next.js, TypeScript, MUI and Web3 — index-based investing UX, embedded wallets and on-chain analytics.',
    link: 'https://www.nexlabs.io/',
  },
  {
    no: 3,
    kicker: 'Real Estate',
    headline: 'SuperPrime Property, Now Sold by the Token',
    dek: 'Public site and dApp UI for Modus — global investors reach institutional real estate via stablecoins and card payments.',
    link: 'https://www.modusdapp.org/',
  },
  {
    no: 4,
    kicker: 'Markets',
    headline: '$URANO Presale Opens; Queues Form Around the Block(chain)',
    dek: 'Presale flows for tokenized RWAs: KYC, wallet connection, purchase UX and the post-TGE token claim experience.',
    link: 'https://www.presale.uranoecosystem.com/',
  },
  {
    no: 5,
    kicker: 'Events',
    headline: 'A.I., Web3 & Quantum Summit Descends Upon Naples',
    dek: 'Art-directed conference site for ctrl/shift 2026 — dynamic hero, agenda, tracks, partners and application flows.',
    link: 'https://www.ctrlshift.events/',
  },
  {
    no: 6,
    kicker: 'Archives',
    headline:
      'Southern Italy’s Biggest Web3 Gathering, Preserved for Posterity',
    dek: 'Archive and landing pages for NapulETH 2025, aligned with the brand and its community.',
    link: 'https://www.napuleth.org/archive/2025',
  },
  {
    no: 7,
    kicker: 'Culture',
    headline: 'Phygital! Naples Craftsmanship Meets the NFT',
    dek: 'Nifty Naples blends physical design and NFTs, onboarding non-crypto audiences with clear storytelling.',
    link: 'https://www.niftynaples.it/',
  },
  {
    no: 8,
    kicker: 'Business',
    headline: 'Blockchain Consultancy Opens Its Doors to the World',
    dek: 'Corporate site for Mood Global Services — services, case studies and technical capabilities, in print-quality polish.',
    link: 'https://moodglobalservices.com/',
  },
  {
    no: 9,
    kicker: 'Markets',
    headline: 'Arbitrage Desk Publishes Live Numbers, Dares You to Look',
    dek: 'Product and marketing site for Axiam Capital Group with live market data and analytics dashboards.',
    link: 'https://axiamcapitalgroup.xyz/',
  },
  {
    no: 10,
    kicker: 'Arts · Solo Full-Stack',
    headline:
      'One-Man Newsroom Builds Entire NFT Marketplace; Gas Fees Not Invited',
    dek: 'Artrise: a marketplace for artists on Firebase with smart contracts featuring gasless minting, meta-transactions and NFT auctions.',
  },
  {
    no: 11,
    kicker: 'Mobile',
    headline: 'Fifty Screens and a Map: Event Discovery Goes Mobile',
    dek: 'Connections-AI: React Native/Expo app for finding nearby events, Stripe ticketing, QR check-in, Resend invitations, Better Auth with OTP and social sign-in, in English and Italian.',
  },
  {
    no: 12,
    kicker: 'Technology',
    headline: 'Machines Now Write Websites; Monorepo Holds the Presses',
    dek: 'SiteLab: pnpm monorepo, two Next.js 16 apps and three shared packages. Multi-provider A.I. orchestration with RAG, multi-tenant Supabase + pgvector, 26 tables, real-time generation monitoring.',
  },
  {
    no: 13,
    kicker: 'Business · SaaS',
    headline:
      'Business Plans, Valuations & Pitch Decks — Drafted by Artificial Minds',
    dek: 'Silicon Plan: Next.js 15 + React 19 platform with a 25-component drag-and-drop plan editor, 6 canvas templates, financial projections with 6 valuation methods, LiveKit consultant marketplace, GPT-4o, Clerk auth, and PDF/DOCX/PPTX/Excel export.',
  },
];

export const aiBullets = [
  'Design and implementation of A.I. agents and multi-agent systems.',
  'MCP (Model Context Protocol) servers and clients — wiring tools, APIs and external systems straight into LLMs.',
  'Multi-provider A.I. orchestration with workflows, RAG pipelines and cost analytics.',
  'A.I.-powered SaaS: business-plan generation, website generation, chat assistants.',
  'Agent workflows embedded in Next.js and Node.js apps for automation, data processing and decision support.',
];
