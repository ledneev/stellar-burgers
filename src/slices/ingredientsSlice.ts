import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

export type TIngredientsState = {
  ingredients: TIngredient[];
  loading: boolean;
  error: null | string;
};

export const initialState: TIngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    try {
      const data = await getIngredientsApi();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectLoading: (state) => state.loading,
    selectError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        console.log('fetchIngredients.pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        console.log(
          'fetchIngredients.fulfilled:',
          action.payload.length,
          'items'
        );
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        console.log('fetchIngredients.rejected:', action.error);
        state.loading = false;
        state.error =
          action.error.message || 'Ошибка при загрузке ингредиентов';
      });
  }
});

export const { selectIngredients, selectLoading, selectError } =
  ingredientsSlice.selectors;
export const ingredientsReducer = ingredientsSlice.reducer;
