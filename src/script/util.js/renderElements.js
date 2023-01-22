import { innerTextToRender } from "./innerTextToRender.js";

export const renderElements = (
  elem,
  className,
  wrapper,
  data,
  type,
  month = ""
) => {
  const elements = data.map((item) => {
    const element = document.createElement(elem);
    element.classList.add(className);
    let text;

    if (type === "day") {
      text = innerTextToRender(type, { day: item, month });
    } else {
      text = innerTextToRender(type, item);
    }
    element.innerHTML = `${text}`;
    return element;
  });
  wrapper.append(...elements);
};
