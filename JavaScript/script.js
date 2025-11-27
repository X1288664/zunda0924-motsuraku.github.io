// JS/script.js (最終統合・リサイズ対応・完全版)

document.addEventListener('DOMContentLoaded', () => {

    // --- ヘッダーのスクロールエフェクト ---
    const siteHeader = document.querySelector('.site-header');
    if (siteHeader) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) siteHeader.classList.add('has-scrolled');
            else siteHeader.classList.remove('has-scrolled');
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
        menuContainer.addEventListener('click', (e) => { e.stopPropagation(); });
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
                link.href = '#'; link.innerText = i; link.setAttribute('data-page', i);
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
        if (totalPages > 1) setupPagination();
        showPage(1);
    }

    // --- スクロールに応じたアニメーション機能 ---
    const animatedElements = document.querySelectorAll('.card, .sidebar-widget');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    animatedElements.forEach(element => observer.observe(element));


    //==================================================
    // PC版とモバイル版のギャラリー機能をセットアップ
    //==================================================
    let pcSliderInitialized = false;
    let mobileSliderInitialized = false;

    // --- PC版 ギャラリースライダーのセットアップ関数 ---
    function setupPcSlider() {
        if (pcSliderInitialized) return;
        const pcGallery = document.querySelector('.gallery-section');
        if (!pcGallery) return;

        const track = pcGallery.querySelector('.gallery-track');
        const slides = Array.from(track.children);
        if (slides.length > 0) {
            const nextButton = pcGallery.querySelector('.gallery-btn.next');
            const prevButton = pcGallery.querySelector('.gallery-btn.prev');
            const dotsNav = pcGallery.querySelector('.gallery-dots');
            const timerBar = pcGallery.querySelector('.gallery-timer-bar');
            let currentIndex = 0;
            let autoPlayInterval;
            let slideWidth = slides[0].getBoundingClientRect().width;

            const moveToSlide = (targetIndex) => {
                if (slides.length <= 1) return;
                track.style.transform = `translateX(-${slideWidth * targetIndex}px)`;
                currentIndex = targetIndex;
                updateDots(targetIndex);
                resetTimerAnimation();
            };
            slides.forEach((slide, index) => {
                const dot = document.createElement('button');
                dot.classList.add('gallery-dot');
                dot.addEventListener('click', () => { moveToSlide(index); resetAutoPlay(); });
                dotsNav.appendChild(dot);
            });
            const dots = Array.from(dotsNav.children);
            const updateDots = (targetIndex) => {
                dots.forEach((dot, index) => dot.classList.toggle('active', index === targetIndex));
            };
            const resetTimerAnimation = () => {
                if (!timerBar) return;
                timerBar.classList.remove('is-animating');
                void timerBar.offsetWidth;
                timerBar.classList.add('is-animating');
            };
            const startAutoPlay = () => {
                if (slides.length <= 1) return;
                clearInterval(autoPlayInterval);
                autoPlayInterval = setInterval(() => moveToSlide((currentIndex + 1) % slides.length), 5000);
            };
            const resetAutoPlay = () => { clearInterval(autoPlayInterval); startAutoPlay(); };
            nextButton.addEventListener('click', () => { moveToSlide((currentIndex + 1) % slides.length); resetAutoPlay(); });
            prevButton.addEventListener('click', () => { moveToSlide((currentIndex - 1 + slides.length) % slides.length); resetAutoPlay(); });
            pcGallery.addEventListener('mouseenter', () => { clearInterval(autoPlayInterval); if(timerBar) timerBar.classList.remove('is-animating'); });
            pcGallery.addEventListener('mouseleave', () => { resetAutoPlay(); resetTimerAnimation(); });
            window.addEventListener('resize', () => {
                slideWidth = slides[0].getBoundingClientRect().width;
                track.style.transition = 'none';
                moveToSlide(currentIndex);
                track.offsetHeight;
                track.style.transition = 'transform 0.5s ease-in-out';
            });
            updateDots(0); startAutoPlay(); resetTimerAnimation();
            pcSliderInitialized = true;
        }
    }

    // --- モバイル専用 ヒーロー画像スライダーのセットアップ関数 ---
    function setupMobileSlider() {
        if (mobileSliderInitialized) return;
        const heroContainer = document.querySelector('.hero-fullscreen');
        const mobileDotsContainer = document.querySelector('.hero-controls-mobile .hero-dots');
        const mobileSlidesData = Array.from(document.querySelectorAll('.gallery-section .gallery-item'));

        if (!heroContainer || !mobileDotsContainer || mobileSlidesData.length === 0) return;

        const staticHeroImage = heroContainer.querySelector('.hero-background-image');
        if(staticHeroImage) staticHeroImage.style.display = 'none';

        const track = document.createElement('div');
        track.className = 'hero-track-mobile';
        
        const imageUrls = mobileSlidesData.map(slide => slide.getAttribute('data-sp'));
        const linkUrls = mobileSlidesData.map(slide => slide.getAttribute('href'));

        imageUrls.forEach((url, index) => {
            const slide = document.createElement('a');
            slide.href = linkUrls[index];
            slide.className = 'hero-slide-mobile';
            const img = document.createElement('img');
            img.src = url;
            slide.appendChild(img);
            track.appendChild(slide);
        });
        heroContainer.appendChild(track);

        const slides = Array.from(track.children);
        let mobileCurrentIndex = 0;
        let mobileAutoPlayInterval;

        const moveToSlide = (index) => {
            const slideWidth = heroContainer.getBoundingClientRect().width;
            track.style.transform = `translateX(-${slideWidth * index}px)`;
            mobileCurrentIndex = index;
            updateDots(index);
        };
        slides.forEach((slide, index) => {
            const dot = document.createElement('button');
            dot.classList.add('hero-dot');
            dot.addEventListener('click', () => {
                moveToSlide(index);
                startMobileAutoPlay();
            });
            mobileDotsContainer.appendChild(dot);
        });
        const mobileDots = Array.from(mobileDotsContainer.children);
        const updateDots = (index) => {
            mobileDots.forEach((dot, i) => dot.classList.toggle('active', i === index));
        };
        function startMobileAutoPlay() {
            clearInterval(mobileAutoPlayInterval);
            mobileAutoPlayInterval = setInterval(() => {
                moveToSlide((mobileCurrentIndex + 1) % slides.length);
            }, 5000);
        }
        
        let startX = 0; let diffX = 0;
        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].pageX;
            clearInterval(mobileAutoPlayInterval);
            track.style.transition = 'none';
        });
        track.addEventListener('touchmove', (e) => {
            const currentX = e.touches[0].pageX;
            diffX = currentX - startX;
            const slideWidth = heroContainer.getBoundingClientRect().width;
            track.style.transform = `translateX(${ -slideWidth * mobileCurrentIndex + diffX }px)`;
        });
        track.addEventListener('touchend', () => {
            track.style.transition = 'transform 0.5s ease-in-out';
            if (Math.abs(diffX) > 50) {
                if (diffX < 0) moveToSlide((mobileCurrentIndex + 1) % slides.length);
                else moveToSlide((mobileCurrentIndex - 1 + slides.length) % slides.length);
            } else {
                moveToSlide(mobileCurrentIndex);
            }
            startMobileAutoPlay();
            diffX = 0;
        });

        updateDots(0);
        startMobileAutoPlay();
        mobileSliderInitialized = true;
    }

    // --- 画面サイズに応じて実行する関数を決定する ---
    function handleResize() {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            setupMobileSlider();
        } else {
            setupPcSlider();
        }
    }

    // --- リサイズイベントの制御 ---
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // リロードして状態をリセットするのが最も安全で確実
            //window.location.reload();
        }, 250);
    });

//==================================================
    // イラストギャラリー・ライトボックス機能
    //==================================================
    // ページ内のギャラリーアイテムをクリックした時の処理（動的に生成される要素にも対応）
    document.body.addEventListener('click', (e) => {
        const link = e.target.closest('.illust-item');
        if (link) {
            e.preventDefault(); // リンク遷移を無効化
            const fullImgSrc = link.getAttribute('href');
            
            // ライトボックスのHTMLを生成
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox-overlay';
            lightbox.innerHTML = `
                <div class="lightbox-close">&times;</div>
                <img src="${fullImgSrc}" class="lightbox-content">
            `;

            document.body.appendChild(lightbox);

            // フェードイン
            requestAnimationFrame(() => {
                lightbox.style.opacity = '1';
            });

            // 閉じる処理（ボタンクリック または 背景クリック）
            const closeLightbox = () => {
                lightbox.style.opacity = '0';
                setTimeout(() => {
                    if (document.body.contains(lightbox)) {
                        document.body.removeChild(lightbox);
                    }
                }, 300);
            };

            lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) closeLightbox(); // 画像以外をクリックで閉じる
            });
        }
    });
    // --- 初期読み込み時に一度実行 ---
    handleResize();
});