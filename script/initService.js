import { API_URL } from "./var.js";
import { addPreload, removePreload } from "./loader.js";

const renderPrice = (wrapper, data) => {
  data.forEach((service) => {
    const priceItem = document.createElement("li");
    priceItem.classList.add("price__item");
    priceItem.innerHTML = `
     <span class="price__item-title">${service.name}</span>
                  <span class="price__item-count">${service.price} руб</span>
    `;
    wrapper.append(priceItem);
  });
};

const renderService = (wrapper, data) => {
  const labels = data.map((service) => {
    const label = document.createElement("label");
    label.classList.add("radio");

    label.innerHTML = `
         <input class="radio__input" name="service" type="radio" value = ${service.id} />
         <span class="radio__label">${service.name}</span>
        `;

    return label;
  });

  wrapper.append(...labels);
};

export const initService = () => {
  const priceList = document.querySelector(".price__list");
  const reserveFieldService = document.querySelector(
    ".reserve__fieldset-service"
  );
  priceList.textContent = "";

  addPreload(priceList);

  reserveFieldService.innerHTML = ` <legend class="reserve__legend">Услуга</legend>`;
  addPreload(reserveFieldService);
  fetch(`${API_URL}api`)
    .then((res) => res.json())
    .then((data) => {
      renderPrice(priceList, data);
      removePreload(priceList);
      return data;
    })
    .then((data) => {
      renderService(reserveFieldService, data);
      removePreload(reserveFieldService);
    });
};
