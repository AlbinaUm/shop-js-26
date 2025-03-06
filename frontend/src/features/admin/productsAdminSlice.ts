import { Product } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { createAdminProduct, fetchAdminProducts } from './productsAdminThunk.ts';
import { RootState } from '../../app/store.ts';

interface IAdminProductsState {
  items: Product[];
  fetchLoading: boolean;
  createLoading: boolean;
}

const initialState: IAdminProductsState = {
  items: [],
  fetchLoading: false,
  createLoading: false,
};

export const selectAdminProductsItems = (state: RootState) => state.adminProducts.items;
export const selectAdminFetchLoading = (state: RootState) =>
  state.adminProducts.fetchLoading;
export const selectAdminCreateLoading = (state: RootState) =>
  state.adminProducts.createLoading;

export const productsAdminSlice = createSlice({
  name: "admin/products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminProducts.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, { payload: products }) => {
        state.fetchLoading = false;
        state.items = products;
      })
      .addCase(fetchAdminProducts.rejected, (state) => {
        state.fetchLoading = false;
      })

      .addCase(createAdminProduct.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createAdminProduct.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createAdminProduct.rejected, (state) => {
        state.createLoading = false;
      });
  },
});

export const productsAdminReducer = productsAdminSlice.reducer;
