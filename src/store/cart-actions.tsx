import { Dispatch } from '@reduxjs/toolkit';
import { uiActions } from './ui-slice';
import { CartState, cartActions } from './cart-slice';

const BACKEND_URL =
  'https://react-http-dosanjosgustavo-default-rtdb.firebaseio.com/cart.json';

export const fetchCartData = () => {
  return async (dispatch: Dispatch) => {
    const fetchData = async () => {
      const response = await fetch(BACKEND_URL);

      if (!response.ok) {
        throw new Error('Could not fetch cart data!');
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();

      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: `Error! ${error}`,
          message: 'Fetching cart data failed!',
        })
      );
    }
  };
};

export const sendCartData = (cart: CartState) => {
  return async (dispatch: Dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      })
    );

    const sendRequest = async () => {
      const response = await fetch(BACKEND_URL, {
        method: 'PUT',
        body: JSON.stringify({
          items: cart.items,
          totalQuantity: cart.totalQuantity,
        }),
      });

      if (!response.ok) {
        throw new Error('Sending cart data failed.');
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully!',
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: `Error! ${error}`,
          message: 'Sent cart data failed!',
        })
      );
    }
  };
};
