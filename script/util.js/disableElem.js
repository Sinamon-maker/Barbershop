export const addDisaabled = (arr) => {
  arr.forEach((item) => {
    item.disabled = true;
  });
};

export const removeDisaabled = (arr) => {
  arr.forEach((item) => {
    item.disabled = false;
  });
};
