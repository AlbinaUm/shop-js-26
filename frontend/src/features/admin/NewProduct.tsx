import ProductForm from './ProductForm.tsx';
import { ProductMutation } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CircularProgress } from '@mui/material';
import { createAdminProduct } from './productsAdminThunk.ts';
import { selectAdminCreateLoading } from './productsAdminSlice.ts';

const NewProduct = () => {
  const dispatch = useAppDispatch();
  const isCreateLoading = useAppSelector(selectAdminCreateLoading);
  const navigate = useNavigate();

  const onSubmitForm = async (product: ProductMutation) => {
    try {
      await dispatch(createAdminProduct(product)).unwrap();
      toast.success("Product was successfully created!");
      navigate("/products");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {isCreateLoading ? (
        <CircularProgress />
      ) : (
        <ProductForm onSubmit={onSubmitForm} />
      )}
    </>
  );
};

export default NewProduct;
