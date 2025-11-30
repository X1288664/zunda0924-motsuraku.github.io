// js/creators.js

const creatorsData = [
    //テンプレート
    //{ id: "00",name: "undefined",position: "クリエイター",image: "image/members/XX_00_Def.webp",message: "テンプレート",detail: "ディテール",achievements: [{title: "コンテンツ1",desc: "説明",link: "#"},{title: "コンテンツ2",desc: "説明",link: "#"}],gallery: [] // 画像がない場合は空配列}
    {
        id: "01",
        name: "パヤ爺",
        position: "マルチコンテンツクリエイター",
        image: "image/members/HP_04_PYG.webp", 
        message: "動画制作をしています。", 
        detail: `以前は動画制作を主にしていました。<br>
                このサイトを制作しています。`,
        achievements: [
            {
                type: "iframe", 
                title: "LINEログマネージャー",
                desc: "LトークのようにLINEのトークログを管理できるツールです。",
                link: "https://sparc64-hermes-xp-2025.hf.space/"
            },
            {
                type: "youtube",
                title: "STUDIO MARX",
                desc: "もつ楽の歴史などを動画で発信しています。",
                link: "https://www.youtube.com/embed?listType=search&list=UUYyyjW5c7uuMxVkHVGb039Q"
            }
        ],
        gallery: [
            {
                thumb: "image/illustrations/thumb/image3.webp", // 小さい画像(一覧用)
                full:  "image/illustrations/full/image3.webp",  // 大きい画像(拡大用)
                caption: "作品タイトル1"              // キャプション(任意)
            },
            {
                thumb: "image/illustrations/thumb/image2.jpg",
                full:  "image/illustrations/full/image2.jpg",
                caption: "作品タイトル2"
            }
        ]
    },
    {
        id: "02",
        name: "undefined",
        position: "クリエイター",
        image: "image/members/XX_00_Def.webp",
        message: "テンプレート",
        detail: "ディテール",
        achievements: [
            {
                title: "コンテンツ1",
                desc: "説明",
                link: "#"
            }
        ],
        gallery: [] // 画像がない場合は空配列
    }
    // ... 他のクリエイター ...
];
