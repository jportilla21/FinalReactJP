// import { useReducer, createContext } from 'react';
// import { cartReducer, cartInitialState } from '../reducers/cart';

// export const CartContext = createContext();

// function useCartReducer() {
//   const [state, dispatch] = useReducer(cartReducer, cartInitialState);

//   const addToCart = (product) =>
//     dispatch({
//       type: 'ADD_TO_CART',
//       payload: product,
//     });

//   const removeFromCart = (product) =>
//     dispatch({
//       type: 'REMOVE_FROM_CART',
//       payload: product,
//     });

//   const clearCart = () => dispatch({ type: 'CLEAR_CART' });

//   return { state, addToCart, removeFromCart, clearCart };
// }

// export function CartProvider({ children }) {
//   const { state, addToCart, removeFromCart, clearCart } = useCartReducer();

//   return (
//     <CartContext.Provider
//       value={{
//         cart: state,
//         addToCart,
//         removeFromCart,
//         clearCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

import { useReducer, createContext } from 'react';

const cartInitialState = [];

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return addToCart(state, action.payload);

    case 'REMOVE_FROM_CART':
      return removeFromCart(state, action.payload);

    case 'REMOVE_PRODUCT':
      return removeProduct(state, action.payload);

    case 'CLEAR_CART':
      return [];

    default:
      return state;
  }
};

const addToCart = (state, product) => {
  const existingProductIndex = state.findIndex((p) => p.id === product.id);

  if (existingProductIndex !== -1) {
    const updatedState = [...state];
    updatedState[existingProductIndex].quantity += 1;
    return updatedState;
  }

  return [...state, { ...product, quantity: 1 }];
};

const removeFromCart = (state, product) => {
  const existingProductIndex = state.findIndex((p) => p.id === product.id);

  if (existingProductIndex !== -1 && state[existingProductIndex].quantity > 1) {
    const updatedState = [...state];
    updatedState[existingProductIndex].quantity -= 1;
    return updatedState;
  }

  return state.filter((p) => p.id !== product.id);
};

const removeProduct = (state, productId) => {
  return state.filter((product) => product.id !== productId);
};

export const CartContext = createContext();

function useCartReducer() {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState);

  return { state, dispatch };
}

export function CartProvider({ children }) {
  const { state, dispatch } = useCartReducer();

  const contextValue = {
    cart: state,
    addToCart: (product) => dispatch({ type: 'ADD_TO_CART', payload: product }),
    removeFromCart: (product) => dispatch({ type: 'REMOVE_FROM_CART', payload: product }),
    removeProduct: (productId) => dispatch({ type: 'REMOVE_PRODUCT', payload: productId }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' }),
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}
