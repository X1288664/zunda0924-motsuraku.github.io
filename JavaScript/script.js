        document.addEventListener('DOMContentLoaded', function() {
            const siteHeader = document.getElementById('siteHeader');
            const menuToggle = document.getElementById('menuToggle');
            const menuContainer = document.getElementById('menuContainer');

            // --- スクロール時のヘッダー表示切り替え ---
            if (siteHeader) {
                window.addEventListener('scroll', function() {
                    if (window.scrollY > 10) { 
                        siteHeader.classList.add('has-scrolled');
                    } else {
                        siteHeader.classList.remove('has-scrolled');
                    }
                });
            }

            // --- メニューボタンクリック時の処理 ---
            if (menuToggle) {
                menuToggle.addEventListener('click', function() {
                    const isActive = menuToggle.classList.toggle('is-active');
                    menuContainer.classList.toggle('is-open');

                    if (isActive) {
                        menuToggle.textContent = 'メニュー▲';
                    } else {
                        menuToggle.textContent = 'メニュー▼';
                    }
                });
            }

            // ▼▼▼ ここからが追加した処理 ▼▼▼
            // --- メニュー外をクリックした時に閉じる処理 ---
            document.addEventListener('click', function(event) {
                // メニューが開いているか、かつ、クリックされた場所がメニューボタンとメニュー自体の中ではないかを確認
                if (menuContainer.classList.contains('is-open') && !menuToggle.contains(event.target) && !menuContainer.contains(event.target)) {
                    // 条件に合えば、メニューを閉じる
                    menuToggle.classList.remove('is-active');
                    menuContainer.classList.remove('is-open');
                    menuToggle.textContent = 'メニュー▼';
                }
            });
            // ▲▲▲ ここまでが追加した処理 ▲▲▲
        });