export const receiveDate = (year, month, day = 1) => {
  const date = new Date(year, +month - 1, day);
  return date;
};

export const formatDate = (year, month, options, day = 1) => {
  const date = receiveDate(year, month, day);
  return new Intl.DateTimeFormat("ru-RU", options).format(date);
};
