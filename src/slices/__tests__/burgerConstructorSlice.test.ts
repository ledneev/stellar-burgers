import { burgerConstructorReducer as reducer } from '../burgerConstructorSlice';
import { v4 as uuidv4 } from 'uuid';

jest.mock('uuid', () => ({
  v4: () => 'test-uuid'
}));

const mockIngredient = {
  _id: '123',
  name: 'Test Bun',
  type: 'bun',
  price: 100,
  proteins: 10,
  fat: 10,
  carbohydrates: 10,
  calories: 100,
  image: '',
  image_mobile: '',
  image_large: ''
};

describe('burgerConstructorSlice', () => {
  const initialState = {
    constructorItems: {
      bun: null,
      ingredients: []
    },
    orderRequest: false,
    orderModalData: null
  };

  it('должен добавить булку', () => {
    const action = {
      type: 'burgerConstructor/addIngredient',
      payload: { ingredient: { ...mockIngredient, type: 'bun' } }
    };
    const state = reducer(initialState, action);
    expect(state.constructorItems.bun).toEqual(mockIngredient);
  });

  it('должен добавить начинку', () => {
    const action = {
      type: 'burgerConstructor/addIngredient',
      payload: { ingredient: { ...mockIngredient, type: 'main' } }
    };
    const state = reducer(initialState, action);
    expect(state.constructorItems.ingredients).toHaveLength(1);
    expect(state.constructorItems.ingredients[0].id).toBe('test-uuid');
  });

  it('должен удалить ингредиент', () => {
    const stateWithIngredient = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [{ ...mockIngredient, id: 'test-uuid' }]
      }
    };
    const action = {
      type: 'burgerConstructor/removeIngredient',
      payload: { id: 'test-uuid' }
    };
    const state = reducer(stateWithIngredient, action);
    expect(state.constructorItems.ingredients).toHaveLength(0);
  });

  it('должен изменить порядок ингредиентов', () => {
    const stateWithIngredients = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [
          { ...mockIngredient, id: '1', name: 'One' },
          { ...mockIngredient, id: '2', name: 'Two' }
        ]
      }
    };
    const action = {
      type: 'burgerConstructor/moveIngredient',
      payload: { fromIndex: 0, toIndex: 1 }
    };
    const state = reducer(stateWithIngredients, action);
    expect(state.constructorItems.ingredients[0].name).toBe('Two');
  });
});
