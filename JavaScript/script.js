// JS/script.js

// --- ヘッダーのスクロールエフェクト ---
const siteHeader = document.querySelector('.site-header');

// ヘッダーが存在する場合のみ実行
if (siteHeader) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            siteHeader.classList.add('has-scrolled');
        } else {
            siteHeader.classList.remove('has-scrolled');
        }
    });
}


// script.js のナビゲーション部分

// --- ナビゲーションメニューの表示切り替え ---
const menuToggle = document.querySelector('.menu-toggle');
const menuContainer = document.querySelector('.menu-container');

// トグルボタンとメニューコンテナが存在する場合のみイベントリスナーを設定
if (menuToggle && menuContainer) {
    // ▼▼▼ このイベントリスナー全体を置き換えます ▼▼▼
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // 親要素へのイベント伝播を停止
        
        // is-openクラスを付け外しする
        const isOpen = menuContainer.classList.toggle('is-open');

        // クラスの状態に応じてボタンのテキストを変更
        if (isOpen) {
            menuToggle.innerHTML = 'メニュー▲';
        } else {
            menuToggle.innerHTML = 'メニュー▼';
        }
    });

    // --- メニュー外をクリックで閉じる ---
    document.addEventListener('click', (e) => {
        // メニューが開いている、かつ、クリックした場所がメニューの外の場合
        if (menuContainer.classList.contains('is-open') && !e.target.closest('.main-navigation')) {
            menuContainer.classList.remove('is-open');
            menuToggle.innerHTML = 'メニュー▼'; // ボタンのテキストを元に戻す
        }
    });
    // ▲▲▲ ここまで置き換え ▲▲▲

    // --- メニュー内をクリックしても閉じないようにする ---
    menuContainer.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}
// script.jsに追記

/*==================================================
メンバー一覧ページ・ページネーション機能
==================================================*/
// --- 設定項目 ---
const membersPerPage = 6; // 1ページに表示するメンバーの数

// --- ここから下はプログラム ---
const memberGrid = document.querySelector('.member-grid');
const paginationContainer = document.querySelector('.pagination-container');

// メンバー一覧ページでない場合は、何もしない
if (memberGrid && paginationContainer) {
    const memberCards = Array.from(memberGrid.querySelectorAll('.member-card'));
    const totalMembers = memberCards.length;
    const totalPages = Math.ceil(totalMembers / membersPerPage);

    // ページを表示する関数
    function showPage(page) {
        const startIndex = (page - 1) * membersPerPage;
        const endIndex = startIndex + membersPerPage;

        // すべてのカードを一旦非表示に
        memberCards.forEach(card => card.style.display = 'none');
        
        // 表示するべきカードだけを表示
        const cardsToShow = memberCards.slice(startIndex, endIndex);
        cardsToShow.forEach(card => card.style.display = 'block');

        // ページネーションリンクのアクティブ状態を更新
        updateActiveLink(page);
    }

    // ページネーションのリンクを生成する関数
    function setupPagination() {
        for (let i = 1; i <= totalPages; i++) {
            const link = document.createElement('a');
            link.href = '#';
            link.innerText = i;
            link.setAttribute('data-page', i);

            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageNum = parseInt(e.target.getAttribute('data-page'));
                showPage(pageNum);
            });

            paginationContainer.appendChild(link);
        }
    }

    // アクティブなリンクを更新する関数
    function updateActiveLink(currentPage) {
        const pageLinks = paginationContainer.querySelectorAll('a');
        pageLinks.forEach(link => {
            const pageNum = parseInt(link.getAttribute('data-page'));
            if (pageNum === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // 初期表示
    if (totalPages > 1) {
        setupPagination();
    }
    showPage(1);
}