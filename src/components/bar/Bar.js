import { useState, useRef } from "react";
import { useNavigate, useLocation, NavLink} from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Basket from "../../pages/shop/Basket";
import Favorites from "../../pages/shop/Favorites";


const pages = ['Calc', 'Ceasar', 'Like Enigma', 'Todo', 'Counter', 'Shop'];
const navs = [{ Calc: '/' }, {Ceasar: '/ceasar'}, {'Like Enigma': '/likeenigma'}, {Todo: '/todo'}, {Counter: '/counter'}, {Shop: '/shop'}];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Bar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { pathname } = useLocation();
  // const typographyStyle = useStyles();
  // console.log(typographyStyle);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{mb: 3,}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page, i) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    style={({ isActive }) =>
                      isActive
                        ? {
                            color: '#9f0013',
                            background: 'f0f0f0',
                          }
                        : { color: 'black', background: '', textDecoration: 'none' }
                    }
                    component={NavLink}
                    to={navs[i][page]}
                  >{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex', md: 'flex' } }}
          >
              {
                pathname === '/' ? 'Calc'
                  : pathname === '/ceasar' ? 'Ceasar'
                    : pathname === '/likeenigma' ? 'Like Enigma'
                      : pathname === '/todo' ? 'Todo'
                        : pathname === '/counter' ? 'Counter'
                          : pathname === '/shop' ? 'Shop'
                            : null
              }
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, i) => (
              <Button
                key={page}
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: '#fff',
                        background: '#9f0013',
                      }
                    : { color: '#fff', background: 'none' }
                }
                component={NavLink}
                to={navs[i][page]}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
              {pathname === '/shop' ?
                <>
                  <Favorites />
                  <Basket />
                </>
                : null
              }
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Bar;