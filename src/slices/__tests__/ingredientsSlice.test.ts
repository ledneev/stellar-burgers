import { ingredientsReducer as reducer } from '../ingredientsSlice';

const mockIngredients = [
  {
    _id: '123',
    name: 'Test',
    type: 'bun',
    price: 100,
    proteins: 10,
    fat: 10,
    carbohydrates: 10,
    calories: 100,
    image: '',
    image_mobile: '',
    image_large: ''
  }
];

describe('ingredientsSlice', () => {
  const initialState = {
    ingredients: [],
    loading: false,
    error: null
  };

  it('должен установить loading в true при pending', () => {
    const action = { type: 'ingredients/fetchIngredients/pending' };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен сохранить ингредиенты при fulfilled', () => {
    const action = {
      type: 'ingredients/fetchIngredients/fulfilled',
      payload: mockIngredients
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual(mockIngredients);
  });

  it('должен установить ошибку при rejected', () => {
    const action = {
      type: 'ingredients/fetchIngredients/rejected',
      error: { message: 'Ошибка' }
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });
});
