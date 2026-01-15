import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TAddIngredient,
  TConstructorState,
  TMoveIngredient,
  TOrder,
  TRemoveIngredient
} from '@utils-types';

export const initialState: TConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null
};

const burgerConstructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TAddIngredient>) => {
      const { ingredient } = action.payload;
      if (ingredient.type === 'bun') {
        state.constructorItems.bun = ingredient;
      } else {
        state.constructorItems.ingredients.push(ingredient);
      }
    },
    removeIngredient: (state, action: PayloadAction<TRemoveIngredient>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item._id !== action.payload.id
        );
    },

    moveIngredient: (state, action: PayloadAction<TMoveIngredient>) => {
      const { dragIndex, hoverIndex } = action.payload;
      const ingredients = [...state.constructorItems.ingredients];
      const dragged = ingredients[dragIndex];
      ingredients.splice(dragIndex, 1),
        ingredients.splice(hoverIndex, 0, dragged);
      state.constructorItems.ingredients = ingredients;
    },

    setOrderRequest: (state, action: PayloadAction<boolean>) => {
      state.orderRequest = action.payload;
    },

    setOrderModalData: (state, action: PayloadAction<TOrder | null>) => {
      state.orderModalData = action.payload;
    },

    resetConstructor: (state) => {
      state.constructorItems = {
        bun: null,
        ingredients: []
      };
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  setOrderRequest,
  setOrderModalData,
  resetConstructor
} = burgerConstructorSlice.actions;

export const burgerConstructorReducer = burgerConstructorSlice.reducer;
