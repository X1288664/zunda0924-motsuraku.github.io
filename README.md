# 開発マニュアル (Project A.T.L.A.S)

## 📂 ディレクトリ構成
- `index.html`: トップページ（アーカイブ一覧）
- `CSS/`: スタイルシート格納
- `JavaScript/`: スクリプト格納
- `image/`: 共通画像
- `archives/`: 過去バージョン保管（**ここは原則編集禁止**）

## 🎨 CSS設計ガイドライン (style.css)
本プロジェクトはCSS変数を使用してダークモードに対応しています。
色を指定する際は、直接カラーコードを書かず、以下の変数を使用してください。

### カラー変数 (`:root`)
- 背景色: `var(--bg-color)`
- カード背景: `var(--card-bg)`
- 文字色: `var(--text-color)`
- アクセント（リンク/ボタン）: `var(--accent-color)`
  - ライトモード: 青 (#007bff)
  - ダークモード: 水色 (#66b2ff)
- 枠線: `var(--border-color)`

### 命名規則
- クラス名はケバブケース（例: `.hero-image-wrapper`）を使用。
- `!important` は原則禁止。

## 📜 JavaScript仕様 (script.js)
- **ダークモード:**
  - `localStorage` に設定を保存。
  - `body` タグに `.dark-mode` クラスを付与することで切り替え。
- **配置:**
  - HTMLの末尾（`</body>`直前）で読み込み。

## ⚠️ 注意事項
- `archives/` 以下の過去ファイルは「歴史的資料」のため、リンク切れ修正以外では変更しないこと。
