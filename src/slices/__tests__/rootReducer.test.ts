import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from '../../slices/ingredientsSlice';
import { burgerConstructorReducer } from '../../slices/burgerConstructorSlice';
import { authReducer } from '../../slices/authSlice';
import { feedReducer } from '../../slices/feedSlice';
import { profileOrdersReducer } from '../../slices/profileOrdersSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  auth: authReducer,
  feed: feedReducer,
  profileOrders: profileOrdersReducer
});

describe('rootReducer', () => {
  it('должен возвращать начальное состояние всех слайсов', () => {
    const state = rootReducer(undefined, { type: 'INIT' });

    expect(state.ingredients).toEqual({
      ingredients: [],
      loading: false,
      error: null
    });

    expect(state.burgerConstructor).toEqual({
      constructorItems: { bun: null, ingredients: [] },
      orderRequest: false,
      orderModalData: null
    });

    expect(state.auth).toEqual({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      isPasswordResetRequested: false
    });

    expect(state.feed).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      isLoading: false,
      error: null,
      loaded: false
    });

    expect(state.profileOrders).toEqual({
      orders: { orders: [], total: 0, totalToday: 0 },
      loading: false,
      error: null,
      loaded: false
    });
  });

  it('должен вернуть начальное состояние при неизвестном экшене', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state.ingredients).toEqual({
      ingredients: [],
      loading: false,
      error: null
    });

    expect(state.burgerConstructor).toEqual({
      constructorItems: { bun: null, ingredients: [] },
      orderRequest: false,
      orderModalData: null
    });

    expect(state.auth).toEqual({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      isPasswordResetRequested: false
    });

    expect(state.feed).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      isLoading: false,
      error: null,
      loaded: false
    });

    expect(state.profileOrders).toEqual({
      orders: { orders: [], total: 0, totalToday: 0 },
      loading: false,
      error: null,
      loaded: false
    });
  });
});
