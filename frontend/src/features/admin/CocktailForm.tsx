import { ChangeEvent, FormEvent, useState } from 'react';
import Grid from '@mui/material/Grid2';
import { Button, TextField, } from '@mui/material';
import { CocktailMutation } from '../../types';
import FileInput from '../../components/FileInput/FileInput.tsx';
import { useAppDispatch } from '../../app/hooks.ts';
import { Editor } from '@tinymce/tinymce-react';
import { createCocktail } from './productsAdminThunk.ts';

const initialState = {
  title: "",
  description: "",
  ingredients: '',
  image: null,
};

const CocktailForm = () => {
  const [form, setForm] = useState<CocktailMutation>(initialState);
  const [ingredients, setIngredients] = useState<{name: string; amount: number}[]>([]);
  const dispatch = useAppDispatch();

  const submitFormHandler = (e: FormEvent) => {
    e.preventDefault();
    dispatch(createCocktail({...form, ingredients: JSON.stringify(ingredients)}));
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
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

  const addIngredient = () => {
    setIngredients(prev => [...prev, {name: '', amount: 0}]);
  };

  const deleteIngredient = (index: number) => {
    setIngredients(ingredients.filter((_ing, i) => i !== index));
  };

  const onChangeIngredientsInputs = (i: number, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value, name} = e.target;
    setIngredients(ingredients.map((ing, index) => {
      const ingCopy = {
        ...ingredients[i],
        [name]: value,
      };

      if (index === i) return ingCopy;

      return ing;
    }));
  };

  return (
    <form onSubmit={submitFormHandler}>
      <Grid container direction="column" spacing={2}>
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
          <span>Ingredients</span>
          {ingredients.map((_ing, i) => (
            <Grid container key={i} direction="row">
              <Grid>
                <TextField
                  name="name"
                  label="Name"
                  required
                  onChange={e => onChangeIngredientsInputs(i, e)}
                />
              </Grid>

              <Grid>
                <TextField
                  type="number"
                  name="amount"
                  label="Amount"
                  required
                  onChange={e => onChangeIngredientsInputs(i, e)}
                />
              </Grid>

              <Grid>
                {ingredients.length <= 1 ? null :
                  <Grid>
                    <Button type="button" onClick={() => deleteIngredient(i)}>X</Button>
                  </Grid>
                }
              </Grid>
            </Grid>

          ))}

          <Grid>
            <Button type="button" onClick={addIngredient}> + Add new ingredient</Button>
          </Grid>

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

export default CocktailForm;
