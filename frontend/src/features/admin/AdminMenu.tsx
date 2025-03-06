import Grid from '@mui/material/Grid2';
import { List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { Link } from 'react-router-dom';


const AdminMenu = () => {
  return (
    <Grid container>
      <Grid>
        <Typography variant="h6">Admin menu</Typography>
      </Grid>

      <Grid>
       <List>
         <ListItem disablePadding>
           <ListItemButton component={Link} to='/admin/products'>
             <ListItemText primary="Products"/>
           </ListItemButton>
         </ListItem>

         <ListItem disablePadding>
           <ListItemButton component={Link} to='/admin/categories'>
             <ListItemText primary="Categories"/>
           </ListItemButton>
         </ListItem>

         <ListItem disablePadding>
           <ListItemButton component={Link} to='/admin/cocktails'>
             <ListItemText primary="Cocktails"/>
           </ListItemButton>
         </ListItem>
       </List>
      </Grid>
    </Grid>
  );
};

export default AdminMenu;