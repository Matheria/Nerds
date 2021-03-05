try {
  const MODAL_SHAKE_ANIMATION_DURATION = 600; // /css/modal/modal.css:27
  const ESC_KEY_CODE = 27;

  const page = document.documentElement;
  const popupButton = page.querySelector('.popup__button');
  const modal = page.querySelector('.modal');
  const modalCloseButton = modal.querySelector('.modal__close-button');
  const writeUsModalForm = modal.querySelector('.write-us-modal__form');
  const writeUsModalButton = modal.querySelector('.write-us-modal__button');

  function showModal() {
    page.classList.add('page_modal-visible');
    modal.classList.add('modal_visible');
  
    const firstFormElement = writeUsModalForm.elements[0];
  
    firstFormElement.focus();

    window.addEventListener('keydown', handleWindowKeyDown);
  }
  
  function hideModal() {
    page.classList.remove('page_modal-visible');
    modal.classList.remove('modal_visible');

    window.removeEventListener('keydown', handleWindowKeyDown);
  }
  
  function shakeModal() {
    modal.classList.add('modal_error');
  
    setTimeout(() => {
      modal.classList.remove('modal_error');
    }, MODAL_SHAKE_ANIMATION_DURATION);
  }
  
  function handlePopupButtonClick() {
    showModal();
  }
  
  function handleModalCloseButtonClick() {
    hideModal();
  }
  
  function handleWriteUsModalButtonClick(evt) {
    if (!writeUsModalForm.checkValidity()) {
      evt.preventDefault();
  
      shakeModal();
    }
  }

  function handleWindowKeyDown(evt) {
    if (evt.keyCode !== ESC_KEY_CODE) {
      return;
    }

    evt.preventDefault();

    hideModal();
  }
  
  popupButton.addEventListener('click', handlePopupButtonClick);
  modalCloseButton.addEventListener('click', handleModalCloseButtonClick);
  writeUsModalButton.addEventListener('click', handleWriteUsModalButtonClick);
} catch(e) {
  console.warn(`Инициализация модуля Modal прошла неудачно: ${e}`)
}
