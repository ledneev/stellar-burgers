import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';
import { TOrder } from '@utils-types';

type TOrdersResponse = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export const fetchUserOrders = createAsyncThunk<TOrdersResponse>(
  'profileOrders/fetchUserOrders',
  async () => {
    const response = await getOrdersApi();
    return response;
  }
);

type TProfileOrdersState = {
  orders: TOrdersResponse;
  loading: boolean;
  error: string | null;
  loaded: boolean;
};

const initialState: TProfileOrdersState = {
  orders: { orders: [], total: 0, totalToday: 0 },
  loading: false,
  error: null,
  loaded: false
};

export const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {
    resetProfileOrders: (state) => {
      state.orders = { orders: [], total: 0, totalToday: 0 };
      state.loaded = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.loaded = true;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка';
      });
  }
});

export const { resetProfileOrders } = profileOrdersSlice.actions;
export const profileOrdersReducer = profileOrdersSlice.reducer;
