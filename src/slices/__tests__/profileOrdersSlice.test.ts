import { profileOrdersReducer as reducer } from '../profileOrdersSlice';

const mockOrders = [
  {
    _id: '1',
    ingredients: ['123'],
    status: 'done',
    number: 12345,
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z'
  }
];

describe('profileOrdersSlice', () => {
  const initialState = {
    orders: { orders: [], total: 0, totalToday: 0 },
    loading: false,
    error: null,
    loaded: false
  };

  it('должен установить loading при pending', () => {
    const action = { type: 'profileOrders/fetchUserOrders/pending' };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('должен сохранить заказы', () => {
    const action = {
      type: 'profileOrders/fetchUserOrders/fulfilled',
      payload: { orders: mockOrders, total: 10, totalToday: 2 }
    };
    const state = reducer(initialState, action);
    expect(state.orders.orders).toEqual(mockOrders);
    expect(state.orders.total).toBe(10);
    expect(state.orders.totalToday).toBe(2);
    expect(state.loading).toBe(false);
    expect(state.loaded).toBe(true);
  });

  it('должен установить ошибку', () => {
    const action = {
      type: 'profileOrders/fetchUserOrders/rejected',
      error: { message: 'Ошибка' }
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });
});
