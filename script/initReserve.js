import { API_URL } from "./var.js";
import { addPreload, removePreload } from "./loader.js";
import { addDisaabled, removeDisaabled } from "./util.js/disableElem.js";
import { getData } from "./util.js/api.js";
import { renderElements } from "./util.js/renderElements.js";

export const initReserve = () => {
  const reserveForm = document.querySelector(".reserve__form");
  const { fieldsetmonth, fieldspec, fieldsetdate, fieldsettime, btn } =
    reserveForm;

  addDisaabled([fieldsetmonth, fieldspec, fieldsetdate, fieldsettime, btn]);

  reserveForm.addEventListener("change", async (event) => {
    const target = event.target;

    if (target.name === "service") {
      addDisaabled([fieldsetmonth, fieldspec, fieldsetdate, fieldsettime, btn]);
      fieldspec.innerHTML = `<legend class="reserve__legend">Специалист</legend>`;
      addPreload(fieldspec);

      const data = await getData(`${API_URL}api?service=${target.value}`);

      /* renderSpec(fieldspec, data);*/
      renderElements("label", "radio", fieldspec, data, "spec", "");
      removePreload(fieldspec);
      removeDisaabled([fieldspec]);
    }

    if (target.name === "spec") {
      addDisaabled([fieldsetmonth, fieldsetdate, fieldsettime, btn]);
      fieldsetmonth.innerHTML = "";
      addPreload(fieldsetmonth);

      const data = await getData(`${API_URL}api?spec=${target.value}`);

      /*renderMonth(fieldsetmonth, data);*/

      renderElements("label", "radio", fieldsetmonth, data, "month");
      removePreload(fieldsetmonth);
      removeDisaabled([fieldsetmonth]);
    }

    if (target.name === "month") {
      addDisaabled([fieldsetdate, fieldsettime, btn]);

      addPreload(fieldsetdate);

      const data = await getData(
        `${API_URL}api?spec=${reserveForm.spec.value}&month=${target.value}`
      );

      fieldsetdate.textContent = "";

      /*renderDay(fieldsetdate, data, reserveForm.spec.value);*/
      renderElements(
        "label",
        "radio",
        fieldsetdate,
        data,
        "day",
        reserveForm.spec.value
      );
      removePreload(fieldsetdate);
      removeDisaabled([fieldsetdate]);
    }

    if (target.name === "day") {
      addDisaabled([fieldsettime, btn]);

      addPreload(fieldsettime);

      const data = await getData(
        `${API_URL}api?spec=${reserveForm.spec.value}&month=${reserveForm.month.value}&day=${target.value}`
      );

      fieldsettime.textContent = "";

      renderElements("label", "radio", fieldsettime, data, "time");

      removePreload(fieldsettime);
      removeDisaabled([fieldsettime]);
    }
    if (target.name === "time") {
      removeDisaabled([btn]);
    }
  });
};
