import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import { Product } from "../../types";

export const fetchProducts = createAsyncThunk<Product[], void>(
  "products/fetchProducts",
  async () => {
    const productsResponse = await axiosApi<Product[]>("/products");
    return productsResponse.data || [];
  },
);
