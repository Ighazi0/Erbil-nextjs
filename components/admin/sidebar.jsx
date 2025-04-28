"use client"
import * as React from 'react';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { FiMenu, FiChevronLeft, FiChevronRight, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { styled } from '@mui/material/styles';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import Box from '@mui/material/Box';
import Image from 'next/image';
import Link from 'next/link';
import { FormattedMessage, useIntl } from 'react-intl';
import { useLanguage } from '@/components/translation/translationLayout';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import BrandingWatermarkRoundedIcon from '@mui/icons-material/BrandingWatermarkRounded';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import CategoryIcon from '@mui/icons-material/Category';
import { auth } from '@/app/firebase';
import { onAuthStateChanged } from "firebase/auth";
import { Logout } from "@/services/authService";
import { useRouter } from 'next/navigation';
import { Avatar, Menu, MenuItem, ListItemIcon, Divider } from '@mui/material';
import { FiLogOut, FiUser, FiSettings, FiGlobe } from 'react-icons/fi';
import {Money} from "@mui/icons-material";


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
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open, direction }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: direction === 'ltr' ? drawerWidth : 0,
    marginRight: direction === 'rtl' ? drawerWidth : 0,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
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
}));

export default function Sidebar({ children, dir }) {
  const intl = useIntl();
  const { locale, switchLanguage } = useLanguage();
  const [open, setOpen] = React.useState(false);
  const isRtl = dir === 'rtl';
  const [openSubmenu, setOpenSubmenu] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const router = useRouter();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleUserMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (newLocale) => {
    switchLanguage(newLocale);
    handleUserMenuClose();
  };

  const handleLogout = async () => {
    try {
      await Logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
    handleUserMenuClose();
  };

  const menuItems = [
    {
      text: intl.formatMessage({ id: 'dashboard', defaultMessage: 'Dashboard' }),
      link: '/admin',
      icon: <DashboardCustomizeIcon />,
      color: '#2196f3'
    },
    {
      text: intl.formatMessage({ id: 'cars', defaultMessage: 'Cars' }),
      link: '/admin/cars',
      icon: <DirectionsCarFilledIcon />,
      color: '#0d6efd'
    },
    {
      text: intl.formatMessage({ id: 'orders', defaultMessage: 'Orders' }),
      link: '/admin/orders',
      icon: <Money />,
      color: '#4caf50'
    },
    {
      text: intl.formatMessage({ id: 'brands', defaultMessage: 'Brands' }),
      link: '/admin/brands',
      icon: <BrandingWatermarkRoundedIcon />,
      color: '#ff9800'
    },
    {
      text: intl.formatMessage({ id: 'models', defaultMessage: 'Models' }),
      link: '/admin/models',
      icon: <TimeToLeaveIcon />,
      color: '#e91e63'
    },
    {
      text: intl.formatMessage({ id: 'locations', defaultMessage: 'Locations' }),
      link: '/admin/locations',
      icon: <LocationOnRoundedIcon />,
      color: '#9c27b0'
    },
    {
      text: intl.formatMessage({ id: 'types', defaultMessage: 'Types' }),
      link: '/admin/types',
      icon: <CategoryIcon />,
      color: '#795548'
    }
  ];

  const renderMenuItem = (item) => (
    <React.Fragment key={item.text}>
      <Link href={item.link} style={{ textDecoration: 'none' }}>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            onClick={() => item.subItems && setOpenSubmenu(!openSubmenu)}
            sx={{
              minHeight: 48,
              px: 2.5,
              justifyContent: open ? 'initial' : 'center',
              margin: '4px 8px',
              borderRadius: '8px',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: `${item.color}15`,
                '& .MuiListItemIcon-root': {
                  color: item.color,
                  transform: 'scale(1.1)',
                },
                '& .MuiListItemText-primary': {
                  color: item.color,
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: 'center',
                ...(open && isRtl ? { ml: 3 } : {}),
                ...(open && !isRtl ? { mr: 3 } : {}),
                ...(!open ? { mx: 'auto' } : {}),
                color: item.color,
                opacity: 0.7,
                transition: 'all 0.2s ease-in-out',
                '& svg': {
                  fontSize: '1.5rem',
                },
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={<FormattedMessage id={item.text} />}
              sx={{
                opacity: open ? 1 : 0,
                '& .MuiTypography-root': {
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  color: '#212B36',
                  transition: 'color 0.2s ease-in-out',
                },
              }}
            />
            {item.subItems && open && (
              <IconButton 
                size="small"
                sx={{
                  transition: 'transform 0.2s ease-in-out',
                  transform: openSubmenu ? 'rotate(180deg)' : 'rotate(0deg)',
                  color: item.color,
                }}
              >
                {openSubmenu ? <FiChevronUp /> : <FiChevronDown />}
              </IconButton>
            )}
          </ListItemButton>
        </ListItem>
      </Link>

      {item.subItems && openSubmenu && open && (
        <List component="div" disablePadding>
          {item.subItems.map((subItem) => (
            <Link key={subItem.text} href={subItem.link} style={{ textDecoration: 'none' }}>
              <ListItemButton
                sx={{
                  pl: 4,
                  py: 1,
                  minHeight: 40,
                  margin: '2px 8px',
                  borderRadius: '8px',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    backgroundColor: `${item.color}15`,
                    '& .MuiListItemIcon-root': {
                      color: item.color,
                      transform: 'scale(1.1)',
                    },
                    '& .MuiListItemText-primary': {
                      color: item.color,
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 36,
                    color: item.color,
                    opacity: 0.7,
                    transition: 'all 0.2s ease-in-out',
                    '& svg': {
                      fontSize: '1.25rem',
                    },
                  }}
                >
                  {subItem.icon}
                </ListItemIcon>
                <ListItemText
                  primary={<FormattedMessage id={subItem.text} />}
                  sx={{
                    '& .MuiTypography-root': {
                      fontSize: '0.875rem',
                      fontWeight: 400,
                      color: '#212B36',
                      transition: 'color 0.2s ease-in-out',
                    },
                  }}
                />
              </ListItemButton>
            </Link>
          ))}
        </List>
      )}
    </React.Fragment>
  );

  return (
    <Box sx={{ display: 'flex', direction: dir }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        direction={dir}
        elevation={0}
        sx={{
          backgroundColor: 'white',
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="primary"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge={isRtl ? "end" : "start"}
              sx={{
                ...(isRtl ? { ml: 5 } : { mr: 5 }),
                ...(open && { display: 'none' }),
              }}
            >
              <FiMenu />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ color: '#212B36' }}>
              <FormattedMessage id="Dashboard" />
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              onClick={handleUserMenuOpen}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={Boolean(anchorEl) ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
            >
              <Avatar 
                sx={{ 
                  width: 40, 
                  height: 40,
                  bgcolor: 'primary.main',
                  color: 'white',
                  fontSize: '1rem'
                }}
              >
                {user?.email?.[0]?.toUpperCase() || 'U'}
              </Avatar>
            </IconButton>
          </Box>

          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={Boolean(anchorEl)}
            onClose={handleUserMenuClose}
            onClick={handleUserMenuClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
                mt: 1.5,
                minWidth: 200,
                '& .MuiMenuItem-root': {
                  px: 2,
                  py: 1,
                  my: 0.5,
                  borderRadius: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={() => handleLanguageChange('en')}>
              <ListItemIcon>
                <FiGlobe fontSize="1.25rem" />
              </ListItemIcon>
              English
              {locale === 'en' && <span style={{ marginLeft: 'auto', color: 'primary.main' }}>✓</span>}
            </MenuItem>
            <MenuItem onClick={() => handleLanguageChange('ar')}>
              <ListItemIcon>
                <FiGlobe fontSize="1.25rem" />
              </ListItemIcon>
              العربية
              {locale === 'ar' && <span style={{ marginLeft: 'auto', color: 'primary.main' }}>✓</span>}
            </MenuItem>
            <MenuItem onClick={() => handleLanguageChange('kr')}>
              <ListItemIcon>
                <FiGlobe fontSize="1.25rem" />
              </ListItemIcon>
              Kurdi
              {locale === 'kr' && <span style={{ marginLeft: 'auto', color: 'primary.main' }}>✓</span>}
            </MenuItem>

            <Divider />

            <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
              <ListItemIcon>
                <FiLogOut fontSize="1.25rem" style={{ color: 'error.main' }} />
              </ListItemIcon>
              <FormattedMessage id="Logout" />
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        open={open}
        anchor={isRtl ? "right" : "left"}
        sx={{
          '& .MuiDrawer-paper': {
            ...(isRtl ? { right: 0, left: 'auto' } : {}),
            borderRight: 'none',
          },
        }}
      >
        <DrawerHeader sx={{
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 16px',
        }}>
          {open && (
            <Image
              src="/assets/images/logo/eblpng.png"
              alt="Logo"
              width={120}
              height={40}
              style={{
                objectFit: 'contain'
              }}
            />
          )}
          <IconButton onClick={handleDrawerClose}>
            {isRtl ? <FiChevronRight /> : <FiChevronLeft />}
          </IconButton>
        </DrawerHeader>

        <List sx={{ pt: 2 }}>
          {menuItems.map(renderMenuItem)}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          flex: 1,
          backgroundColor: '#f5f5f5',
          minHeight: '100vh',
          width: '100%',
          maxWidth: '100%',
          overflow: 'hidden'
        }}
      >
        <DrawerHeader />
        <Box sx={{
          width: '100%',
          maxWidth: '100%',
          flexGrow: 1,
        }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}