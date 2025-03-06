import { AppBar, styled, Toolbar, Typography } from '@mui/material';
import { Link as NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks.ts';
import { selectUser } from '../../../features/users/usersSlice.ts';
import AnonymousMenu from './AnonymousMenu.tsx';
import UserMenu from './UserMenu.tsx';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Link = styled(NavLink)({
  color: "inherit",
  textDecoration: "none",
  "&:hover": {
    color: "inherit",
  },
});

const AppToolbar = () => {
  const user = useAppSelector(selectUser);
  const [language, setLanguage] = useState<string>(localStorage.getItem('lang') || 'ru');
  const { i18n } = useTranslation();

  const setLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
    localStorage.setItem('lang', e.currentTarget.value);
    setLanguage(e.target.value);
  };

  return (
    <AppBar position="sticky" sx={{ mb: 2 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/">CompStore</Link>
        </Typography>

        <select value={language} onChange={setLang}>
          <option value="en">English</option>
          <option value="ru">Русский</option>
          <option value="fr">Francais</option>
        </select>

        {user ?
          <UserMenu user={user}/>
          // показ меню для пользователя
          :
          <AnonymousMenu/>
          // показ для анонимного пользователя
        }
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
