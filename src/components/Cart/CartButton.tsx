import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './CartButton.module.css';
import { uiActions } from '../../store/ui-slice';
import { storeState } from '../../store';

const CartButton = () => {
  const dispatch = useDispatch();
  const cartQuantity = useSelector(
    (state: storeState) => state.cart.totalQuantity
  );

  const toggleCartHandler = () => {
    dispatch(uiActions.toggle());
  };

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
