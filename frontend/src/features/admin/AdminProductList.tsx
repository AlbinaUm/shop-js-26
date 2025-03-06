import Grid from '@mui/material/Grid2';
import { Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../users/usersSlice.ts';
import { useEffect } from 'react';
import { fetchAdminProducts } from './productsAdminThunk.ts';
import { selectAdminProductsItems } from './productsAdminSlice.ts';
import { Product } from '../../types';
import { GridColDef, DataGrid } from '@mui/x-data-grid';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';

const AdminProductList = () => {
  const user = useAppSelector(selectUser);
  const products = useAppSelector(selectAdminProductsItems);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, []);

  const columns: GridColDef<Product>[] = [
    { field: '_id', headerName: 'ID', width: 90 },
    {
      field: 'category',
      headerName: 'Category',
      width: 150,
      editable: false,
      valueGetter: (_value, row: Product) => row.category.title,
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 150,
      editable: false,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 150,
      editable: false,
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 160,
      editable: false,
    },
    {
      field: 'actions',
      headerName: '',
      sortable: false,
      editable: false,
      filterable: false,
      width: 100,
      renderCell: () => (
        <>
          <IconButton>
            <ClearIcon/>
          </IconButton>

          <IconButton>
            <EditIcon/>
          </IconButton>
        </>
      )
    },
  ];


  return (
    <Grid container>
      <Grid>

        {user && user.role === 'admin' && (
          <Button color="primary" component={Link} to="/admin/products/new">
            Add product
          </Button>
        )}
      </Grid>

      <Grid>
        <DataGrid
          getRowId={(row) => row._id}
          rows={products}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Grid>
    </Grid>
  );
};

export default AdminProductList;