import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  TUser,
  TLoginData,
  TRegisterData,
  TPasswordResetData,
  TPasswordForgotData
} from '@utils-types';
import {
  loginUserApi,
  registerUserApi,
  forgotPasswordApi,
  resetPasswordApi,
  getUserApi,
  updateUserApi,
  logoutApi
} from '@api';
import { deleteCookie, setCookie } from '../utils/cookie';

type TAuthState = {
  user: TUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isPasswordResetRequested: boolean;
};

export const initialState: TAuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  isPasswordResetRequested: false
};

export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
  const data = await getUserApi();
  return data.user;
});

export const login = createAsyncThunk(
  'auth/login',
  async (data: TLoginData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(data);
      localStorage.setItem('refreshToken', response.refreshToken);
      setCookie('accessToken', response.accessToken);
      return response.user;
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'message' in error) {
        return rejectWithValue((error as { message: string }).message);
      }
      return rejectWithValue('Ошибка при входе');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (data: TRegisterData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(data);
      localStorage.setItem('refreshToken', response.refreshToken);
      setCookie('accessToken', response.accessToken);
      return response.user;
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'message' in error) {
        return rejectWithValue((error as { message: string }).message);
      }
      return rejectWithValue('Ошибка при регистрации');
    }
  }
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (data: Partial<TRegisterData>, { rejectWithValue }) => {
    try {
      const response = await updateUserApi(data);
      return response.user;
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'message' in error) {
        return rejectWithValue((error as { message: string }).message);
      }
      return rejectWithValue('Ошибка при обновлении профиля');
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (data: TPasswordForgotData, { rejectWithValue }) => {
    try {
      await forgotPasswordApi(data);
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'message' in error) {
        return rejectWithValue((error as { message: string }).message);
      }
      return rejectWithValue('Ошибка при восстановлении пароля');
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (data: TPasswordResetData, { rejectWithValue }) => {
    try {
      await resetPasswordApi(data);
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'message' in error) {
        return rejectWithValue((error as { message: string }).message);
      }
      return rejectWithValue('Ошибка при сбросе пароля');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    try {
      const response = await logoutApi();
    } catch (error) {
    } finally {
      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      .addCase(forgotPassword.fulfilled, (state) => {
        state.isPasswordResetRequested = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      .addCase(resetPassword.fulfilled, (state) => {
        state.isPasswordResetRequested = false;
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },

  selectors: {
    selectUser: (state) => state.user,
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectIsLoading: (state) => state.isLoading,
    selectError: (state) => state.error,
    selectIsPasswordResetRequested: (state) => state.isPasswordResetRequested
  }
});

export const {
  selectUser,
  selectIsAuthenticated,
  selectIsLoading,
  selectError,
  selectIsPasswordResetRequested
} = authSlice.selectors;

export const authReducer = authSlice.reducer;
