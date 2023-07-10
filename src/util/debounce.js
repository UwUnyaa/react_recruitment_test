// Return a debounced function called at most once every time (in
// milliseconds), at the end of that period.
export const debounce = (callback, time = 1000) => {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { callback(...args); }, time);
  };
};

export default debounce;
