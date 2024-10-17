export function accordion() {
    const accTriggers = document.querySelectorAll('.js-accordion-trigger');

    accTriggers.forEach(function (trigger) {
        trigger.addEventListener('click', toggleAccordion);
    });

    function toggleAccordion(e) {
        // イベントリスナーを登録した(=イベントが発生した)要素を取得する
        const currentTrigger = e.currentTarget;
        // イベントリスナーを登録した要素の親要素(=アコーディオン本体)を取得する
        const currentParent = currentTrigger.parentNode;
        // イベントリスナーを登録した要素の隣り合う次の要素(.p-accordion__body)を取得する
        const currentBody = currentTrigger.nextElementSibling;
        // currentBodyの子要素(.p-accordion__description)の高さを取得する
        const currentDescHeight = currentBody.querySelector('.p-accordion__description').getBoundingClientRect().height;

        accTriggers.forEach(function (element) {
            // クリックされたトリガーと監視したトリガーが一致した場合
            if (currentTrigger === element) {
                // アコーディオンが開いている時にクリックされたら、アコーディオンを閉じる
                if (currentParent.classList.contains('is-open')) {
                    currentParent.classList.remove('is-open');
                    // ボディ部分の高さを0にする
                    currentBody.style.height = 0;
                }
                // アコーディオンが閉じている時にクリックされたら、アコーディオンを開く
                else {
                    currentParent.classList.add('is-open');
                    // ボディ部分の高さに子要素の高さを付加する
                    currentBody.style.height = `${currentDescHeight}px`;
                }
            }
            // クリックしたトリガーと監視したトリガーが一致しなかった場合、監視したトリガーが属するアコーディオンを閉じる
            else {
                element.parentNode.classList.remove('is-open');
                element.nextElementSibling.style.height = 0;
            }
        });
    }
}