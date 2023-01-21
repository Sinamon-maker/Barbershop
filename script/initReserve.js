import { API_URL } from "./var.js";
import { addPreload, removePreload } from "./loader.js";

const addDisaabled = (arr) => {
  arr.forEach((item) => {
    item.disabled = true;
  });
};

const removeDisaabled = (arr) => {
  arr.forEach((item) => {
    item.disabled = false;
  });
};

const renderSpec = (wrapper, data) => {
  const labels = data.map((spec) => {
    const label = document.createElement("label");
    label.classList.add("radio");

    label.innerHTML = `<input class="radio__input" name="spec" type="radio" value=${spec.id} />
                  <span
                    class="radio__label radio__label-spec"
                    style="--bg-image: url(${API_URL}${spec.img})"
                    >${spec.name}</span
                  >`;
    return label;
  });
  wrapper.append(...labels);
};

const renderMonth = (wrapper, data) => {
  console.log({ data });
  const labels = data.map((month) => {
    const label = document.createElement("label");
    label.classList.add("radio");

    label.innerHTML = `<input class="radio__input" name="month" type="radio" value = ${month} />
                  <span
                    class="radio__label"
                    
                    >${new Intl.DateTimeFormat("ru-RU", {
                      month: "long",
                    }).format(new Date(month))}</span
                  >`;
    return label;
  });
  wrapper.append(...labels);
};

const renderDay = (wrapper, data, month) => {
  const labels = data.map((day) => {
    const label = document.createElement("label");
    label.classList.add("radio");

    label.innerHTML = `<input class="radio__input" name="day" type="radio" value = ${day} />
                  <span
                    class="radio__label"
                    
                    >${new Intl.DateTimeFormat("ru-RU", {
                      month: "long",
                      day: "numeric",
                    }).format(new Date(`${month}/${day}`))}</span
                  >`;
    return label;
  });
  wrapper.append(...labels);
};

const renderTime = (wrapper, data) => {
  const labels = data.map((time) => {
    const label = document.createElement("label");
    label.classList.add("radio");

    label.innerHTML = `<input class="radio__input" name="time" type="radio" value = ${time} />
                  <span
                    class="radio__label"
                    
                    >${time}</span
                  >`;
    return label;
  });
  wrapper.append(...labels);
};

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
      const res = await fetch(`${API_URL}api?service=${target.value}`);
      const data = await res.json();

      renderSpec(fieldspec, data);
      removePreload(fieldspec);
      removeDisaabled([fieldspec]);
    }

    if (target.name === "spec") {
      addDisaabled([fieldsetmonth, fieldsetdate, fieldsettime, btn]);
      fieldsetmonth.innerHTML = "";
      addPreload(fieldsetmonth);
      const res = await fetch(`${API_URL}api?spec=${target.value}`);
      const data = await res.json();

      renderMonth(fieldsetmonth, data);
      removePreload(fieldsetmonth);
      removeDisaabled([fieldsetmonth]);
    }

    if (target.name === "month") {
      addDisaabled([fieldsetdate, fieldsettime, btn]);

      addPreload(fieldsetdate);

      const res = await fetch(
        `${API_URL}api?spec=${reserveForm.spec.value}&month=${target.value}`
      );
      const data = await res.json();

      fieldsetdate.textContent = "";

      renderDay(fieldsetdate, data, reserveForm.spec.value);
      removePreload(fieldsetdate);
      removeDisaabled([fieldsetdate]);
    }

    if (target.name === "day") {
      addDisaabled([fieldsettime, btn]);

      addPreload(fieldsettime);

      const res = await fetch(
        `${API_URL}api?spec=${reserveForm.spec.value}&month=${reserveForm.month.value}&day=${target.value}`
      );
      const data = await res.json();

      fieldsettime.textContent = "";

      renderTime(fieldsettime, data);
      removePreload(fieldsettime);
      removeDisaabled([fieldsettime]);
    }
    if (target.name === "time") {
      removeDisaabled([btn]);
    }
  });
};
