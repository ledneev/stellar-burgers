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
};

const initialState: TProfileOrdersState = {
  orders: { orders: [], total: 0, totalToday: 0 },
  loading: false,
  error: null
};

export const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки заказов';
      });
  }
});

export const profileOrdersReducer = profileOrdersSlice.reducer;
