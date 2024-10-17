export function tabMenu() {
    const tabTriggers = document.querySelectorAll('.js-tab-trigger');
    const tabTargets = document.querySelectorAll('.js-tab-target');

    // タブのクリックイベント
    tabTriggers.forEach(function (trigger) {
        trigger.addEventListener('click', switchTab);
    });

    // タブの切り替えを行う関数
    function switchTab(e) {
        // イベントリスナーを登録した(=クリックイベントが発生した)タブを取得する
        const currentTrigger = e.currentTarget;
        // クリックしたタブのカスタムデータ属性を取得する
        const currentTriggerData = currentTrigger.dataset.tab;
        // クリックしたタブに対応するコンテンツを取得する
        const currentTarget = document.querySelector(`[data-content="${currentTriggerData}"]`);
        // 全てのタブを一旦非アクティブ状態にする
        tabTriggers.forEach(function (trigger) {
            trigger.classList.remove('is-active');
        });
        // クリックしたタブをアクティブ状態にする
        currentTrigger.classList.add('is-active');
        // 全てのコンテンツを一旦非表示にする
        tabTargets.forEach(function (target) {
            target.classList.remove('is-show');
        });
        // クリックしたタブに対応するコンテンツのみ表示する
        currentTarget.classList.add('is-show');
    }
}