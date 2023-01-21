export const getData = async (url) => {
  return await fetch(url).then((res) => res.json());
};
