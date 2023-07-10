// Format a price value into a string.
export const formatPrice = (price) => {
  const formatted = parseFloat(price).toFixed(2).replace('.', ',');

  return `${formatted}zł`;
};

export default formatPrice;
