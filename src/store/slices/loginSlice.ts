import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NameSlices } from '../constants/nameSlices';
import { ActionTypes } from '../constants/actionTypes';
import { login as loginService } from '../../services/loginService';
import { LoginRequest, LoginResponse } from '../../schemas';

export const login = createAsyncThunk<LoginResponse, LoginRequest>(
  ActionTypes.AUTH.LOGIN,
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await loginService({ email, password });

      return response;
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
    user: {
      id: 0,
      username: '',
      email: '',
      role: '',
      firstName: '',
      lastName: '',
      gender: '',
      image: '',
      refreshToken: '',
    },
  } as LoginResponse,
  reducers: {
    // setToken: (state, action: PayloadAction<string>) => {
    //   state.accessToken = action.payload;
    // },
    // setUser: (
    //   state,
    //   action: PayloadAction<Omit<LoginResponse, 'accessToken'>>,
    // ) => {
    //   state.user = {
    //     id: action.payload.id,
    //     username: action.payload.username,
    //     email: action.payload.email,
    //   };
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    });
  },
});

// export const { setToken, setUser } = loginReducer.actions;
export default loginReducer.reducer;
