import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import { CocktailMutation, Product, ProductMutation } from '../../types';

export const fetchAdminProducts = createAsyncThunk<Product[], void>(
  "admin/products/fetchAdminProducts",
  async () => {
    const productsResponse = await axiosApi<Product[]>("/admin/products");
    return productsResponse.data || [];
  },
);

export const createAdminProduct = createAsyncThunk<void, ProductMutation>(
  "admin/products/createAdminProduct",
  async (productMutation) => {
    const formData = new FormData();

    const keys = Object.keys(productMutation) as (keyof ProductMutation)[]; // [title, price]

    keys.forEach((key) => {
      const value = productMutation[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post("/admin/products", formData);
  },
);

export const createCocktail = createAsyncThunk<void, CocktailMutation>(
  "admin/cocktail/createCocktail",
  async (cocktailMutation) => {
    const formData = new FormData();

    const keys = Object.keys(cocktailMutation) as (keyof CocktailMutation)[];

    keys.forEach((key) => {
      const value = cocktailMutation[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post("/cocktails", formData);
  },
);
