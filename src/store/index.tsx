import { configureStore } from '@reduxjs/toolkit';
import uiReducer, { uiState } from './ui-slice';
import cartReducer, { CartState } from './cart-slice';

export interface storeState {
  ui: uiState;
  cart: CartState;
}

export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: { ui: uiReducer, cart: cartReducer },
});

export default store;
