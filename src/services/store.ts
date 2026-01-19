import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import {
  fetchIngredients,
  ingredientsReducer
} from '../slices/ingredientsSlice';
import { burgerConstructorReducer } from '../slices/burgerConstructorSlice';
import { authReducer } from '../slices/authSlice';
import { feedReducer } from '../slices/feedSlice';
import { profileOrdersReducer } from '../slices/profileOrdersSlice';

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    auth: authReducer,
    feed: feedReducer,
    profileOrders: profileOrdersReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});
store.dispatch(fetchIngredients());
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
