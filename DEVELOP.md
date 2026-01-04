# 開発マニュアル (Project A.T.L.A.S)

このドキュメントは、「もつ楽公式サイト（Project A.T.L.A.S）」
の共同開発におけるルールと技術仕様をまとめたものです。
開発に参加する際は、必ず一読してください。

---

## 🛠 開発フロー (Git/GitHub Workflow)

本プロジェクトでは、安全な運用のためにブランチを使い分けます。

### ブランチ運用ルール
1.  **`main` ブランチ (本番環境)**
    * 現在公開されている「完成版」のコードです。
    * **原則として、直接編集（Direct Commit）は禁止です。**
2.  **`develop` ブランチ (開発環境)**
    * **作業のベースとなるブランチです。**
    * サイトの更新や修正は、このブランチに対して行ってください。

### 作業手順
1.  GitHub上で `develop` ブランチを選択していることを確認する。
2.  ファイルをアップロード、または編集してコミットする。
3.  動作確認を行い、問題なければそのまま `develop` を更新する。
4.  大きな変更が完了し、公開準備が整ったら `main` ブランチへプルリクエスト (Pull Request) を送ってマージする。

---

## 📂 ディレクトリ構成

```text
root/
 │  index.html      (トップページ)
 │  creators.html   (クリエイター紹介)
 │  members.html    (管理部メンバー紹介)
 │  update.html     (更新履歴)
 │  404.html        (エラーページ)
 │  server.html     (サイトについて)
 │  privacy.html    (プライバシーポリシー)
 │  DEVELOPMENT.md  (このマニュアル)
 │
 ├─ CSS/
 │   └─ style.css   (全ページ共通のスタイルシート)
 │
 ├─ JavaScript/
 │   └─ script.js   (全ページ共通のスクリプト)
 │
 ├─ image/          (画像リソース)
 │   ├─ gallery/    (スライダー用画像 PC/Mobile)
 │   └─ ...
 │
 └─ archives/       (過去バージョンの保管庫 ※原則編集禁止)

```

---

## 🎨 CSS仕様 (style.css)

### 1. CSS変数 (Variables)

配色は `:root` で定義された変数を使用し、直接カラーコードを書かないようにしてください。

```css
:root {
    --base-color: #FFFFFF;       /* コンテンツ背景 */
    --background-color: #f4f6f9; /* 全体背景 */
    --text-color: #333333;       /* 文字色 */
    --accent-color: #007bff;     /* アクセント（リンク/ボタン） */
    --border-color: #e0e0e0;     /* 枠線 */
}

```

### 2. ダークモード (Dark Mode)

JSにより `body` タグに `.dark-mode` クラスが付与された時のスタイルを定義しています。

* **実装方法:** `body.dark-mode .クラス名 { ... }` の形で上書きします。
* **注意:** 文字色の視認性確保のため、`!important` を使用した強制上書きルールがファイル下部に定義されています。

### 3. レスポンシブ設計 (Responsive)

* **ブレークポイント:** `768px` (タブレット・スマホの境界)
* **PC/SP切り替え:**
* PCのみ表示: `.br-pc`, メディアクエリ `min-width: 769px`
* スマホのみ表示: `.br-mobile`, `.hero-controls-mobile`, メディアクエリ `max-width: 768px`



---

## 📜 JavaScript仕様 (script.js)

### 1. 主要機能

* **ダークモード切替:** `localStorage` に設定を保存し、次回訪問時も維持します。
* **ヘッダー追従:** スクロール量に応じて背景色を変化させます。
* **ハンバーガーメニュー:** スマホ版でのメニュー開閉を制御します。
* **スライダー (Gallery):**
* PC版: 自動再生、ドットナビゲーション付き。
* スマホ版: スワイプ操作対応の専用スライダーを動的に生成します。



### 2. 外部連携 (Supabase)

トップページの「NEWS」セクションは、外部データベース (Supabase) から情報を取得しています。

* **設定:** `window.supabaseUrl`, `window.supabaseKey` で初期化。
* **テーブル:** `New_News` テーブルから最新3件を取得。

---

## 🏗 HTML構造ガイドライン

### テンプレート構造

新しいページを作成する際は、既存のページ（`index.html` や `404.html`）をコピーするか、以下の基本構造を守ってください。

1. **Headタグ内:**
* Google Analytics (GTM) タグを最上部に配置。
* OGP設定、Favicon読み込みを記述。


2. **Bodyタグ内:**
* `<header class="site-header">`: 全ページ共通ヘッダー。
* `<main class="site-content">`: ページ固有のコンテンツ。
* `<footer class="site-footer">`: 全ページ共通フッター。
* **スクリプト読み込み:** `</body>` の直前で `JavaScript/script.js` を読み込む。



---

## ⚠️ 開発時の注意点

* **ファイルパス:** 画像やリンクのパスは「相対パス」または「ルート相対パス」で記述してください。
* **キャッシュ:** CSSやJSを変更した際は、ブラウザのスーパーリロードを行って確認してください。
* **アーカイブ:** `archives/` フォルダ内は歴史的資料のため、リンク切れ修正以外では変更しないでください。
=======
# Project A.T.L.A.S - Motsuraku Official Site

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Status](https://img.shields.io/badge/status-Live-success.svg)
![License](https://img.shields.io/badge/license-Non--Commercial-lightgrey)

**LINEオープンチャット「星のカービィをもっと楽しむ！」非公式ファンサイト**

「Project A.T.L.A.S」は、コミュニティの活動内容、クリエイターの作品、最新ニュースを発信するためのWebプラットフォーム開発プロジェクトです。
f5.si 時代のプロトタイプを経て、GitHub Pages + Supabase の構成で正式リリースされました。

## 🚀 サイトを見る (Live Demo)
**[公式サイトへアクセス](https://x1288664.github.io/zunda0924-motsuraku.github.io/)**

## ✨ 主な機能
* **レスポンシブデザイン:** PC / スマホ 両対応のモダンなUI。
* **ダークモード:** OS設定の自動検知 ＋ 手動切り替えスイッチ。
* **リアルタイムNews:** Supabase (BaaS) と連携したニュース配信システム。
* **ギャラリー機能:** PCではスライダー、モバイルではスワイプ操作に対応。
* **アーカイブ:** 過去のバージョンを閲覧できるアーカイブライブラリ（別リポジトリ）。

## 🛠 使用技術 (Tech Stack)
* **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
* **Backend / Database:** Supabase (PostgreSQL)
* **Hosting:** GitHub Pages
* **Analytics:** Google Analytics 4

## 📂 開発について
本プロジェクトは共同開発体制をとっています。
開発に参加される方は、`develop` ブランチにある [README.md](https://github.com/X1288664/zunda0924-motsuraku.github.io/blob/develop/README.md) を必ずご確認ください。

## 👥 Credits
* **Development:** STUDIO MARX
* **Community:** 星のカービィをもっと楽しむ！ (もつ楽)
* **Original Game:** HAL Laboratory, Inc. / Nintendo

---
<p align="center">
  &copy; 2025 STUDIO MARX / Motsuraku Unofficial Fan Site
</p>
