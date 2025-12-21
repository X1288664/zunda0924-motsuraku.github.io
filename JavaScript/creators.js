// =======================================================
// Project ATLAS - Operation: NEXUS
// Creators List Loader (Simple Card Version)
// =======================================================

const supabaseUrl = 'https://lfgrtbofqgrkeidjmjgc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmZ3J0Ym9mcWdya2VpZGptamdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxNDM3MTIsImV4cCI6MjA4MTcxOTcxMn0.mKZMkVRfpZFuk7W2nI9g1EX8pDk-THtVkfPVsL-5txM';
const _client = supabase.createClient(supabaseUrl, supabaseKey);

// コンソール表示用（デバッグ）
function logCreatorsStatus(status, detail) {
    if (status === 'START') {
        console.log(`
=====================
クリエイター一覧確認
=====================
`);
    } else {
        console.log(`${status} ...${detail}`);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    logCreatorsStatus('START');
    
    const container = document.getElementById('creators-list');
    if (!container) return;

    container.innerHTML = '<p style="grid-column: 1/-1; text-align:center;">クリエイター情報を読み込んでいます...</p>';

    // 親テーブル(Creators)のみ取得すればOK
    const { data: creators, error } = await _client
        .from('Creators')
        .select('*')
        .order('id', { ascending: true });

    if (error) {
        logCreatorsStatus('読み込みエラー', '失敗 ❌');
        console.error(error);
        container.innerHTML = '<p style="grid-column: 1/-1;">データの読み込みに失敗しました。</p>';
        return;
    }

    if (!creators || creators.length === 0) {
        logCreatorsStatus('データ', 'なし (空)');
        container.innerHTML = '<p style="grid-column: 1/-1;">クリエイター情報がありません。</p>';
        return;
    }

    logCreatorsStatus('データ取得', `成功 (${creators.length}名) ✅`);
    container.innerHTML = ''; // クリア

    // カード生成
    creators.forEach(creator => {
        const mainImage = creator.image || 'image/members/default.webp';
        
        // 詳細ページへのリンク (creator-data.html?id=XX)
        const cardHTML = `
            <div class="member-card" onclick="window.location.href='creator-data.html?id=${creator.id}'" style="cursor: pointer;">
                <div class="member-thumb">
                    <img src="${mainImage}" alt="${creator.name}">
                </div>
                <div class="member-info">
                    <h3 class="member-name">${creator.name}</h3>
                    <p class="member-position">${creator.position}</p>
                    <p class="member-message">${creator.message || ''}</p>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', cardHTML);
    });
});