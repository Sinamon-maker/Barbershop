import { API_URL } from "./var.js";
import { addPreload, removePreload } from "./loader.js";
import { getData } from "./util.js/api.js";
import { renderElements } from "./util.js/renderElements.js";

export const initService = async () => {
  const priceList = document.querySelector(".price__list");
  const reserveFieldService = document.querySelector(
    ".reserve__fieldset-service"
  );
  priceList.textContent = "";

  addPreload(priceList);

  reserveFieldService.innerHTML = ` <legend class="reserve__legend">Услуга</legend>`;
  addPreload(reserveFieldService);
  const data = await getData(`${API_URL}api`);

  /*renderPrice(priceList, data)*/ renderElements(
    "li",
    "price__item",
    priceList,
    data,
    "price"
  );
  removePreload(priceList);

  /*renderService(reserveFieldService, data)*/ renderElements(
    "label",
    "radio",
    reserveFieldService,
    data,
    "service"
  );
  removePreload(reserveFieldService);
};
