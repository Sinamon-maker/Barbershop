import { addPreload, removePreload } from "./loader.js";

const startSlider = (slider) => {
  const sliders = document.querySelectorAll(".slider__item");
  const sliderList = document.querySelector(".slider__list");

  const btnPrevSlide = document.querySelector(".slider__arrow_left");
  const btnNextSlide = document.querySelector(".slider__arrow_right");

  let activSlider = 1;
  let position = 0;

  const checkSlider = () => {
    if (
      (activSlider + 2 === sliders.length &&
        document.documentElement.offsetWidth > 560) ||
      activSlider === sliders.length
    ) {
      btnNextSlide.style.display = "none";
    } else {
      btnNextSlide.style.display = "";
    }

    if (activSlider === 1) {
      btnPrevSlide.style.display = "none";
    } else {
      btnPrevSlide.style.display = "";
    }
  };

  checkSlider();

  const prevSlide = () => {
    sliders[activSlider].classList?.remove("slider__item-active");
    position = -sliders[0].clientWidth * (activSlider - 2);

    sliderList.style.transform = `translate(${position}px)`;
    activSlider -= 1;
    sliders[activSlider]?.classList.add("slider__item-active");
    checkSlider();
  };

  const nextSlide = () => {
    sliders[activSlider].classList?.remove("slider__item-active");
    position = -sliders[0].clientWidth * activSlider;

    sliderList.style.transform = `translate(${position}px)`;
    activSlider += 1;
    sliders[activSlider]?.classList.add("slider__item-active");
    checkSlider();
  };

  btnPrevSlide.addEventListener("click", prevSlide);
  btnNextSlide.addEventListener("click", nextSlide);

  window.addEventListener("resize", () => {
    if (
      activSlider + 2 > sliders.length &&
      document.documentElement.offsetWidth > 560
    ) {
      activSlider = sliders.length - 2;
      sliders[activSlider]?.classList.add("slider__item-active");
    }
    position = -sliders[0].clientWidth * (activSlider - 1);
    sliderList.style.transform = `translate(${position}px)`;
    checkSlider();
  });
};

export const initSlider = () => {
  const slider = document.querySelector(".slider");
  const sliderContainer = document.querySelector(".slider__container");
  sliderContainer.style.display = "none"; //via opacity can be done
  addPreload(slider);
  window.addEventListener("load", () => {
    removePreload(slider);
    startSlider(slider);
    sliderContainer.style.display = "";
  });
};
