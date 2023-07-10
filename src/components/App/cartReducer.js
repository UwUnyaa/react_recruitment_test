export const ACTION_INIT = 'init';
export const ACTION_SET = 'set_count';

export const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
      case ACTION_INIT: {
        return Object.fromEntries(
          payload.map((product) => [product.pid, product.min]));
      }
      case ACTION_SET: {
        const {pid, count} = payload;
        return {
          ...state,
          [pid]: count,
        };
      }
      default: {
        return state;
      }
    }
};

export default cartReducer;
