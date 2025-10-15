// JS/script.js

// --- ヘッダーのスクロールエフェクト ---
const siteHeader = document.querySelector('.site-header');
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
if (menuToggle && menuContainer) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = menuContainer.classList.toggle('is-open');
        menuToggle.innerHTML = isOpen ? 'メニュー▲' : 'メニュー▼';
    });
    document.addEventListener('click', (e) => {
        if (menuContainer.classList.contains('is-open') && !e.target.closest('.main-navigation')) {
            menuContainer.classList.remove('is-open');
            menuToggle.innerHTML = 'メニュー▼';
        }
    });
    menuContainer.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// --- メンバー一覧ページ・ページネーション機能 ---
const membersPerPage = 6;
const memberGrid = document.querySelector('.member-grid');
const paginationContainer = document.querySelector('.pagination-container');
if (memberGrid && paginationContainer) {
    const memberCards = Array.from(memberGrid.querySelectorAll('.member-card'));
    const totalPages = Math.ceil(memberCards.length / membersPerPage);

    function showPage(page) {
        const startIndex = (page - 1) * membersPerPage;
        const endIndex = startIndex + membersPerPage;
        memberCards.forEach(card => card.style.display = 'none');
        memberCards.slice(startIndex, endIndex).forEach(card => card.style.display = 'block');
        updateActiveLink(page);
    }

    function setupPagination() {
        for (let i = 1; i <= totalPages; i++) {
            const link = document.createElement('a');
            link.href = '#';
            link.innerText = i;
            link.setAttribute('data-page', i);
            link.addEventListener('click', (e) => {
                e.preventDefault();
                showPage(parseInt(e.target.getAttribute('data-page')));
            });
            paginationContainer.appendChild(link);
        }
    }

    function updateActiveLink(currentPage) {
        const pageLinks = paginationContainer.querySelectorAll('a');
        pageLinks.forEach(link => {
            link.classList.toggle('active', parseInt(link.getAttribute('data-page')) === currentPage);
        });
    }

    if (totalPages > 1) {
        setupPagination();
    }
    showPage(1);
}

// --- スクロールに応じたアニメーション機能 ---
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.card, .sidebar-widget');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

// --- ギャラリースライダー機能 ---
document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.gallery-container');
    if (!gallery) return;

    const track = gallery.querySelector('.gallery-track');
    const slides = Array.from(track.children);
    if (slides.length === 0) return;

    const nextButton = gallery.querySelector('.gallery-btn.next');
    const prevButton = gallery.querySelector('.gallery-btn.prev');
    const dotsNav = gallery.querySelector('.gallery-dots');
    const timerBar = gallery.querySelector('.gallery-timer-bar');

    let currentIndex = 0;
    let autoPlayInterval;
    let slideWidth = slides[0].getBoundingClientRect().width;

    function moveToSlide(targetIndex) {
        if (slides.length <= 1) return;
        track.style.transform = `translateX(-${slideWidth * targetIndex}px)`;
        currentIndex = targetIndex;
        updateDots(targetIndex);
        resetTimerAnimation();
    }

    // ドットの生成
    slides.forEach((slide, index) => {
        const dot = document.createElement('button');
        dot.classList.add('gallery-dot');
        dot.addEventListener('click', () => {
            moveToSlide(index);
            resetAutoPlay();
        });
        dotsNav.appendChild(dot);
    });
    const dots = Array.from(dotsNav.children);

    function updateDots(targetIndex) {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === targetIndex);
        });
    }

    function resetTimerAnimation() {
        timerBar.classList.remove('is-animating');
        void timerBar.offsetWidth;
        timerBar.classList.add('is-animating');
    }

    function startAutoPlay() {
        if (slides.length <= 1) return;
        clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % slides.length;
            moveToSlide(nextIndex);
        }, 5000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    nextButton.addEventListener('click', () => {
        const nextIndex = (currentIndex + 1) % slides.length;
        moveToSlide(nextIndex);
        resetAutoPlay();
    });

    prevButton.addEventListener('click', () => {
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        moveToSlide(prevIndex);
        resetAutoPlay();
    });

    gallery.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
        timerBar.classList.remove('is-animating');
    });

    gallery.addEventListener('mouseleave', () => {
        resetAutoPlay();
        resetTimerAnimation();
    });

    // ウィンドウリサイズへの対応
    window.addEventListener('resize', () => {
        slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transition = 'none'; // リサイズ中のアニメーションを無効化
        moveToSlide(currentIndex);
        track.offsetHeight; // 強制再描画
        track.style.transition = 'transform 0.5s ease-in-out';
    });

    // 初期化
    updateDots(0);
    startAutoPlay();
    resetTimerAnimation();
});