// Design-agnostic source of truth for the site's content.
// Mirrors resume.md. Projects live in ./projects.ts.

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

export interface Role {
  company: string;
  title: string;
  period: string;
}

export const experience: Role[] = [
  {
    company: 'Moods',
    title: 'Senior Full-Stack Developer',
    period: 'Aug 2023 – Present',
  },
  {
    company: 'Artrise',
    title: 'Full-Stack Developer',
    period: '2022',
  },
];
