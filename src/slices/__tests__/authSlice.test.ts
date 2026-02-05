import { authReducer as reducer } from '../authSlice';

const mockUser = {
  name: 'Иван',
  email: 'ivan@example.com'
};

describe('authSlice', () => {
  const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    isPasswordResetRequested: false
  };

  it('должен установить loading при pending', () => {
    const action = { type: 'auth/login/pending' };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен сохранить пользователя и установить isAuthenticated', () => {
    const action = {
      type: 'auth/login/fulfilled',
      payload: mockUser
    };
    const state = reducer(initialState, action);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
    expect(state.isLoading).toBe(false);
  });

  it('должен установить ошибку при rejected', () => {
    const action = {
      type: 'auth/login/rejected',
      payload: 'Ошибка входа'
    };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка входа');
  });

  it('должен выйти и очистить пользователя', () => {
    const stateWithUser = {
      ...initialState,
      user: mockUser,
      isAuthenticated: true
    };
    const action = { type: 'auth/logout/fulfilled' };
    const state = reducer(stateWithUser, action);
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });
});
