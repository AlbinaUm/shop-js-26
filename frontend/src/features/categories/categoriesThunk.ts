import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import { Category } from "../../types";

export const fetchCategories = createAsyncThunk<Category[], void>(
  "categories/fetchCategories",
  async () => {
    const productsResponse = await axiosApi<Category[]>("/categories");
    return productsResponse.data || [];
  },
);
