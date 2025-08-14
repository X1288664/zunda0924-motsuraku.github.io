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


// --- ナビゲーションメニューの表示切り替え ---
const menuToggle = document.querySelector('.menu-toggle');
const menuContainer = document.querySelector('.menu-container');

// トグルボタンとメニューコンテナが存在する場合のみイベントリスナーを設定
if (menuToggle && menuContainer) {
    menuToggle.addEventListener('click', (e) => {
        // イベントの伝播を停止し、下のdocumentクリックイベントが発火しないようにする
        e.stopPropagation();
        menuContainer.classList.toggle('is-open');
    });

    // --- メニュー外をクリックで閉じる ---
    document.addEventListener('click', (e) => {
        // メニュー本体とトグルボタン以外をクリックした場合
        if (!e.target.closest('.main-navigation')) {
            menuContainer.classList.remove('is-open');
        }
    });

    // --- メニュー内をクリックしても閉じないようにする ---
    menuContainer.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}