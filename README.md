# 片桐・星野研究室 Web サイト

名古屋大学 情報基盤センター 片桐・星野研究室のホームページです。React + TypeScript + Vite + Tailwind CSS で構築し、GitHub Pages で公開します。

## 論文・発表・ニュースの更新

**Issues → New issue → 「論文・発表を追加」/「ニュースを追加」** に入力するだけで、更新用の PR が自動で作られます。DOI・arXiv・BibTeX を貼れば、タイトルや著者は自動で取得されます。詳しくは [docs/UPDATING.md](docs/UPDATING.md) を参照してください。

## 開発

```sh
npm install
npm run dev       # 開発サーバ
npm run build     # 本番ビルド（dist/）
npm run preview   # ビルド結果の確認
npm run validate  # content/ のデータチェック
npm run add -- <DOI | arXiv | BibTeX ファイル>  # 論文・発表を追加
```

## 自動化（GitHub Actions）

| ワークフロー | 動作 |
| --- | --- |
| `content-from-issue.yml` | Issue フォームの内容から `content/` の YAML を作り、PR を作成・更新する |
| `ci.yml` | PR ごとにデータの検証とビルドを行う |
| `deploy.yml` | `main` への push でビルドし、GitHub Pages にデプロイする |

## 構成

```
content/publications/<年>/<ID>.yaml  論文・発表（1件1ファイル）
content/news/<年>/<ID>.yaml          ニュース（1件1ファイル）
data/                 メンバー・研究テーマ・プロジェクトなど、その他の表示データ
public/img/           画像
scripts/              データの追加・検証スクリプト
src/components/       共通コンポーネント
src/pages/            各ページ
.github/              Issue フォームとワークフロー
docs/UPDATING.md      更新方法
features/, 要件定義書.md  要件書
```

| 内容 | ファイル |
| --- | --- |
| サイト共通設定・トップ文言・研究室概要 | `data/site.ts` |
| 研究テーマ | `data/research.ts` |
| メンバー・卒業生 | `data/members.ts` |
| プロジェクト | `data/projects.ts` |
| トップのハイライトカード | `data/highlights.ts` |
| 集合写真 | `data/gallery.ts` |
| アクセス | `data/access.ts` |
