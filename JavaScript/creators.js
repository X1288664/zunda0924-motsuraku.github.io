// =======================================================
// Project ATLAS - Operation: NEXUS
// Creators List Loader (Simple Card Version)
// =======================================================

// 【削除済み】script.js で定義された supabaseClient を使用するため、ここでの定義は不要です

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

    // 親テーブル(Creators)のみ取得
    // ★重要: 変数名を script.js に合わせて 'supabaseClient' に変更しました
    const { data: creators, error } = await supabaseClient
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