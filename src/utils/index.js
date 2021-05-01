export const chunkArray = (arr, size) =>
  arr.length > size
    ? [arr.slice(0, size), ...chunkArray(arr.slice(size), size)]
    : [arr];

export const isEmpty = (data) => {
  if (Array.isArray(data)) {
    return data.length === 0;
  }

  return JSON.stringify(data) === "{}";
};
