import { feedReducer as reducer } from '../feedSlice';

const mockOrders = [
  {
    _id: '1',
    ingredients: ['123', '456'],
    status: 'done',
    number: 12345,
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z'
  }
];

describe('feedSlice', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    isLoading: false,
    error: null,
    loaded: false
  };

  it('должен установить loading при pending', () => {
    const action = { type: 'feed/fetch/pending' };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  it('должен сохранить заказы при fulfilled', () => {
    const action = {
      type: 'feed/fetch/fulfilled',
      payload: {
        orders: mockOrders,
        total: 100,
        totalToday: 5
      }
    };
    const state = reducer(initialState, action);
    expect(state.orders).toEqual(mockOrders);
    expect(state.total).toBe(100);
    expect(state.totalToday).toBe(5);
    expect(state.isLoading).toBe(false);
    expect(state.loaded).toBe(true);
  });

  it('должен установить ошибку при rejected', () => {
    const action = {
      type: 'feed/fetch/rejected',
      error: { message: 'Ошибка' }
    };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });
});
