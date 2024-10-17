export function loading() {
    const loading = document.getElementById('js-loading');

    // 全てのコンテンツが読み込まれたタイミングで
    window.addEventListener('load', function () {
        // 2秒後にローディング画面をフェードアウトさせる
        setTimeout(loaded, 2000);
    });

    function loaded() {
        loading.classList.add('is-loaded');
    }
}