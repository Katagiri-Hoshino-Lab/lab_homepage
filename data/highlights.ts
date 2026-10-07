export type Highlight = {
  title: string;
  subtitle: string;
  image: string;
  url: string;
};

const img = (name: string) => import.meta.env.BASE_URL + 'img/' + name;

export const highlights: Highlight[] = [
  {
    title: '研究室紹介スライド',
    subtitle: '片桐・星野研究室の研究室紹介',
    image: img('lab2026.png'),
    url: 'https://www.docswell.com/s/meme-dayo/KVMQNL-2026-02-25-123558',
  },
  {
    title: 'VibeCodeHPC',
    subtitle: 'マルチエージェント自動チューニング',
    image: img('vibecodehpc_screenshot.png'),
    url: 'https://github.com/Katagiri-Hoshino-Lab/VibeCodeHPC',
  },
  {
    title: 'ARI',
    subtitle: '自律的科学研究パイプライン',
    image: img('ari_logo.png'),
    url: 'https://github.com/kotama7/ARI',
  },
  {
    title: 'HPC-GENIEプロジェクト',
    subtitle: '生成AIによるHPCコード自動生成',
    image: img('hpc_genie.jpg'),
    url: 'https://www.hpc.itc.nagoya-u.ac.jp/menu/hpc_genie.html',
  },
  {
    title: 'スーパーコンピュータ「不老」',
    subtitle: '2026年10月「不老・弐」稼働',
    image: img('flow2logo.jpg'),
    url: 'https://icts.nagoya-u.ac.jp/ja/center/',
  },
  {
    title: '研究室ブログ',
    subtitle: 'Zenn Publication',
    image: img('blog.png'),
    url: 'https://zenn.dev/p/katalab',
  },
];
