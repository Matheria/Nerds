try {
    const SLIDE_CHANGE_DELAY = 4000;

    let currentSliderItemIndex = 0;
    let intervalId;
    const sliderItemToButtonSwitch = new Map([
      [document.querySelector('.slider__item_first'), document.querySelector('.button-switch_first')],
      [document.querySelector('.slider__item_second'), document.querySelector('.button-switch_second')],
      [document.querySelector('.slider__item_third'), document.querySelector('.button-switch_third')]
    ]);
    const sliderItems = [...sliderItemToButtonSwitch.keys()];

    function startSlideShow(sliderItem) {
      intervalId = setInterval(() => {
        let nextSliderItemIndex;

        if (sliderItem) {
          nextSliderItemIndex = sliderItems.indexOf(sliderItem) + 1;
        } else {
          nextSliderItemIndex = currentSliderItemIndex + 1;
        }

        currentSliderItemIndex = nextSliderItemIndex > sliderItems.length - 1 ? 0 : nextSliderItemIndex;

        const nextSliderItem = sliderItems[currentSliderItemIndex];

        showSliderItem(nextSliderItem);
      }, SLIDE_CHANGE_DELAY);
    }

    function stopSlideShow() {
      clearInterval(intervalId);

      intervalId = undefined;
    }

    function showSliderItem(sliderItem) {
      hideSliderItems();
      stopSlideShow();

      sliderItem.classList.add('slider__item_visible');

      const buttonSwitch = sliderItemToButtonSwitch.get(sliderItem);

      buttonSwitch.classList.add('button-switch_current');

      startSlideShow(sliderItem);
    }

    function hideSliderItem(sliderItem) {
      sliderItem.classList.remove('slider__item_visible');

      const buttonSwitch = sliderItemToButtonSwitch.get(sliderItem);

      buttonSwitch.classList.remove('button-switch_current');
    }

    function hideSliderItems() {
      sliderItemToButtonSwitch.forEach((_, sliderItem) => hideSliderItem(sliderItem));
    }

    const createButtonSwitchClickHandler = (sliderItem) => () => {
      showSliderItem(sliderItem);
    }

    sliderItemToButtonSwitch.forEach((buttonSwitch, sliderItem) => buttonSwitch.addEventListener('click', createButtonSwitchClickHandler(sliderItem)));
    startSlideShow();
  } catch(e) {
    console.warn(`Инициализация модуля Slider прошла неудачно: ${e}`);
  }

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
        shakeModal();
      }
    }

    function handlePageClick(evt) {
      if (evt.target.closest('.modal')) {
        return;
      }

      hideModal();
    }

    function handleWindowKeyDown(evt) {
      if (evt.keyCode !== ESC_KEY_CODE) {
        return;
      }

      evt.preventDefault();

      hideModal();
    }

    page.addEventListener('click', handlePageClick, true)
    popupButton.addEventListener('click', handlePopupButtonClick);
    modalCloseButton.addEventListener('click', handleModalCloseButtonClick);
    writeUsModalButton.addEventListener('click', handleWriteUsModalButtonClick);
  } catch(e) {
    console.warn(`Инициализация модуля Modal прошла неудачно: ${e}`)
  }
