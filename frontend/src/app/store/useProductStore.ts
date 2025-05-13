import { Product } from '../../types';
import { create } from 'zustand/react';
import { devtools } from 'zustand/middleware';
import axiosApi from '../../axiosApi.ts';

interface ProductsState {
  products: Product[];
  fetchLoading: boolean;
  fetchProducts: () => Promise<void>;
}

const useProductsStore = create<ProductsState>()(
  devtools((set) => ({
    products: [],
    fetchLoading: false,

    fetchProducts: async () => {
      set({fetchLoading: true}, false, 'productsStore/fetchProductsRequest');

      try {
        const response = await axiosApi<Product[]>('/products', {withCredentials: true});
        set({products: response.data || []}, false, 'productsStore/fetchProductsSuccess');
      } catch (e) {
        console.error(e);
      } finally {
        set({fetchLoading: false}, false, 'productsStore/fetchProductsEnd');
      }
    }
  }), {name: 'ProductsStore'})
);

export default useProductsStore;