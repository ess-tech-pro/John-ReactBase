import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CartsResponse } from "../../types/product";
import { getCarts } from "../../services/homeService";

export const fetchCarts = createAsyncThunk<CartsResponse>(
  "carts/fetchCarts",
  async (_, thunkAPI) => {
    try {
      const response = await getCarts();
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

const exampleSlice = createSlice({
  name: "example",
  initialState: {
    value: 0,
    carts: [] as CartsResponse["carts"],
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCarts.fulfilled, (state, action) => {
      state.carts = action.payload.carts;
    });
  },
});

export const { increment, decrement } = exampleSlice.actions;
export default exampleSlice.reducer;
