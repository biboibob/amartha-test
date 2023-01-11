export const setLocalStorage = (key, val) => {
  localStorage.setItem(key, JSON.stringify(val));
};

export const getLocalStorage = (val) => {
  const value = JSON.parse(localStorage.getItem(val) || "null");
  return value;
};

export const removeLocalStorage = (val) => {
  localStorage.removeItem(val);
};

export const removeAll = () => {
  localStorage.clear();
};
