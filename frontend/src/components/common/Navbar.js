import React from 'react'
import ColorTheme from '../../../src/ColorTheme'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import Badge from '@material-ui/core/Badge'

import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MailIcon from '@material-ui/icons/Mail'
import NotificationsIcon from '@material-ui/icons/Notifications'
import MoreIcon from '@material-ui/icons/MoreVert'

import { ThemeProvider } from '@material-ui/core/styles'
import { fade, makeStyles } from '@material-ui/core/styles'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { popupNotification } from '../../lib/notification'
import { logout, isAuthenticated, getUserId } from '../../lib/auth'
import { TripOriginSharp } from '@material-ui/icons'
import { getAllPhotos } from '../../lib/api'
// import { notification } from 'antd'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1
  },

  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },

  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  inputRoot: {
    color: 'inherit'
  },

  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  },

  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },

  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
}))

function Navbar() {

  const history = useHistory()
  const location = useLocation()
  console.log(location)
  const userID = getUserId()
  const classes = useStyles()
  const userAuthenticated = isAuthenticated()

  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)

  const [search, setSearch] = React.useState('')

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  React.useEffect(() => {
    console.log('this is re running')
    // if you aren't redirecting to a /photo
    if (!location.pathname.startsWith('/photo')) {
      // set state to
      setSearch('')
    }
  }, [location.pathname])
  // if this ever changes, run this code

  const handleValueChange = e => {
    setSearch(e.target.value)
  }

  const handleSearch = e => {    
    if (e.keyCode === 13) {
      console.log('enter is pressed')
      history.push(`/photos?search=${search}`)
    }
  }

  const handleLogout = () => {
    logout()
    popupNotification('Have a creative day!')
    history.push('/')
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }


  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <ThemeProvider theme={ColorTheme}>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          {<Link style={{ color: 'black' }} to={'/photos'}>Collection</Link>}
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          {!userAuthenticated && <Link style={{ color: 'black' }} to={'/login'}>Log In</Link>}
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          {userAuthenticated && <Link style={{ color: 'black' }} to={`/profile/${userID}`}>Profile</Link>}
        </MenuItem>
        {userAuthenticated && <MenuItem onClick={handleLogout}>Log Out</MenuItem>}
      </Menu>
    </ThemeProvider>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <ThemeProvider theme={ColorTheme}>
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton aria-label="show 11 new notifications" color="secondary">
            <Badge badgeContent={11} color="primary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    </ThemeProvider>
  )

  console.log('User Authenticated CHECK', isAuthenticated())
  console.log('USER ID', userID)
  console.log(search)

  return (
    <div className={classes.grow}>
      {/* <p>You clicked {String(isAuthenticated())} times</p> */}
      <AppBar position="static" style={{ backgroundColor: 'transparent', color: 'white', boxShadow: '0px 0px 0px 0px' }}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon/>
          </IconButton>
          <Typography className={classes.title} variant="h6" style={{ color: 'black' }} noWrap>
            <Link to='/' style={{ color: 'white' }}>APPerture</Link>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              name="search"
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleValueChange}
              onKeyDown={handleSearch}
              value={search}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={10} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  )
}

export default Navbar