export type Category = 'web3' | 'ai' | 'web' | 'mobile';

export interface Project {
  name: string;
  line: string;
  categories: Category[];
  /** Live site. Omitted for work with no public deployment. */
  url?: string;
  /** Screenshot in /public/shots (without extension). */
  shot?: string;
  /** Card width in the drifting rows, in px. */
  width?: number;
}

export const projects: Project[] = [
  {
    name: 'Urano',
    line: 'Tokenized real-world assets, 11 smart contracts',
    categories: ['web3', 'ai'],
    url: 'https://www.uranoecosystem.com/',
    shot: 'urano',
    width: 340,
  },
  {
    name: 'Silicon Plan',
    line: 'AI business planning SaaS',
    categories: ['ai', 'web'],
    url: 'https://siliconplan.com/',
    shot: 'silicon',
    width: 300,
  },
  {
    name: 'SiteLab',
    line: 'AI website generation platform',
    categories: ['ai', 'web'],
    url: 'https://www.sitelab.build/',
    shot: 'sitelab',
    width: 350,
  },
  {
    name: 'Connections-AI',
    line: 'Event discovery and ticketing app, 50 screens',
    categories: ['mobile'],
    url: 'https://www.connectionsai.site/',
    shot: 'connections',
    width: 250,
  },
  {
    name: 'NexLabs',
    line: 'DeFi indices and RWA asset management',
    categories: ['web3'],
    url: 'https://www.nexlabs.io/',
    shot: 'nexlabs',
    width: 330,
  },
  {
    name: 'Modus',
    line: 'Tokenized SuperPrime real estate',
    categories: ['web3'],
    url: 'https://www.modusdapp.org/',
    shot: 'modus',
    width: 320,
  },
  {
    name: 'Urano Presale',
    line: '$URANO token presale flows',
    categories: ['web3'],
    url: 'https://www.presale.uranoecosystem.com/',
    shot: 'presale',
    width: 340,
  },
  {
    name: 'ctrl/shift 2026',
    line: 'AI, Web3 and Quantum summit in Naples',
    categories: ['web'],
    url: 'https://ctrl-shift-2026.vercel.app/',
    shot: 'ctrlshift',
    width: 330,
  },
  {
    name: 'NapulETH',
    line: 'Web3 conference site',
    categories: ['web', 'web3'],
    url: 'https://napuleth2025-6a26.vercel.app/',
    shot: 'napuleth',
    width: 300,
  },
  {
    name: 'Nifty Naples',
    line: 'Phygital NFT jewellery',
    categories: ['web3', 'web'],
    url: 'https://www.niftynaples.it/',
    shot: 'nifty',
    width: 310,
  },
  {
    name: 'Mood Global Services',
    line: 'Blockchain studio website',
    categories: ['web'],
    url: 'https://moodglobalservices.com/',
    shot: 'moods',
    width: 320,
  },
  {
    name: 'Axiam Capital',
    line: 'Crypto arbitrage and analytics',
    categories: ['web3', 'web'],
    url: 'https://axiamcapitalgroup.xyz/',
    shot: 'axiam',
    width: 320,
  },
  {
    name: 'Coliseum Marketplace',
    line: 'Fractional RWA marketplace',
    categories: ['web3'],
    url: 'https://coliseum-marketplace-live.vercel.app/',
    shot: 'coliseum',
    width: 340,
  },
  {
    name: 'AVA Capital',
    line: 'Marketplace for tokenized assets',
    categories: ['web3'],
    url: 'https://www.avacapitalmarketplace.xyz/',
    shot: 'ava',
    width: 320,
  },
  {
    name: 'Rumoo',
    line: 'Mobile app matching venues with creators',
    categories: ['mobile', 'web'],
    url: 'https://rumoo.app/',
    shot: 'rumoo',
    width: 330,
  },
  {
    name: 'Minerva',
    line: 'B2B matching for Italian SMEs',
    categories: ['web'],
    url: 'https://www.minerva-app.website/',
    shot: 'minerva',
    width: 310,
  },
  {
    name: 'WishinWell',
    line: 'Donations and fundraising, with on-chain contracts',
    categories: ['web3', 'web'],
    url: 'https://www.wishinwell.world/',
    shot: 'wishinwell',
    width: 320,
  },
  {
    name: 'Seena',
    line: 'Wellness and performance community app',
    categories: ['mobile', 'web'],
    url: 'https://www.seenawellness.com/',
    shot: 'seena',
    width: 330,
  },
  {
    name: 'Artrise',
    line: 'NFT marketplace with gasless minting',
    categories: ['web3'],
  },
];

export const countIn = (category: Category) =>
  projects.filter((p) => p.categories.includes(category)).length;

export interface ToolkitRow {
  title: string;
  tools: string;
  category?: Category;
  icon: 'gem' | 'spark' | 'code' | 'phone' | 'db';
}

export const toolkit: ToolkitRow[] = [
  {
    title: 'Web3 & DeFi',
    tools: 'Solidity, Viem, Thirdweb, ethers.js',
    category: 'web3',
    icon: 'gem',
  },
  {
    title: 'AI & agents',
    tools: 'MCP servers, RAG pipelines, AI SDK, OpenAI',
    category: 'ai',
    icon: 'spark',
  },
  {
    title: 'Frontend',
    tools: 'TypeScript, Next.js, React, Tailwind',
    category: 'web',
    icon: 'code',
  },
  {
    title: 'Mobile',
    tools: 'React Native, Expo',
    category: 'mobile',
    icon: 'phone',
  },
  {
    title: 'Data & backend',
    tools: 'PostgreSQL, Supabase, Firebase, Node.js',
    icon: 'db',
  },
];
