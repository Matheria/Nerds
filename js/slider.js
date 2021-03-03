const firstButton = document.querySelector(".button-switch_first");
const secondButton = document.querySelector(".button-switch_second");
const thirdButton = document.querySelector(".button-switch_third");
const currentSlide = document.querySelector(".slider__item_visible");
const firstSlide = document.querySelector(".slider__item-first");
const secondSlide = document.querySelector(".slider__item-second");
const thirdSlide = document.querySelector(".slider__item-third");
const currentButton = document.querySelector(".button-switch_current");

firstButton.addEventListener("click", function(evt) {
  evt.preventDefault;
  secondSlide.classList.remove("slider__item_visible");
  thirdSlide.classList.remove("slider__item_visible");
  firstSlide.classList.add("slider__item_visible");
  secondButton.classList.remove("button-switch_current");
  thirdButton.classList.remove("button-switch_current");
  firstButton.classList.add("button-switch_current");
});

secondButton.addEventListener("click", function(evt) {
  evt.preventDefault;
  firstSlide.classList.remove("slider__item_visible");
  thirdSlide.classList.remove("slider__item_visible");
  secondSlide.classList.add("slider__item_visible");
  firstButton.classList.remove("button-switch_current");
  thirdButton.classList.remove("button-switch_current");
  secondButton.classList.add("button-switch_current");
});

thirdButton.addEventListener("click", function(evt) {
  evt.preventDefault;
  firstSlide.classList.remove("slider__item_visible");
  secondSlide.classList.remove("slider__item_visible");
  thirdSlide.classList.add("slider__item_visible");
  firstButton.classList.remove("button-switch_current");
  secondButton.classList.remove("button-switch_current");
  thirdButton.classList.add("button-switch_current");
});
