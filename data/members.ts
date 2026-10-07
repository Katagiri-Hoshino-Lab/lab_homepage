export type MemberCategory =
  | 'faculty'
  | 'associate-professor'
  | 'assistant-professor'
  | 'visiting'
  | 'collaborating'
  | 'staff'
  | 'student'
  | 'alumni'
  | 'former-staff';

export type Member = {
  id: string;
  nameJa: string;
  nameEn: string;
  role: string;
  category: MemberCategory;
  grade?: string;
  emailLocalPart?: string;
  emailDomainRule?: 'student_hpc' | 'staff_cc';
  url?: string;
  image?: string;
  notes?: string;
  featured?: boolean;
};

export const currentMembers: Member[] = [
  {
    id: 'katagiri-takahiro',
    nameJa: '片桐 孝洋',
    nameEn: 'KATAGIRI, Takahiro',
    role: '教授',
    category: 'faculty',
    emailLocalPart: 'katagiri',
    emailDomainRule: 'staff_cc',
    url: 'http://www.abc-lib.org/MyHTML/index-j.html',
    image: import.meta.env.BASE_URL + 'img/m_katagiri.jpg',
    featured: true,
  },
  {
    id: 'hoshino-tetsuya',
    nameJa: '星野 哲也',
    nameEn: 'HOSHINO, Tetsuya',
    role: '准教授',
    category: 'associate-professor',
    emailLocalPart: 'hoshino',
    emailDomainRule: 'staff_cc',
    image: import.meta.env.BASE_URL + 'img/m_hoshino.jpg',
    featured: true,
  },
  {
    id: 'mukunoki-daichi',
    nameJa: '椋木 大地',
    nameEn: 'MUKUNOKI, Daichi',
    role: '助教',
    category: 'assistant-professor',
    emailLocalPart: 'mukunoki',
    emailDomainRule: 'staff_cc',
    url: 'https://mukunoki.github.io',
    image: import.meta.env.BASE_URL + 'img/m_mukunoki.jpg',
    featured: true,
  },
  {
    id: 'ohshima-satoshi',
    nameJa: '大島 聡史',
    nameEn: 'OHSHIMA, Satoshi',
    role: '招へい教員（客員准教授）',
    category: 'visiting',
    emailLocalPart: 'ohshima',
    emailDomainRule: 'staff_cc',
    url: 'https://exth.net',
    image: import.meta.env.BASE_URL + 'img/m_ohshima.jpg',
  },
  {
    id: 'kawai-masatoshi',
    nameJa: '河合 直聡',
    nameEn: 'KAWAI, Masatoshi',
    role: '招へい教員',
    category: 'visiting',
    emailLocalPart: 'kawai',
    emailDomainRule: 'staff_cc',
    image: import.meta.env.BASE_URL + 'img/m_kawai.jpg',
  },
  {
    id: 'okamoto-yuko',
    nameJa: '岡本 祐幸',
    nameEn: 'OKAMOTO, Yuko',
    role: '招へい教員（名誉教授）',
    category: 'collaborating',
    emailLocalPart: 'okamoto',
    emailDomainRule: 'staff_cc',
    url: 'https://yuko-okamoto.github.io/homepage/index.shtml',
    image: import.meta.env.BASE_URL + 'img/m_okamoto.jpg',
  },
  { id: 'akiba-kosuke', nameJa: '秋葉 康佑', nameEn: 'AKIBA, Kosuke', role: 'M2', category: 'student', grade: 'M2', emailLocalPart: 'akiba', emailDomainRule: 'student_hpc', image: import.meta.env.BASE_URL + 'img/m_akiba.jpg' },
  { id: 'hayashi-shunichiro', nameJa: '林 俊一郎', nameEn: 'HAYASHI, Shun-ichiro', role: 'M2', category: 'student', grade: 'M2', emailLocalPart: 'hayashi', emailDomainRule: 'student_hpc', image: import.meta.env.BASE_URL + 'img/m_hayashi.jpg', featured: true },
  { id: 'morita-koki', nameJa: '森田 光貴', nameEn: 'MORITA, Koki', role: 'M2', category: 'student', grade: 'M2', emailLocalPart: 'morita', emailDomainRule: 'student_hpc', image: import.meta.env.BASE_URL + 'img/m_morita.jpg' },
  { id: 'natsume-koki', nameJa: '棗 恒輝', nameEn: 'NATSUME, Koki', role: 'M2', category: 'student', grade: 'M2', emailLocalPart: 'natsume', emailDomainRule: 'student_hpc', image: import.meta.env.BASE_URL + 'img/m_natsume.jpg' },
  { id: 'isobe-koki', nameJa: '磯部 晃輝', nameEn: 'ISOBE, Koki', role: 'M1', category: 'student', grade: 'M1', emailLocalPart: 'isobe', emailDomainRule: 'student_hpc', image: import.meta.env.BASE_URL + 'img/m_isobe.jpg' },
  { id: 'kotama-takanori', nameJa: '樹神 宇徳', nameEn: 'KOTAMA, Takanori', role: 'M1', category: 'student', grade: 'M1', emailLocalPart: 'kotama', emailDomainRule: 'student_hpc', image: import.meta.env.BASE_URL + 'img/m_kotama.jpg', featured: true },
  { id: 'sakaguchi-shugo', nameJa: '阪口 修吾', nameEn: 'SAKAGUCHI, Shugo', role: 'M1', category: 'student', grade: 'M1', emailLocalPart: 'sakaguchi', emailDomainRule: 'student_hpc', image: import.meta.env.BASE_URL + 'img/m_sakaguchi.jpg' },
  { id: 'uchida-keita', nameJa: '内田 啓太', nameEn: 'UCHIDA, Keita', role: 'B4', category: 'student', grade: 'B4', emailLocalPart: 'uchida', emailDomainRule: 'student_hpc', image: import.meta.env.BASE_URL + 'img/m_uchida.jpg' },
  { id: 'aoki-mikoto', nameJa: '青木 尊', nameEn: 'AOKI, Mikoto', role: 'B4', category: 'student', grade: 'B4', emailLocalPart: 'aoki', emailDomainRule: 'student_hpc' },
  { id: 'oki-kosuke', nameJa: '沖 厚佑', nameEn: 'OKI, Kosuke', role: 'B4', category: 'student', grade: 'B4', emailLocalPart: 'oki', emailDomainRule: 'student_hpc' },
  { id: 'nakatani-yusuke', nameJa: '中谷 祐亮', nameEn: 'NAKATANI, Yusuke', role: 'B4', category: 'student', grade: 'B4', emailLocalPart: 'nakatani', emailDomainRule: 'student_hpc' },
  { id: 'hisada-ryosei', nameJa: '久田 凌生', nameEn: 'HISADA, Ryosei', role: 'B4', category: 'student', grade: 'B4', emailLocalPart: 'hisada', emailDomainRule: 'student_hpc' },
  { id: 'hirakawa-daichi', nameJa: '平川 大地', nameEn: 'HIRAKAWA, Daichi', role: 'B4', category: 'student', grade: 'B4', emailLocalPart: 'hirakawa', emailDomainRule: 'student_hpc' },
];

export const emailDomainRules = {
  student_hpc: '@hpc.itc.nagoya-u.ac.jp',
  staff_cc: '@cc.nagoya-u.ac.jp',
};

export type AlumniYearGroup = {
  fiscalYear: string;
  members: { role: string; nameJa: string }[];
};

export const alumniGroups: AlumniYearGroup[] = [
  { fiscalYear: '2016', members: [{ role: 'M2', nameJa: '野村 拓矢' }, { role: 'B4', nameJa: '木村 海斗' }] },
  { fiscalYear: '2017', members: [{ role: 'M2', nameJa: '池田 朋哉' }, { role: 'M2', nameJa: '市村 駿太郎' }, { role: 'M2', nameJa: '岩間 拓也' }] },
  { fiscalYear: '2018', members: [{ role: 'M2', nameJa: '関谷 和明' }, { role: 'M2', nameJa: '藤川 隼人' }, { role: 'M2', nameJa: '山田 賢也' }] },
  { fiscalYear: '2019', members: [{ role: 'D3', nameJa: '桝井 晃基' }, { role: 'M2', nameJa: '石黒 史也' }, { role: 'M2', nameJa: '櫻井 刀麻' }, { role: 'M2', nameJa: '中島 大地' }, { role: 'M2', nameJa: '長谷川 颯' }] },
  { fiscalYear: '2020', members: [{ role: 'M2', nameJa: '刘 博文' }, { role: 'M2', nameJa: '北井 成哉' }, { role: 'M2', nameJa: '北澤 修太' }, { role: 'M2', nameJa: '山本 遼人' }] },
  { fiscalYear: '2021', members: [{ role: 'M2', nameJa: '杉浦 拓未' }, { role: 'M2', nameJa: '山梨 祥平' }, { role: 'B4', nameJa: '鵜野 圭介' }] },
  { fiscalYear: '2022', members: [{ role: 'M2', nameJa: '青木 将太' }, { role: 'M2', nameJa: '枦木 慎也' }, { role: 'M2', nameJa: '定方 翼' }, { role: 'M2', nameJa: '桑村 佳佑' }, { role: 'B4', nameJa: '青山 柊惟' }, { role: 'B4', nameJa: '梛尾 駿太' }, { role: '研究生', nameJa: '曹 亦東' }] },
  { fiscalYear: '2023', members: [{ role: 'M2', nameJa: '福原 諒河' }, { role: 'M2', nameJa: '満田 晴紀' }] },
  { fiscalYear: '2024', members: [{ role: 'D3', nameJa: '森下 誠' }, { role: 'M2', nameJa: '羽生 達郎' }, { role: 'M2', nameJa: '湯淺 義尚' }, { role: 'M2', nameJa: '水島 慎吾' }, { role: 'M2', nameJa: '植野 貴大' }] },
  { fiscalYear: '2025', members: [{ role: 'D3', nameJa: '任 軒正博' }, { role: 'M2', nameJa: '樫村 寛大' }, { role: 'M2', nameJa: '水木 直也' }, { role: 'M2', nameJa: '百武 尚輝' }, { role: 'M2', nameJa: '中谷 崇真' }, { role: 'B4', nameJa: '三笠 諒' }, { role: 'B4', nameJa: '末永 和也' }] },
];

export const alumniCareerSummary = {
  companies: [
    '株式会社オービック',
    '株式会社イーゼ',
    '株式会社Cygames',
    '日本アイ・ビー・エム システムズ・エンジニアリング株式会社',
    '日本電気株式会社',
    '株式会社エイエイエスティ',
    '三菱電機メカトロニクスソフトウェア株式会社',
    'NTT研究所',
    'NTTコミュニケーションズ株式会社',
    'EIZO株式会社',
    'TISシステムサービス株式会社',
    'デンソーテクノ株式会社',
    'NTTコムウェア株式会社',
    '西日本電信電話',
    '伊藤忠テクノソリューションズ株式会社',
    '株式会社日立製作所',
    '株式会社エィ・ダブリュ・エンジニアリング',
    '上海米哈游網絡科技股份有限公司（株式会社miHoYo）',
    '三菱電機株式会社',
    'ブラザー工業株式会社',
    '富士通株式会社',
    '株式会社野村総合研究所',
    '野村證券株式会社',
    'キオクシア株式会社',
    '有限会社 来栖川電算',
    '兼房株式会社',
    'SBS情報システム',
  ],
  universities: ['大阪大学', '東京大学'],
  graduateSchools: [
    '名古屋大学大学院情報学研究科 博士課程前期課程',
    '名古屋大学大学院情報学研究科 博士課程後期課程',
    '東京大学大学院工学系研究科・電気系工学専攻',
  ],
};

export const formerStaff = [
  {
    role: 'JST ACT-I専任研究者',
    nameJa: '劉 麗君',
    nameEn: 'LIU, Lijun',
    note: '2018年7月1日付 大阪大学大学院工学研究科機械工学専攻へ',
  },
  {
    role: '准教授',
    nameJa: '荻野 正雄',
    nameEn: 'OGINO, Masao',
    note: '2019年4月1日付 大同大学情報学部情報システム学科へ',
  },
  {
    role: '日本学術振興会特別研究員-PD',
    nameJa: '桝井 晃基',
    nameEn: 'MASUI, Koki',
    note: '2020年10月1日付 大阪大学大学院情報科学研究科 助教へ',
  },
  {
    role: '名古屋大学価値創造研究センター外国人客員教員・特任教授',
    nameJa: 'Osni Marques',
    nameEn: 'Osni Marques',
    note: '米国ローレンスバークレー国立研究所 計算研究部門（在籍期間: R3.12.02-R4.1.31）',
  },
  {
    role: '准教授',
    nameJa: '大島 聡史',
    nameEn: 'OHSHIMA, Satoshi',
    note: '2022年10月1日付 九州大学情報基盤研究開発センターへ',
  },
  {
    role: '特任助教',
    nameJa: '河合 直聡',
    nameEn: 'KAWAI, Masatoshi',
    note: '2025年3月1日付 東北大学サイバーサイエンスセンターへ',
  },
  {
    role: 'D3（博士課程3年）',
    nameJa: '任 軒正博',
    nameEn: 'REN, Xuanzhengbo',
    note: '2026年4月1日付 東京大学情報基盤センターへ',
  },
];
