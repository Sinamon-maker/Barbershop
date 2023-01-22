import { initReserve } from "./initReserve.js";
import { initSlider } from "./initSlider.js";
import { initService } from "./initService.js";

const init = () => {
  initSlider();
  initService();
  initReserve();
};

window.addEventListener("DOMContentLoaded", init);
