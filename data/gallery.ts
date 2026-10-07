export type GroupPhoto = {
  fiscalYear: string;
  image: string;
};

// 新しい年度を先頭に追加する
export const groupPhotos: GroupPhoto[] = [
  '2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016',
].map((year) => ({
  fiscalYear: year,
  image: import.meta.env.BASE_URL + `img/${year}-member.jpg`,
}));
