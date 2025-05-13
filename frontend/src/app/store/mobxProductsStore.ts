import { makeAutoObservable, runInAction } from 'mobx';
import { Product } from '../../types';
import axiosApi from '../../axiosApi.ts';

export class MobxProductsStore {
  products: Product[] = [];
  fetchLoading = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async fetchProducts() {
    this.fetchLoading = true;

    try {
      const response = await axiosApi<Product[]>('/products');
      runInAction(() => {
        this.products = response.data || [];
      }
      )
    } catch (e) {

    } finally {
      runInAction(() => {
        this.fetchLoading = false;
      })
    }
  }
}

export const mobxProductsStore = new MobxProductsStore();