export const getData = async (url) => {
  return await fetch(url).then((res) => res.json());
};

export const postData = (url, body) =>
  fetch(url, {
    method: "post",
    body,
  }).then((res) => res.json());
