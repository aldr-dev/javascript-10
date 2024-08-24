import {AppBar, Box, Toolbar, Typography} from '@mui/material';
import {NavLink} from 'react-router-dom';

const NavBar = () => {
  return (
    <Box sx={{mb: 4}}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            <NavLink to='/' style={{textDecoration: 'none', color: '#fff'}}>
              Новостной портал
            </NavLink>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;