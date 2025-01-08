import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createProduct, getProducts } from "../../services/homeService";
import { CreateProductRequest, CreateProductResponse, ProductResponse } from "../../schemas";
import { ActionTypes } from "../constants/actionTypes";
import { NameSlices } from "../constants/nameSlices";

export const fetchProducts = createAsyncThunk<ProductResponse>(
  ActionTypes.PRODUCTS.FETCH_PRODUCTS,
  async (_, thunkAPI) => {
    try {
      const response = await getProducts();
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

export const postCart = createAsyncThunk<CreateProductResponse, CreateProductRequest>(
  ActionTypes.PRODUCTS.POST_CART,
  async (cartData, thunkAPI) => {
    try {
      const response = await createProduct(cartData);
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
  name: NameSlices.EXAMPLE,
  initialState: {
    value: 0,
    products: [] as ProductResponse["products"],
    
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
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload.products;
    });
  },
});

export const { increment, decrement } = exampleSlice.actions;
export default exampleSlice.reducer;
