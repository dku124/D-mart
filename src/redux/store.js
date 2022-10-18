import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartSlice';

var store = configureStore({ reducer: { cart: cartSlice } });

export default store;
