import axios from "axios";
import { CartsResponse, ProductsResponse } from "../types/product";

const api = axios.create({
  baseURL: "https://dummyjson.com/",
});

export const getProducts = async (): Promise<ProductsResponse> => {
  const response = await api.get("products");
  return response.data;
};

export const getCarts = async (): Promise<CartsResponse> => {
  const response = await api.get("carts");
  return response.data;
};
