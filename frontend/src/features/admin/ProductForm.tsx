import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import { Button, FormControl, MenuItem, Select, SelectChangeEvent, TextField, } from '@mui/material';
import { ProductMutation } from '../../types';
import InputLabel from '@mui/material/InputLabel';
import FileInput from '../../components/FileInput/FileInput.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { fetchCategories } from '../categories/categoriesThunk.ts';
import { selectCategoriesItems, } from '../categories/categoriesSlice.ts';
import { Editor } from '@tinymce/tinymce-react';

interface Props {
  onSubmit: (product: ProductMutation) => void;
}

const initialState = {
  category: "",
  title: "",
  price: "",
  description: "",
  image: null,
};

const ProductForm: React.FC<Props> = ({ onSubmit }) => {
  const [form, setForm] = useState<ProductMutation>(initialState);
  const dispatch = useAppDispatch();

  const categories = useAppSelector(selectCategoriesItems);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const submitFormHandler = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ ...form });
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const selectChangeHandler = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const fileEventChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files) {
      setForm((prevState) => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  return (
    <form onSubmit={submitFormHandler}>
      <Grid container direction="column" spacing={2}>
        {categories.length === 0 ? null : (
          <Grid size={{ xs: 12 }}>
            <FormControl fullWidth>
              <InputLabel id="category">Category</InputLabel>
              <Select
                labelId="category"
                id="category_id"
                value={form.category}
                name="category"
                required
                label="Category"
                onChange={selectChangeHandler}
              >
                <MenuItem value="" disabled>
                  Select category
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}

        <Grid size={{ xs: 12 }}>
          <TextField
            id="title"
            name="title"
            label="Title"
            required
            value={form.title}
            onChange={inputChangeHandler}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            id="price"
            name="price"
            label="Price"
            required
            value={form.price}
            onChange={inputChangeHandler}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Editor
            tinymceScriptSrc='/tinymce/tinymce.min.js'
            licenseKey='gpl'
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
            value={form.description}
            onEditorChange={(content) => setForm({ ...form, description: content })}
          />
          {/*<TextField*/}
          {/*  multiline*/}
          {/*  id="description"*/}
          {/*  name="description"*/}
          {/*  label="Description"*/}
          {/*  value={form.description}*/}
          {/*  onChange={inputChangeHandler}*/}
          {/*/>*/}
        </Grid>

        <Grid size={{ xs: 12 }}>
          <FileInput
            name="image"
            label="Image"
            onGetFile={fileEventChangeHandler}
          />
        </Grid>

        <Grid>
          <Button type="submit" color="primary">
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProductForm;
