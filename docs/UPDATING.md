# サイトの更新方法

HTML を直接編集して更新します。専用ツールやビルドは不要です。GitHub 上の鉛筆アイコンから編集することもできます。

## ニュースを追加する

`news.html` の該当する年の `<div class="news-list">` に、次の例をコピーして追加します。新しいニュースを上に置き、`id` は他のニュースと重ならない英数字にします。

```html
<article class="news-card" id="example-event-2026">
  <div class="news-meta">
    <time datetime="2026-10-11">2026.10.11</time>
    <span class="badge badge-event">イベント</span>
  </div>
  <div class="news-body">
    <div>
      <h3>ニュースのタイトル</h3>
      <p>ニュースの本文です。</p>
    </div>
  </div>
</article>
```

トップにも載せる場合は同じ `<article>` を `index.html` の `<div class="news-list">` にコピーします。トップは新しい5件を残し、古い項目を外します。全件の記録は `news.html` に残します。

カテゴリのクラスは `badge-award`（受賞）、`badge-media`（メディア）、`badge-publication`（発表）、`badge-event`（イベント）、`badge-seminar`（セミナー）、`badge-workshop`（ワークショップ）、`badge-project`（プロジェクト）です。

写真を付ける場合は画像を `img/` に置き、`news-body` の中で本文の `</div>` の後に追加します。

```html
<a class="news-photo" href="img/event-2026.jpg" target="_blank" rel="noopener">
  <img src="img/event-2026.jpg" alt="イベントの集合写真" loading="lazy">
</a>
```

## 論文・発表を追加する

`publications.html` の該当する年の `<section class="year-section">` に追加します。

```html
<article class="publication" id="example-paper-2026">
  <div class="publication-kind"><span>国際会議</span></div>
  <div>
    <h3>論文タイトル</h3>
    <p class="authors">著者1, 著者2</p>
    <p class="venue">会議名・論文誌名, pp. 1–10</p>
    <div class="publication-links">
      <a class="small-link" href="https://doi.org/10.0000/example" target="_blank" rel="noopener noreferrer">DOI</a>
    </div>
  </div>
</article>
```

DOI がない場合はリンクを省略できます。新しい年を作る場合は `<section id="year-2027" class="year-section"><h2>2027年</h2>…</section>` を追加し、ページ上部の年別リンクにも `<a href="#year-2027">2027</a>` を追加します。掲載件数を表す見出し文も更新してください。

## メンバー・研究テーマ・プロジェクト

それぞれ `members.html`、`research.html`、`projects.html` を編集します。同じ種類のカードをコピーし、名前・説明・画像・リンクを変更してください。

研究室概要にも表示する教員は `about.html` のカードも更新します。研究テーマと論文・プロジェクトの関連リンクは、`publications.html#論文のid`、`projects.html#プロジェクトのid` の形です。

集合写真は `img/2027-member.jpg` のような名前で追加し、`members.html` の写真一覧を更新します。

## 共通の表示

デザインは `style.css` を編集します。ヘッダーとフッターは各 HTML に直接記載しているため、ナビゲーションや共通文言を変更するときは全ページを更新します。

リンクは `about.html`、画像は `img/example.jpg` のように相対パスで書きます。文章中の `&` は `&amp;`、`<` は `&lt;`、`>` は `&gt;` にします。

## 確認して公開する

1. HTML をブラウザーで開き、PC とスマートフォン幅で表示を確認する。
2. 編集したページのリンクと画像を確認する。
3. 変更をコミットして `main` に push する。
4. GitHub の Actions で `Deploy to GitHub Pages` が成功したことを確認する。

古い表示が残るときはブラウザーを再読み込みしてください。
