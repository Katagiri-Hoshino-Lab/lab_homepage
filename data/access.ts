export const accessInfo = {
  organization: '名古屋大学 情報基盤センター 大規模計算支援環境研究部門',
  labName: '片桐・星野研究室',
  address: '〒464-8601 愛知県名古屋市千種区不老町 名古屋大学 情報基盤センター',
  floor: '5階',
  buildingUrl: 'https://www.icts.nagoya-u.ac.jp',
  buildingImage: import.meta.env.BASE_URL + 'img/building.jpg',
  station: '名古屋大学駅',
  stationLine: '名古屋市営地下鉄 名城線',
  routes: [
    {
      from: 'セントレア（中部国際空港）',
      description:
        '名鉄 中部国際空港駅 → 約30分 → 金山駅で乗換 → 名古屋市営地下鉄 名城線（左回り）約21分 → 名古屋大学駅',
    },
    {
      from: '名古屋駅',
      description:
        '名古屋市営地下鉄 東山線（藤が丘行き）約15分 → 本山駅で乗換 → 名城線（右回り）約2分 → 名古屋大学駅',
    },
  ],
  mapEmbedQuery: '名古屋大学 情報基盤センター',
};
