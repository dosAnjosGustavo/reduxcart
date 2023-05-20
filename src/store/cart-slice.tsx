import { createSlice } from '@reduxjs/toolkit';

export interface uiState {
  cartIsVisible: boolean;
}

export interface CartItem {
  id: string;
  price: number;
  quantity: number;
  totalPrice: number;
  name: string;
}

export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  changed: boolean;
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [] as CartItem[],
    totalQuantity: 0,
    changed: false,
  } as CartState,
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
      state.changed = action.payload.changed;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === id
      ) as CartItem;
      state.totalQuantity--;
      state.changed = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
