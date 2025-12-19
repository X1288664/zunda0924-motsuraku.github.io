// 1. Supabase設定 (変更なし)
const supabaseUrl = 'https://lfgrtbofqgrkeidjmjgc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmZ3J0Ym9mcWdya2VpZGptamdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxNDM3MTIsImV4cCI6MjA4MTcxOTcxMn0.mKZMkVRfpZFuk7W2nI9g1EX8pDk-THtVkfPVsL-5txM';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

const memberContainer = document.getElementById('member-list'); 

async function loadMembers() {
    if(memberContainer) memberContainer.innerHTML = '<p style="text-align:center;">読み込み中...</p>';

    // 必要な列をすべて取得（detail, achievementsを追加）
    const { data: members, error } = await _supabase
        .from('Management_Members')
        .select('*') // すべて取得
        .order('id', { ascending: true });

    if (error) {
        console.error("❌ エラー:", error);
        return;
    }

    if (!members || members.length === 0) {
        memberContainer.innerHTML = '<p>メンバーがいません</p>';
        return;
    }

    // 表示リセット
    memberContainer.innerHTML = '';

    members.forEach(member => {
        // 画像パスチェック
        const imagePath = member.image ? member.image : 'images/default.png';

        // -------------------------------------------------
        // ▼▼▼ 功績リスト(achievements) のHTML生成処理 ▼▼▼
        // -------------------------------------------------
        let achievementsHTML = '';
        
        // データが存在し、かつ配列である場合のみ処理
        if (member.achievements && Array.isArray(member.achievements)) {
            // リスト開始タグ
            achievementsHTML += '<div class="achievements-list">';
            
            member.achievements.forEach(ach => {
                // リンクがある場合は <a>、ない場合は <div> か <span> にする
                // ※三項演算子を使った書き方です
                const titlePart = ach.link 
                    ? `<a href="${ach.link}" target="_blank" class="ach-title link">${ach.title}</a>`
                    : `<span class="ach-title">${ach.title}</span>`;

                const descPart = ach.desc 
                    ? `<p class="ach-desc">${ach.desc}</p>`
                    : '';

                // ひとつの功績ブロックとして結合
                achievementsHTML += `
                    <div class="achievement-item">
                        ${titlePart}
                        ${descPart}
                    </div>
                `;
            });

            // リスト終了タグ
            achievementsHTML += '</div>';
        }
        // -------------------------------------------------


        // カード全体のHTML組み立て
        // ※ detail部分も埋め込んでいますが、初期表示で隠す場合はCSSで制御するか、
        //   <details>タグなどを使うと良いでしょう。
// 【修正箇所】members.js の cardHTML 作成部分

const cardHTML = `
    <div class="member-card" onclick="window.location.href='profile.html?id=${member.id}'" style="cursor: pointer;">
        <div class="member-thumb">
            <img src="${imagePath}" alt="${member.name}">
        </div>
        <div class="member-info">
            <h3 class="member-name">${member.name}</h3>
            <p class="member-position">${member.position}</p>
            
            <p class="member-message">${member.message || member.description || ''}</p>
        </div>
    </div>
`;

        memberContainer.innerHTML += cardHTML;
    });
}

// 詳細の開閉用関数（簡易的なもの）
window.toggleDetail = function(id) {
    const el = document.getElementById(id);
    if (el.style.display === 'none') {
        el.style.display = 'block';
    } else {
        el.style.display = 'none';
    }
};

document.addEventListener('DOMContentLoaded', loadMembers);