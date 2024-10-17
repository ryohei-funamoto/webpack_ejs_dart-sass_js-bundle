export function toTop() {
    const btnToTop = document.getElementById('js-button-to-top');

    window.addEventListener('scroll', toggleBtn);
    btnToTop.addEventListener('click', scrollToTop);

    // トップへ戻るボタンを表示・非表示する関数
    function toggleBtn() {
        // 下へのスクロール量が500pxを超えると
        if (window.pageYOffset > 500) {
            // トップへ戻るボタンを表示する
            btnToTop.classList.add('is-show');
        }
        // スクロール量が500pxを超えない場合は
        else {
            // トップへ戻るボタンを非表示にする
            btnToTop.classList.remove('is-show');
        }
    }
    // ページトップに移動する関数
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}