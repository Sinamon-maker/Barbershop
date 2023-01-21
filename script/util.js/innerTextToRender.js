import { API_URL } from "../var.js";

export const innerTextToRender = (type, text) => {
  if (type === "price") {
    return `
     <span class="price__item-title">${text.name}</span>
                  <span class="price__item-count">${text.price} руб</span>
    `;
  }
  if (type === "service") {
    return `
         <input class="radio__input" name="service" type="radio" value = ${text.id} />
         <span class="radio__label">${text.name}</span>
        `;
  }
  if (type === "spec") {
    return `<input class="radio__input" name="spec" type="radio" value=${text.id} />
                  <span
                    class="radio__label radio__label-spec"
                    style="--bg-image: url(${API_URL}${text.img})"
                    >${text.name}</span
                  >`;
  }

  if (type === "month") {
    console.log({ text });
    return `<input class="radio__input" name="month" type="radio" value = ${text} />
                  <span
                    class="radio__label"
                    
                    >${new Intl.DateTimeFormat("ru-RU", {
                      month: "long",
                    }).format(new Date(text))}</span
                  >`;
  }
  if (type === "day") {
    return `<input class="radio__input" name="day" type="radio" value = ${
      text.day
    } />
                  <span
                    class="radio__label"
                    
                    >${new Intl.DateTimeFormat("ru-RU", {
                      month: "long",
                      day: "numeric",
                    }).format(new Date(text.month / text.day))}</span
                  >`;
  }

  if ((type = "time")) {
    return `<input class="radio__input" name="time" type="radio" value = ${text} />
                  <span
                    class="radio__label"
                    
                    >${text}</span
                  >`;
  }
};
