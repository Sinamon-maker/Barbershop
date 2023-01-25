import { API_URL } from "../var.js";
import { formatDate } from "./date.js";

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
    const date = formatDate(2023, text, {
      month: "long",
    });

    return `<input class="radio__input" name="month" type="radio" value = ${text} />
                  <span
                    class="radio__label"
                    
                    >${date}</span
                  >`;
  }
  if (type === "day") {
    const date = formatDate(
      2023,
      text.month,
      {
        month: "long",
        day: "numeric",
      },
      text.day
    );
    return `<input class="radio__input" name="day" type="radio" value = ${text.day} />
                  <span
                    class="radio__label"
                    
                    >${date}</span
                  >`;
  }

  if (type === "time") {
    return `<input class="radio__input" name="time" type="radio" value = ${text} />
                  <span
                    class="radio__label"
                    
                    >${text}</span
                  >`;
  }
  if (type === "order") {
    const date = formatDate(
      2023,
      text.month,
      {
        month: "long",
        day: "numeric",
      },
      text.day
    );
    return `Спасибо за бронь #${text.id}. 
    Ждем вас ${date},
        время: ${text.time}`;
  }
};
