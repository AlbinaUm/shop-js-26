import Grid from '@mui/material/Grid2';
import { CircularProgress, Typography } from '@mui/material';
import { useCallback, useEffect } from 'react';
import ProductItem from '../components/ProductItem.tsx';
import useProductsStore from '../../../app/store/useProductStore.ts';
import { observer } from 'mobx-react-lite';

const Products = observer(() => {
  const {products, fetchLoading, fetchProducts} = useProductsStore();

  const fetchData = useCallback(
    async () => {
      await fetchProducts();
    }, [fetchProducts]);

  useEffect(() => {
    void fetchData();
  }, []);

  return (
    <Grid container direction={"column"} spacing={2}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid>
          <Typography variant="h4">Products123</Typography>
        </Grid>
      </Grid>

      <Grid container direction={"column"}>
        {fetchLoading ? (
          <CircularProgress />
        ) : (
          <>
            {products.length === 0 && !fetchLoading ? (
              <Typography variant="h6">No products yet</Typography>
            ) : (
              <>
                {products.map((product) => (
                  <ProductItem
                    key={product._id}
                    id={product._id}
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    image={product.image}
                    category={product.category}
                  />
                ))}
              </>
            )}
          </>
        )}
      </Grid>
    </Grid>
  );
});

export default Products;
