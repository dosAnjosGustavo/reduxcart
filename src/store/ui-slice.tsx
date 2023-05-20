import { createSlice } from '@reduxjs/toolkit';

export interface notification {
  status: string;
  title: string;
  message: string;
}

export interface uiState {
  cartIsVisible: boolean;
  notification: null | notification;
}

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    cartIsVisible: false,
    notification: null,
  } as uiState,
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
