import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TAddIngredient, TConstructorState, TOrder } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

const initialState: TConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TAddIngredient>) => {
      const { ingredient } = action.payload;

      if (ingredient.type === 'bun') {
        state.constructorItems.bun = ingredient;
      } else {
        state.constructorItems.ingredients = [
          ...state.constructorItems.ingredients,
          ingredient
        ];
      }
    },
    removeIngredient: (state, action: PayloadAction<{ id: string }>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload.id
        );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;
      const ingredients = [...state.constructorItems.ingredients];
      const [moved] = ingredients.splice(fromIndex, 1);
      ingredients.splice(toIndex, 0, moved);
      state.constructorItems.ingredients = ingredients;
    },
    resetConstructor: (state) => {
      state.constructorItems.bun = null;
      state.constructorItems.ingredients = [];
      state.orderModalData = null;
    },
    setOrderModalData: (state, action: PayloadAction<TOrder | null>) => {
      state.orderModalData = action.payload;
    },
    setOrderRequest: (state, action: PayloadAction<boolean>) => {
      state.orderRequest = action.payload;
    }
  },
  selectors: {
    selectConstructorItems: (state) => state.constructorItems,
    selectOrderRequest: (state) => state.orderRequest,
    selectOrderModalData: (state) => state.orderModalData
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  resetConstructor,
  setOrderModalData,
  setOrderRequest
} = burgerConstructorSlice.actions;

export const {
  selectConstructorItems,
  selectOrderRequest,
  selectOrderModalData
} = burgerConstructorSlice.selectors;

export const burgerConstructorReducer = burgerConstructorSlice.reducer;
