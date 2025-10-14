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
/* script.js に追記 */

/*==================================================
イラストギャラリー・ライトボックス機能
==================================================*/
const gallery = document.querySelector('.illustration-gallery');

// ギャラリーが存在するページでのみ実行
if (gallery) {
    gallery.addEventListener('click', function(e) {
        // クリックされたのがギャラリー内のリンクか確認
        const imageLink = e.target.closest('.gallery-item');
        if (!imageLink) {
            return;
        }

        // リンクのデフォルト動作（ページ遷移）をキャンセル
        e.preventDefault();

        const largeImageUrl = imageLink.getAttribute('href');

        // ライトボックスの要素を作成
        const lightboxOverlay = document.createElement('div');
        lightboxOverlay.className = 'lightbox-overlay';

        const imageContainer = document.createElement('div');
        imageContainer.className = 'lightbox-image-container';

        const largeImage = document.createElement('img');
        largeImage.src = largeImageUrl;

        const closeButton = document.createElement('a');
        closeButton.className = 'lightbox-close';
        closeButton.innerHTML = '&times;'; // ×記号

        // 要素を組み立て
        imageContainer.appendChild(largeImage);
        lightboxOverlay.appendChild(imageContainer);
        lightboxOverlay.appendChild(closeButton);

        // bodyにライトボックスを追加
        document.body.appendChild(lightboxOverlay);

        // フェードインさせる
        setTimeout(() => {
            lightboxOverlay.style.opacity = '1';
        }, 10);

        // 閉じる機能
        function closeLightbox() {
            lightboxOverlay.style.opacity = '0';
            setTimeout(() => {
                // 要素がまだ存在する場合のみ削除
                if (document.body.contains(lightboxOverlay)) {
                    document.body.removeChild(lightboxOverlay);
                }
            }, 300); // CSSのtransitionの時間と合わせる
        }

        // クリックで閉じるイベントを設定
        lightboxOverlay.addEventListener('click', closeLightbox);
    });
}

/* script.js にこのブロックのみを記述 */

/*==================================================
スクロールに応じたアニメーション機能
==================================================*/
document.addEventListener('DOMContentLoaded', () => {
    // 監視対象の要素をすべて取得
    const animatedElements = document.querySelectorAll('.card, .sidebar-widget');
    // 監視用のオブザーバーを作成
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // 要素が画面内に入ったら is-visible クlasスを付与
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // 一度表示したら監視を停止
                observer.unobserve(entry.target);
            }
        });
    }, {
        // 要素が画面に10%入った時点で実行
        threshold: 0.1
    });
    // 各要素の監視を開始
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

/* ▼▼▼ このブロック全体を置き換える ▼▼▼ */
/*==================================================
ギャラリースライダー機能
==================================================*/
document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.gallery-container');
    if (!gallery) return;

    const track = gallery.querySelector('.gallery-track');
    const slides = Array.from(track.children);
    const nextButton = gallery.querySelector('.gallery-btn.next');
    const prevButton = gallery.querySelector('.gallery-btn.prev');
    const dotsNav = gallery.querySelector('.gallery-dots');
    const timerBar = gallery.querySelector('.gallery-timer-bar');

    if (slides.length === 0) return; // スライドがなければ何もしない

    const slideWidth = slides[0].getBoundingClientRect().width;
    let currentIndex = 0;
    let autoPlayInterval;

    const moveToSlide = (targetIndex) => {
        // スライドが1枚しかない場合は何もしない
        if (slides.length <= 1) return;
        track.style.transform = 'translateX(-' + slideWidth * targetIndex + 'px)';
        currentIndex = targetIndex;
        updateDots(targetIndex);
        resetTimerAnimation();
    };
    
    slides.forEach((slide, index) => {
        const dot = document.createElement('button');
        dot.classList.add('gallery-dot');
        dotsNav.appendChild(dot);
        dot.addEventListener('click', () => {
            moveToSlide(index);
            resetAutoPlay();
        });
    });
    const dots = Array.from(dotsNav.children);
    
    const updateDots = (targetIndex) => {
        dots.forEach(dot => dot.classList.remove('active'));
        if(dots[targetIndex]) {
            dots[targetIndex].classList.add('active');
        }
    };

    const resetTimerAnimation = () => {
        timerBar.classList.remove('is-animating');
        void timerBar.offsetWidth; 
        timerBar.classList.add('is-animating');
    };

    const startAutoPlay = () => {
        // スライドが1枚しかない場合は自動再生しない
        if (slides.length <= 1) return;
        
        clearInterval(autoPlayInterval); // 既存のタイマーをクリア
        autoPlayInterval = setInterval(() => {
            let nextIndex = currentIndex + 1;
            if (nextIndex >= slides.length) {
                nextIndex = 0; // ループ
            }
            moveToSlide(nextIndex);
        }, 5000);
    };

    const resetAutoPlay = () => {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    };

    nextButton.addEventListener('click', () => {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= slides.length) nextIndex = 0;
        moveToSlide(nextIndex);
        resetAutoPlay();
    });

    prevButton.addEventListener('click', () => {
        let prevIndex = currentIndex - 1;
        if (prevIndex < 0) prevIndex = slides.length - 1;
        moveToSlide(prevIndex);
        resetAutoPlay();
    });

    // ▼▼▼ ホバーで停止する機能を追加 ▼▼▼
    gallery.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
        timerBar.classList.remove('is-animating'); // アニメーションも停止
    });

    gallery.addEventListener('mouseleave', () => {
        resetAutoPlay();
        resetTimerAnimation(); // アニメーションも再開
    });
    // ▲▲▲ ここまで追加 ▲▲▲

    // 初期化
    updateDots(0);
    startAutoPlay();
    resetTimerAnimation();
});
/* ▲▲▲ 置き換えここまで ▲▲▲ */