import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NameSlices } from '../constants/nameSlices';
import { ActionTypes } from '../constants/actionTypes';
import { login as loginService } from '../../services/loginService';
import {
  LoginRequest,
  LoginResponse,
  LoginResponseSchema,
} from '../../schemas';

export const login = createAsyncThunk<LoginResponse, LoginRequest>(
  ActionTypes.AUTH.LOGIN,
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await loginService({ email, password });

      if (response.accessToken && response.user) {
        const validatedResponse = LoginResponseSchema.validateSync(response, {
          abortEarly: false,
        });

        return validatedResponse;
      }

      return thunkAPI.rejectWithValue('Invalid response');
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  },
);

const loginReducer = createSlice({
  name: NameSlices.LOGIN,
  initialState: {
    accessToken: '',
    user: {},
  },
  reducers: {
    // setToken: (state, action: PayloadAction<string>) => {
    //   state.accessToken = action.payload;
    // },
    // setUser: (state, action: PayloadAction<LoginResponse['user']>) => {
    //   state.user = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload;
    });
  },
});

// export const { setToken, setUser } = loginReducer.actions;
export default loginReducer.reducer;
