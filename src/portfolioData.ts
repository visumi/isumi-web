const ISUMI_GLYPH = String.fromCharCode(0x6cc9);

const aboutMenuItems = ['About me', 'Career', 'Perspective'];

const aboutImages = [
  {
    id: 'archive-20250923',
    img: '/perspective-masonry/IDG_20250923_171346_665-720.jpg',
    height: 390,
    label: 'Perspective archive image 01',
  },
  {
    id: 'archive-20250925',
    img: '/perspective-masonry/IDG_20250925_133840_400-720.jpg',
    height: 430,
    label: 'Perspective archive image 02',
  },
  {
    id: 'archive-20250927',
    img: '/perspective-masonry/IDG_20250927_083420_199-720.jpg',
    height: 350,
    label: 'Perspective archive image 03',
  },
  {
    id: 'archive-20251108',
    img: '/perspective-masonry/IDG_20251108_211401_617-720.jpg',
    height: 410,
    label: 'Perspective archive image 04',
  },
  {
    id: 'archive-20251125',
    img: '/perspective-masonry/IDG_20251125_121707_918-720.jpg',
    height: 360,
    label: 'Perspective archive image 05',
  },
  {
    id: 'archive-20260501',
    img: '/perspective-masonry/IDG_20260501_104124_485-720.jpg',
    height: 440,
    label: 'Perspective archive image 06',
  },
  {
    id: 'archive-20260502',
    img: '/perspective-masonry/IDG_20260502_133734_731-720.jpg',
    height: 370,
    label: 'Perspective archive image 07',
  },
  {
    id: 'archive-20260504-111649',
    img: '/perspective-masonry/IDG_20260504_111649_506-720.jpg',
    height: 420,
    label: 'Perspective archive image 08',
  },
  {
    id: 'archive-20260504-142011',
    img: '/perspective-masonry/IDG_20260504_142011_466-720.jpg',
    height: 340,
    label: 'Perspective archive image 09',
  },
  {
    id: 'archive-20260505',
    img: '/perspective-masonry/IDG_20260505_101859_504-720.jpg',
    height: 430,
    label: 'Perspective archive image 10',
  },
  {
    id: 'archive-20260507',
    img: '/perspective-masonry/IDG_20260507_122728_867-720.jpg',
    height: 380,
    label: 'Perspective archive image 11',
  },
  {
    id: 'archive-img-4611',
    img: '/perspective-masonry/IMG_4611-720.jpg',
    height: 450,
    label: 'Perspective archive image 12',
  },
];

const aboutPanels = [
  {
    id: 'about',
    eyebrow: 'ABOUT ME',
    title: 'I build interfaces that matter.',
    paragraphs: [
      'I’m Vinicius Isumi, a Frontend Engineer with over 5 years of experience building digital products for major companies in the Brazilian financial sector.',
      'My experience ranges from creating robust systems from scratch to supporting large-scale migrations and building modern design systems with scalable, reusable components. I care about clean interfaces, consistent user experiences, and solutions that are both technically solid and valuable to the product.',
      'I’m communicative, collaborative, and naturally driven to solve problems — whether they are directly within my scope or part of a broader challenge. I like to understand the context behind what I’m building, contribute with ideas, and help teams create better experiences through technology.',
    ],
    visual: 'portrait',
  },
  {
    id: 'career',
    eyebrow: 'CAREER',
    title: 'Path',
    paragraphs: [
      'Bringing technology together with creativity, culture, and human experiences is what keeps me motivated to keep learning, creating, and evolving.',
      'As an Artificial Intelligence enthusiast, I am especially interested in how emerging technologies can expand creativity, enhance digital experiences, and help shape more meaningful products.',
    ],
    visual: 'career',
  },
  {
    id: 'perspective',
    eyebrow: 'PERSPECTIVE',
    title: 'Creating, collecting, connecting.',
    paragraphs: [
      'I have always been passionate about creating and connecting art, communication, and ideas. Through traveling, photography, and the people I meet along the way, I constantly find new perspectives and inspiration.',
      'I keep a mental archive of places, conversations, textures, moods, and visual details that eventually find their way into how I think and make things.',
    ],
    visual: 'masonry',
  },
] as const;

const careerTimeline = [
  {
    company: 'PicPay',
    period: 'APR 2024 — NOW',
    role: 'Engineer Frontend Senior',
    detail: 'Building financial product experiences with React and Next.js, balancing dense workflows with interfaces that stay clear at speed.',
  },
  {
    company: 'Banco Original',
    period: 'DEC 2021 — MAY 2024',
    role: 'Analista de Sistemas Pleno',
    detail: 'Developed Angular applications and design-system foundations that brought consistency to complex banking journeys.',
  },
  {
    company: 'Enforce',
    period: 'SEP 2020 — DEC 2021',
    role: 'Desenvolvedor web front-end',
    detail: 'Created product interfaces in Angular, translating operational requirements into responsive tools for everyday decisions.',
  },
  {
    company: 'LARCOM / UNICAMP',
    period: 'MAR 2020 — SEP 2020',
    role: 'Desenvolvedor Netsuite',
    detail: 'Supported NetSuite development with JavaScript and TypeScript, connecting academic research needs to practical systems.',
  },
] as const;

const careerProjects = [
  {
    title: 'Financial journeys at scale',
    description: 'Responsive product flows designed for high-frequency financial decisions, with clarity kept intact across dense interfaces.',
    meta: 'React · Next.js · Product design',
  },
  {
    title: 'Design system foundations',
    description: 'A reusable interface language that made complex banking experiences more consistent, faster to build, and easier to evolve.',
    meta: 'Angular · Components · Tokens',
  },
  {
    title: 'Operational dashboards',
    description: 'Decision tools that turn layered operational data into a focused interface for the people who act on it every day.',
    meta: 'Frontend architecture · UX',
  },
  {
    title: 'Platform migrations',
    description: 'Migration work planned around continuity: modernizing UI foundations while protecting the workflows users already depend on.',
    meta: 'Systems · Performance · Delivery',
  },
  {
    title: 'Creative product prototypes',
    description: 'Interactive studies that use motion and code as a way to test ideas, explain systems, and make digital products memorable.',
    meta: 'Creative code · Motion · WebGL',
  },
] as const;

const SECTION_COUNT = 5;
const ABOUT_SECTION_INDEX = 1;
const CONTACT_SECTION_INDEX = 4;

const projects = [
  {
    title: 'Operational interface',
    description: 'Dense, responsive dashboards for real decision workflows.',
    meta: 'Product / Frontend',
  },
  {
    title: 'Interactive experience',
    description: 'Prototypes with motion, micro-interactions, and visual narrative.',
    meta: 'Creative Code',
  },
  {
    title: 'Web architecture',
    description: 'Full-stack apps with clear contracts between UI, API, and state.',
    meta: 'Systems',
  },
];

const principles = [
  'Interfaces that feel like tools, not templates.',
  'Motion as language, not decoration.',
  'Visual detail without sacrificing legibility.',
  'Code simple enough to keep evolving.',
];

export {
  ABOUT_SECTION_INDEX,
  CONTACT_SECTION_INDEX,
  ISUMI_GLYPH,
  SECTION_COUNT,
  aboutImages,
  aboutMenuItems,
  aboutPanels,
  careerProjects,
  careerTimeline,
  principles,
  projects,
};
