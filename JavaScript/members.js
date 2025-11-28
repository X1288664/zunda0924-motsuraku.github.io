// js/members.js

const membersData = [
{
        id: "01", name: "パヤ爺", position: "ヘルパー[元副官]",
        image: "../image/members/HP_04_PYG.webp",
        message: "パヤ爺です。現在はヘルパーですが昔は副官でした。",
        detail: `
            パヤ爺です。<br>
            現在はヘルパーですが昔は副官でした。<br>
            <ul>
                <li><strong>もつ楽参加日:</strong> 2022年6月26日</li>
                <li><strong>役職:</strong> ヘルパー[元副官]</li>
                <li><strong>好きなキャラ:</strong> HR-D3、ゼロツー</li>
            </ul>
        `,
        // ▼▼▼ ここを追加：功績リスト ▼▼▼
        //...テンプレートです...1ページに6人ごと表示できます。
        // { id: "00", name: "メンバー0", position: "役職なし",image: "../image/members/XX_00_Def.webp", message: "説明", detail: `詳細`,achievements: [] },
        achievements: [
            {
                title: "国旗トーナメント運営",
                desc: "", // 説明がない場合は空文字
                link: ""  // リンクがない場合は空文字
            },
            {
                title: "公式サイト",
                desc: "本サイトの開発、運用<br>[クリックして詳細にアクセスできます]",
                link: "../Server-info.html"
            }
        ]//功績がない場合は空の配列にしておく ⇒ achievements: []
    },
    {
        id: "02", name: "もす吉", position: "ヘルパー",
        image: "../image/members/XX_00_Def.webp",
        message: "最近古参の仲間入りしました。",
        detail: `もす吉です。<br>
        実はアカウントを2つ持ってます。<br>
            <ul>
                <li><strong>もつ楽参加日:</strong> 2022年8月7日</li>
                <li><strong>役職:</strong> ヘルパー[元副官]</li>
                <li><strong>主な活動:</strong> 一応だらだら絵描いてます。
                <li><strong>好きなキャラ:</strong> ダークマター族, クラッコ, ワドルドゥ</li>
            </ul>
        `,
        achievements: []
    },
    {
        id: "03", name: "まほまる", position: "副官",
        image: "../image/members/EL_03_MAH.webp",
        message: "最興の鳥能力者",
        detail: `最興の鳥能力者<br>
            <ul>
                <li><strong>もつ楽参加日:</strong> 2023年3月21日</li>
                <li><strong>主な活動:</strong> 管理部の一般業務, 動画制作</li>
                <li><strong>好きなキャラ:</strong> ドロッチェ</li>
            </ul>
        `,
        achievements: [
            {
                title: "公式YouTubeチャンネル[もつラジ]",
                desc: "もつ楽ラジオ放送局",
                link: "https://youtube.com/@motsulakuradio?si=nA4DwAFG1CdEINhZ"
            },
        ]
    },
    { id: "04", name: "焼きそばパン", position: "ヘルパー",
        image: "../image/members/XX_00_Def.webp",
        message: "ユーキの弟子焼きそばパンです。",
        detail: `浮上することは少ないですがよろしくお願いします。<br>
                ユーキは私のものです
                <ul>
                <li><strong>もつ楽参加日:</strong>2024年5月26日</li>
                <li><strong>主な活動:</strong>カビファイ2、グルフェスなどの週大会</li>
                </ul>`,
        achievements: [] },
    { id: "05", name: "ピト", position: "ヘルパー",
        image: "../image/members/XX_00_Def.webp",
        message: "古参のよく低浮上になるヘルパーです。",
        detail: `古参のよく低浮上になるヘルパーです。<br>
        見かけたらあの人かと思い出してくれると嬉しいです。
        <ul>
        <li><strong>もつ楽参加日:</strong>2022年5月7日
        <li><strong>主な活動:</strong>週大会の開催、s13の企画、運営</li>`,
        achievements: [] },
    { id: "06", name: "6号", position: "ヘルパー",
        image: "../image/members/XX_00_Def.webp",
        message: "管理部の中で一番新参かつ年少です",
        detail: `管理部の中で一番新参かつ年少ですが、<br>
        古参以外の視点から運営に参加出来るという強みを活かし活動したいです！
        <ul>
        <li><strong>もつ楽参加日:</strong>2025年8月7日</li>
        </ul>`
        ,achievements: [] },
]