import { Container, CssBaseline } from '@mui/material';
import AppToolbar from './components/UI/AppToolbar/AppToolbar.tsx';
import { Route, Routes } from 'react-router-dom';
import Products from './features/products/containers/Products.tsx';
import NewProduct from './features/admin/NewProduct.tsx';
import RegisterPage from './features/users/RegisterPage.tsx';
import LoginPage from './features/users/LoginPage.tsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.tsx';
import { useAppSelector } from './app/hooks.ts';
import { selectUser } from './features/users/usersSlice.ts';
import AdminLayout from './features/admin/AdminLayout.tsx';
import AdminProductList from './features/admin/AdminProductList.tsx';
import AdminCategoriesList from './features/admin/AdminCategoriesList.tsx';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import CocktailForm from './features/admin/CocktailForm.tsx';

const App = () => {
  const user = useAppSelector(selectUser);
  const {t, i18n} = useTranslation();

  useEffect(() => {
    const langFromLS = localStorage.getItem('lang') || 'ru';
    i18n.changeLanguage(langFromLS);
  }, []);

  return (
    <>
      <CssBaseline/>
      <header>
        <AppToolbar/>
      </header>

      <main>
        <Container maxWidth="xl">
          <h1>{t('welcome')}</h1>
          <p>{t('language', {value: '123'})}</p>
          <Routes>
            <Route path="/" element={<Products/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/products" element={<Products/>}/>

            <Route path="/admin" element={
              <ProtectedRoute isAllowed={user && user.role === 'admin'}>
                <AdminLayout/>
              </ProtectedRoute>
            }>
              <Route path="" element={<AdminProductList/>}/>
              <Route path="products" element={<AdminProductList/>}/>
              <Route path="categories" element={<AdminCategoriesList/>}/>
              <Route path="cocktails" element={<CocktailForm/>}/>
              <Route path="products/new" element={<NewProduct/>}/>
            </Route>


            <Route path="*" element={<h1>Not found</h1>}/>
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;
