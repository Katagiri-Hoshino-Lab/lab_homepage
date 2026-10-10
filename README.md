# 片桐・星野研究室 Web サイト

名古屋大学 情報基盤センター 片桐・星野研究室のホームページです。
**通常の HTML と CSS だけ**で構築しています。JavaScript、React、Node.js、npm、ビルドツール、外部ライブラリは不要です。

## 構成

| ファイル | 内容 |
| --- | --- |
| `index.html` | トップ（タイトル、紹介リンク、最新ニュース5件） |
| `about.html` | 研究室概要・学生募集 |
| `research.html` | 研究紹介 |
| `publications.html` | 年別の論文・発表一覧 |
| `projects.html` | 研究プロジェクト |
| `members.html` | メンバー・卒業生・集合写真 |
| `news.html` | 年別ニュース一覧 |
| `access.html` | アクセス |
| `404.html` | ページが見つからない場合の案内 |
| `style.css` | 全ページ共通のデザイン・スマートフォン対応 |
| `img/` | 画像 |
| `favicon.svg` | サイトアイコン |
| `.github/workflows/deploy.yml` | GitHub Pages への公開設定 |

## 確認する

`index.html` をブラウザーで開けば確認できます。インストールやビルドは必要ありません。

ローカルサーバーを使う場合は、Python がある環境で次のコマンドも使えます。Python はサイトの動作・編集・公開に必須ではありません。

```sh
python3 -m http.server 8000
```

## 更新・公開する

各 HTML をテキストエディターや GitHub 上で直接編集します。画像は `img/` に追加します。詳しい例は [docs/UPDATING.md](docs/UPDATING.md) を参照してください。

`main` に push すると GitHub Actions が HTML・CSS・画像をそのまま GitHub Pages に公開します。公開時の変換・ビルド処理はありません。

公開先：https://katagiri-hoshino-lab.github.io/lab_homepage/

スマートフォンのメニューは HTML の `details` / `summary` を使います。写真の拡大は画像へのリンク、地図は Google Maps へのリンクです。検索・絞り込みはありません。

## 旧構成からの変更

React・TypeScript・Vite・Tailwind CSS、YAML のデータファイル、Issue フォームから PR を作る仕組みを終了し、HTML の直接編集に一本化しました。旧ソースは Git 履歴に残っています。

ページの URL は `#/members` などから `members.html` などに変更しました。ページ内移動は `members.html#alumni` のような通常のリンクです。

## 掲載内容の参照元

研究室概要・研究テーマ・メンバー・プロジェクト・研究発表は https://www.hpc.itc.nagoya-u.ac.jp/ の掲載内容を基にしています。研究室概要にアクセス案内も掲載し、独立したアクセスページにも同じ案内を記載しています。参照サイトの JavaScript のタブ・絞り込みは使わず、通常のページ内リンクと HTML 標準の開閉で閲覧します。

トップの最新情報は参照サイトと同じ5件を掲載しています。研究室紹介スライドは紹介リンクカードに置き、ニュース一覧には記録を残しています。
