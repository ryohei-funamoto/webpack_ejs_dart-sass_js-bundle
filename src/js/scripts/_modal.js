export function modal() {
    const modalArea = document.getElementById('js-modal-area');
    const btnOpenModal = document.getElementById('js-button-open-modal');
    const btnCloseModal = document.getElementById('js-button-close-modal');
    const modalOverlay = document.getElementById('js-modal-overlay');
    // モーダルの開閉に関わる要素を配列に格納する
    const modalToggleItems = [btnOpenModal, btnCloseModal, modalOverlay];

    // モーダルの開閉に関わる要素に対してクリックイベントを付加する
    for (let i = 0; i < modalToggleItems.length; i++) {
        modalToggleItems[i].addEventListener('click', toggleModal);
    }

    // モーダルを開閉する関数
    function toggleModal() {
        modalArea.classList.toggle('is-show');
    }
}