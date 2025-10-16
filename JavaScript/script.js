// JS/script.js (最終統合・修正版)

document.addEventListener('DOMContentLoaded', () => {

    // --- ヘッダー、ナビゲーション、ページネーション、スクロールアニメーションの基本機能 ---
    // (この部分は変更ありません)
    const siteHeader = document.querySelector('.site-header');
    if (siteHeader) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) siteHeader.classList.add('has-scrolled');
            else siteHeader.classList.remove('has-scrolled');
        });
    }
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
    // PC版とモバイル版で処理を分岐
    //==================================================
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        // --- モバイル専用 ヒーロー画像スライダー機能 ---
        const heroContainer = document.querySelector('.hero-fullscreen');
        const mobileDotsContainer = document.querySelector('.hero-controls-mobile .hero-dots');
        const mobileSlidesData = Array.from(document.querySelectorAll('.gallery-section .gallery-item'));

        if (heroContainer && mobileDotsContainer && mobileSlidesData.length > 0) {
            const staticHeroImage = heroContainer.querySelector('.hero-background-image');
            if(staticHeroImage) staticHeroImage.style.display = 'none';

            const track = document.createElement('div');
            track.className = 'hero-track-mobile';
            
            const imageUrls = mobileSlidesData.map(slide => slide.querySelector('img').src);
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
            updateDots(0);
            startMobileAutoPlay();
        }

    } else {
        // --- PC版 ギャラリースライダー機能 ---
        const pcGallery = document.querySelector('.gallery-section');
        if (pcGallery) {
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
            }
        }
    }
});