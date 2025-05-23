const url = process.env.REACT_APP_API_URL;

export const getAbsoluteUrl = (image) => {
  console.log(`${url}/${image}`);
  return `${url}/${image}`;
};
