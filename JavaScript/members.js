// =======================================================
// Project ATLAS - Operation: NEXUS
// Supabase Member List with Debug Console
// =======================================================

// 1. 設定
const ITEMS_PER_PAGE = 12; // 1ページあたりの表示人数

// 【削除済み】ここでURLやKEYを定義してはいけません（script.jsのものを利用します）

const memberContainer = document.querySelector('.member-grid');
const paginationContainer = document.querySelector('.pagination-container') || createPaginationContainer();

function createPaginationContainer() {
    const div = document.createElement('div');
    div.className = 'pagination-container';
    if(memberContainer) memberContainer.parentNode.insertBefore(div, memberContainer.nextSibling);
    return div;
}

// --- デバッグ表示用関数 ---
function logSystemStatus(status, detail) {
    if (status === 'START') {
        console.log(`
=====================
メンバーデータベース確認
=====================
`);
    } else {
        console.log(`${status} ...${detail}`);
    }
}

async function loadMembers() {
    if (!memberContainer) return;
    
    // 開始ログ
    logSystemStatus('START');
    logSystemStatus('接続先', 'Supabase (Management_Members)');

    memberContainer.innerHTML = '<p style="grid-column: 1/-1; text-align:center;">データを読み込んでいます...</p>';

    // 現在のページ取得
    const params = new URLSearchParams(window.location.search);
    let currentPage = parseInt(params.get('page')) || 1;
    if (currentPage < 1) currentPage = 1;

    // データ取得
    // ★重要: 変数名を script.js に合わせて 'supabaseClient' に変更しました
    const { data: allMembers, error } = await supabaseClient
        .from('Management_Members')
        .select('*')
        .order('id', { ascending: true });

    // 結果ログと処理
    if (error) {
        logSystemStatus('データベース読み込み', '失敗 ❌');
        console.error('エラー詳細:', error);
        memberContainer.innerHTML = '<p style="grid-column: 1/-1;">データの読み込みに失敗しました。</p>';
        return;
    }

    logSystemStatus('データベース読み込み', '完了 ✅');

    if (!allMembers || allMembers.length === 0) {
        logSystemStatus('テーブルのデータ', 'データなし (空)');
        memberContainer.innerHTML = '<p style="grid-column: 1/-1;">メンバー情報がありません。</p>';
        return;
    }

    logSystemStatus('テーブルのデータ', `データあり (${allMembers.length}件)`);

    // 表示処理
    const totalMembers = allMembers.length;
    const totalPages = Math.ceil(totalMembers / ITEMS_PER_PAGE);
    if (currentPage > totalPages) currentPage = 1;

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const membersToShow = allMembers.slice(startIndex, endIndex);

    memberContainer.innerHTML = ''; // クリア

    membersToShow.forEach(member => {
        const imagePath = member.image ? member.image : 'image/members/default.webp';
        const displayMsg = member.message || member.description || '';

        const cardHTML = `
            <div class="member-card" onclick="window.location.href='profile.html?id=${member.id}'" style="cursor: pointer;">
                <div class="member-thumb">
                    <img src="${imagePath}" alt="${member.name}">
                </div>
                <div class="member-info">
                    <h3 class="member-name">${member.name}</h3>
                    <p class="member-position">${member.position}</p>
                    <p class="member-message">${displayMsg}</p>
                </div>
            </div>
        `;
        memberContainer.innerHTML += cardHTML;
    });

    renderPagination(currentPage, totalPages);
}

function renderPagination(current, total) {
    if (!paginationContainer) return;
    paginationContainer.innerHTML = '';
    if (total <= 1) return;

    if (current > 1) {
        paginationContainer.innerHTML += `<a href="?page=${current - 1}" class="page-btn">« 前へ</a>`;
    }
    for (let i = 1; i <= total; i++) {
        const activeClass = (i === current) ? 'active' : '';
        paginationContainer.innerHTML += `<a href="?page=${i}" class="page-btn ${activeClass}">${i}</a>`;
    }
    if (current < total) {
        paginationContainer.innerHTML += `<a href="?page=${current + 1}" class="page-btn">次へ »</a>`;
    }
}

document.addEventListener('DOMContentLoaded', loadMembers);