export function smoothscroll() {
    const navLinks = document.querySelectorAll('.js-nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            // リンク要素の既定の挙動をキャンセルする
            e.preventDefault();
            // クリックしたリンク要素のhref属性を取得する
            const hash = link.getAttribute('href');
            console.log(hash);
            // href属性が#のみ、または空の場合
            if (hash === '#' || hash === '') {
                // ページトップへスクロールする
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                // 移動先の要素を取得する
                const target = document.getElementById(hash.slice(1));
                // ヘッダーの高さを取得する
                const headerHeight = document.getElementById('js-header').getBoundingClientRect().height;
                // 現在位置から移動先の位置までの距離を取得する(固定ヘッダーが被らないように、ヘッダーの高さを除く)
                const targetPos = window.pageYOffset + target.getBoundingClientRect().top - headerHeight;
                // 移動先の要素へスクロールする
                window.scrollTo({
                    top: targetPos,
                    behavior: 'smooth'
                });
            }
        });
    });
}