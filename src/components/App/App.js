import React, { useReducer, useEffect, useMemo, useCallback } from 'react';
import './App.css';

import ProductCount from '../ProductCount/ProductCount';

import cartReducer, { ACTION_INIT, ACTION_SET } from './cartReducer';

import useGetJSON from '../../hooks/useGetJSON';
import formatPrice from '../../util/formatPrice';

const App = () => {

  const cartData = useGetJSON('/api/cart');

  const [state, dispatch] = useReducer(cartReducer, {});

  const updateCount = useCallback(
    (pid) => (count) => {
      dispatch({
        type: ACTION_SET,
        payload: { pid, count },
      });
    }, []);

  // Initialize the cart reducer with data from API once it loads
  useEffect(() => {
    if (cartData) {
      dispatch({
        type: ACTION_INIT,
        payload: cartData,
      });
    }
  }, [cartData]);

  // Calculate the total price
  const total = useMemo(() => {
    if (!cartData) {
      return 0;
    }

    return Object.entries(state)
      .reduce((total, [pid, count]) => {
        const price = parseFloat(
          cartData.find((product) => product.pid === pid)?.price ?? 0);

        return total + (count * price);
      }, 0);
  }, [cartData, state]);

  return (
    <div className="container">
      <h3>Lista produktów</h3>
      {cartData
       ? (<>
            <ul>
              {cartData.map((product) => {
                const { pid, name, price, min, max, isBlocked } = product;
                const count = state[pid] ?? 0;

                return (
                  <li key={product.pid}>
                    {product.name}, cena: {formatPrice(product.price)}
                    <ProductCount
                      min={min}
                      max={max}
                      isBlocked={isBlocked}
                      pid={pid}
                      count={count}
                      setCount={updateCount(pid)}
                    />
                  </li>
                );
              })}
            </ul>
            <h4>Suma całkowita: {formatPrice(total)}</h4>
          </>)
       : ('Trwa ładowanie')}
    </div>
  );
};

export { App };
