export const siteMeta = {
  siteName: '名古屋大学 片桐・星野研究室',
  shortName: '名古屋大学 片桐・星野研究室',
  description:
    'AI・自動チューニング・数値計算・高性能計算基盤を扱う名古屋大学情報基盤センターの研究室サイト',
  baseUrl: 'https://www.hpc.itc.nagoya-u.ac.jp',
  language: 'ja',
};

export type NavItem = { label: string; labelEn: string; href: string };

export const navigation: NavItem[] = [
  { label: '研究室概要', labelEn: 'About', href: '/about' },
  { label: '研究紹介', labelEn: 'Research', href: '/research' },
  { label: '研究発表', labelEn: 'Publications', href: '/publications' },
  { label: 'プロジェクト', labelEn: 'Projects', href: '/projects' },
  { label: 'メンバー', labelEn: 'Members', href: '/members' },
  { label: 'ニュース', labelEn: 'News', href: '/news' },
  { label: 'アクセス', labelEn: 'Access', href: '/access' },
];

export const externalLinks = [
  { label: '研究室ブログ (Zenn)', href: 'https://zenn.dev/p/katalab' },
  { label: 'GitHub', href: 'https://github.com/Katagiri-Hoshino-Lab' },
  { label: '名古屋大学 情報基盤センター', href: 'https://www.itc.nagoya-u.ac.jp' },
  { label: '名古屋大学', href: 'https://www.nagoya-u.ac.jp' },
];

export const heroContent = {
  eyebrow: '名古屋大学 片桐・星野研究室',
  title: 'AIで切り開く次世代スーパーコンピューティング',
  subtitle:
    '高性能計算（HPC）分野における、生成AIによるコード自動生成、自動チューニング、混合精度計算、大規模シミュレーションを柱に、',
  description:
    '名古屋大学情報基盤センターを拠点として最先端スーパーコンピュータの性能を最大限に引き出す計算科学とコンピュータサイエンスの研究を推進しています。',
  ctas: [
    { label: '研究紹介を見る', href: '/research', variant: 'primary' },
    { label: '論文リストを見る', href: '/publications', variant: 'secondary' },
    { label: 'メンバーを見る', href: '/members', variant: 'ghost' },
  ],
  links: [
    // 実URLが確定したら href を設定する
    // { label: '研究室紹介スライド', href: 'https://www.docswell.com/...' },
    // { label: '研究室ブログ', href: 'https://zenn.dev/...' },
  ] as { label: string; href: string }[],
};

export const homeSections = {
  researchSummaryTitle: '研究領域',
  featuredNewsTitle: '最新情報',
  featuredProjectsTitle: '進行中プロジェクト',
  featuredPublicationsTitle: '代表的な論文・発表',
  membersPreviewTitle: '研究室メンバー',
  accessTitle: 'アクセス',
};

export const aboutContent = {
  intro:
    '名古屋大学 情報基盤センターに所属する片桐・星野研究室では、高性能計算（HPC）、人工知能（AI）、数値計算、自動チューニングを柱とした研究を推進しています。最先端のスーパーコンピュータを活用し、計算科学とコンピュータサイエンスの両面から、次世代の計算基盤技術の開発に取り組んでいます。',
  affiliation:
    '名古屋大学 情報基盤センターは、スーパーコンピュータ「不老」をはじめとする大規模計算基盤を運用しており、当研究室はその中核的な研究部門として、学内外の研究者との共同研究や産学連携を積極的に推進しています。また、名古屋大学 大学院情報学研究科に協力講座として参画し、大学院生の教育・研究指導を行っています。',
  recruitment:
    'HPC・AI・数値計算に興味を持つ学生を広く募集しています。学部生の卒業研究、大学院生（修士・博士）の受け入れを行っており、海外からの研究者・留学生も随時受け入れています。見学や研究相談はお気軽にお問い合わせください。',
  contactMemberId: 'katagiri-takahiro',
};
