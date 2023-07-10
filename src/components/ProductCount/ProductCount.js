import React, { useCallback } from 'react';

import checkProductCount from './checkProductCount';

export const ProductCount = (props) => {
  const {
    min = 1,
    max = Infinity,
    isBlocked = false,
    pid,
    setCount = () => {},
    count,
  } = props;

  const updateCount = useCallback((newCount) => {
    checkProductCount(pid, newCount, () => setCount(min));
    setCount(newCount);
  }, [pid, min, setCount]);

  return (
    <div className="product-count">
      <button onClick={() => updateCount(Math.min(max, count + 1))}
              disabled={isBlocked}
              aria-label="Zwiększ ilość">
        +
      </button>
      {' '}
      <button onClick={() => updateCount(Math.max(min, count - 1))}
              disabled={isBlocked}
              aria-label="Zmniejsz ilość">
        -
      </button>
      {' '}
      Obecnie masz {count} sztuk produktu
    </div>
  );
};

export default ProductCount;
