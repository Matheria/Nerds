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