/* Local Storage */
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

/* Session Storage */
export const setSessionStorage = (key, val) => {
  sessionStorage.setItem(key, JSON.stringify(val));
};

export const getSessionStorage = (val) => {
  const value = JSON.parse(sessionStorage.getItem(val) || "null");
  return value;
};

export const removeSessionStorage = (val) => {
  sessionStorage.removeItem(val);
};

export const removeAllSession = () => {
  sessionStorage.clear();
};
