import { Category } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "./categoriesThunk.ts";
import { RootState } from "../../app/store.ts";

interface ICategoriesState {
  items: Category[];
  fetchLoading: boolean;
}

const initialState: ICategoriesState = {
  items: [],
  fetchLoading: false,
};

export const selectCategoriesItems = (state: RootState) =>
  state.categories.items;
export const selectFetchCategoriesLoading = (state: RootState) =>
  state.categories.fetchLoading;

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, { payload: products }) => {
        state.fetchLoading = false;
        state.items = products;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.fetchLoading = false;
      });
  },
});

export const categoriesReducer = categoriesSlice.reducer;
