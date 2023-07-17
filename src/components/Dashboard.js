import { AutoStories, BookmarkAdd, ExpandLess, ExpandMore, Info, PersonAdd, StarBorder } from '@mui/icons-material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import BookIcon from '@mui/icons-material/Book';
import CategoryIcon from '@mui/icons-material/Category';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MoreIcon from '@mui/icons-material/MoreVert';
import PeopleIcon from '@mui/icons-material/People';
import SearchIcon from '@mui/icons-material/Search';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { Collapse } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { alpha, styled, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Addmembers from './Addmembers';
import Books from './Books';
import { Contact } from './contact-form/contact';
import Createbooks from './Createbooks';
import { Home } from './Home';
import Members from './Members';
import ContactsIcon from '@mui/icons-material/Contacts';
import { ProtectedRoutes } from './ProtectedRoutes';

//search bar and top bar code are shown bellow:
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  })); 

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display:        'flex',
  alignItems:     'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
         width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
     boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

//!dashbard funcion component is started from here
function Dashboard(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(()=>{
    props.initialLoad();
},[])
  
  const isMenuOpen       = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl=    {anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical  : 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={()=>{
        handleMenuClose()
        localStorage.clear()
        props.handleStatus()
      }}>Log Out</MenuItem>
    </Menu>
  );

  const mobileMenuId     = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl    ={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
    }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={()=>navigate('/books')}>
        <IconButton 
         size      ="large"
         aria-label="show 4 new mails"
         color     ="inherit"
         onClick   ={()=>navigate('/books')} >
          <Badge badgeContent={props.data.books.length} color="error">
            <MenuBookIcon />
          </Badge>
        </IconButton>
        <p>Total Books</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size      ="large"
          aria-label="show 17 new notifications"
          color     ="inherit"
          onClick   ={()=>navigate('/members')} >
        
          <Badge badgeContent={props.membdata.length} color="error">
          </Badge>
            <PeopleIcon />
        </IconButton>
        <p>Total Members</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size         ="large"
          aria-label   ="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color        ="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openCategory ,setOpenCategory] =React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
    setOpenCategory(false)
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  if(open){
    setTimeout(() => {
         setOpen(!open)
      }, 8000);
  }
  
  function handleCategoryOpen() {
    setOpenCategory(!openCategory);
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} >
        <Toolbar>
          <IconButton
            color     ="inherit"
            aria-label="open drawer"
            onClick   ={handleDrawerOpen}
            edge      ="start"
            sx        ={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
           {!open ? <>
            <BookIcon /> 
           <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } ,paddingLeft:'15px' }}
          >
             LIBRARY
          </Typography>
          </>:false}
          <Search style={{width:'500px'}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={props.data.books.length} color="error">
                <MenuBookIcon onClick={()=>navigate('/books')}/>
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={props.membdata.length} color="error">
                <PeopleIcon onClick   ={()=>navigate('/members')} />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
            </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <Drawer variant="permanent" open={open} >
        <DrawerHeader>
        <BookIcon style={{display:"flex",marginRight:'auto',marginLeft:'12px'}}/> 
        <h2>LIBRARY</h2>
          <IconButton onClick={handleDrawerClose} >
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Home', 'Books', 'Category', 'Members','Add-Members','Create-Books','Contact'].map((text, index) => 
            text === 'Category'? 
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton 
            onClick={handleCategoryOpen}
             sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
            >
        <ListItemIcon 
         sx={{
          minWidth: 0,
          mr: open ? 3 : 'auto',
          justifyContent: 'center',
        }}
        >
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }}/>
        
        {open? openCategory ? <ExpandLess /> : <ExpandMore />:false}
      </ListItemButton>
      {open?
      <Collapse in={openCategory} timeout={500}  unmoufntOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Horror" />
          </ListItemButton>
        </List>
      </Collapse> :false}
              </ListItem>
            :
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={()=>'Home'===text?navigate('/'):navigate(`/${text.toLocaleLowerCase()}`)}
                >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                  >
                  {'Home'        ===text?<HomeIcon />             :false}
                  {'Books'       ===text?<AutoStories/>           :false}
                  {'Members'     ===text?<SupervisorAccountIcon />:false}
                  {'Add-Members' ===text?<PersonAdd />            :false}
                  {'Create-Books'===text?<BookmarkAdd />          :false}
                  {'Contact'     ===text?<ContactsIcon />         :false}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          
          )}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {/*// !Routing part below*/}
        <Routes>
            <Route path='/'                 element ={<ProtectedRoutes><Home />       </ProtectedRoutes>} />
            <Route path='/books'            element ={<ProtectedRoutes><Books />      </ProtectedRoutes>} />
            <Route path='/contact'          element ={<ProtectedRoutes><Contact />    </ProtectedRoutes>} />
            <Route path='/members'          element ={<ProtectedRoutes><Members />    </ProtectedRoutes>} />
            <Route path='/add-members'      element ={<ProtectedRoutes><Addmembers /> </ProtectedRoutes>} />
            <Route path='/add-members/:id'  element ={<ProtectedRoutes><Addmembers /> </ProtectedRoutes>} />
            <Route path='/create-books'     element ={<ProtectedRoutes><Createbooks /></ProtectedRoutes>} />
            <Route path='/create-books/:id' element ={<ProtectedRoutes><Createbooks /></ProtectedRoutes>} />
            <Route />
        </Routes>
        {/* </BrowserRouter> */}
      </Box>
    </Box>
  );
}
const mapStateToProps = (state)=>({
  data:state.Reducers,
  membdata:state.MembersReducers

  
})
const mapDispatchToProps = (dispatch)=>({
  initialLoad:()=>{
    //looad books:
    axios.get(`https://636c8f127f47ef51e14ba6ab.mockapi.io/books`)
    .then((data)=>{dispatch({type:'add',payload:data.data})})
    //load members:
    axios.get(`https://636c8f127f47ef51e14ba6ab.mockapi.io/members`)
      .then((res)=>dispatch({type:'Add_Members',payload:res.data}))
}
})
export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);