import React from 'react'
import ColorTheme from '../../../src/ColorTheme'

import { ThemeProvider, Container, CssBaseline, Avatar, Paper, Typography, TextField, Button } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
// import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import SaveIcon from '@material-ui/icons/Save'
import { isAuthenticated } from '../../lib/auth'
import { getUserId } from '../../lib/auth'
import { editUser, getUser } from '../../lib/api'
import { popupNotification } from '../../lib/notification'
import { useHistory } from 'react-router-dom'

const initialState = {
  data: {
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    first_name: '',
    last_name: '',
    profile_image: ''
  },
  errors: {}
}

function ProfileEdit() {
  
  const history = useHistory()

  const [state, setState] = React.useState(initialState)
  // console.log('state data', state.data)

  React.useEffect(() => {
    const currentUserId = getUserId()
    console.log('Current User ID is: ', currentUserId)
    const loggedIn = isAuthenticated()
    if (!loggedIn) {
      setState('')
    } else {
      const getCurrentUser = async () => {
        const res = await getUser(currentUserId)
        // console.log('res data', res.data)
        setState({ data: res.data })
        // console.log('res', res)
      }
      getCurrentUser()
    }
  }, [])

  const handleChange = e => {
    const data = { ...state.data, [e.target.name]: e.target.value }
    // console.log('Info check', state.data)
    const errors = { ...state.errors, [e.target.name]: '' }
    setState({ data, errors })
  }

  // console.log('state', state.data)
  const handleSubmit = async e => {
    e.preventDefault()
    const currentUserId = getUserId()
    try {
      const res = editUser(currentUserId, state.data)
      console.log(res.data)
      // popupNotification(res.data.message)
      history.push(`/profile/${currentUserId}`)
    } catch (err) {
      // console.log('err', err)
      // setState({ errors: err.response.data.errors })
      popupNotification('All fields are needed or wrong inputs')
    }
  }


  console.log(initialState)

  return (
    <ThemeProvider theme={ColorTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper elevation={3} color="primary">
          <Avatar color="primary" align="center">
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" color="primary" align="center">
            Edit Profile
          </Typography>
          <form onSubmit={handleSubmit} noValidate>
            <TextField 
              variant="outlined"
              color="primary"
              margin="normal"
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={handleChange}
              value={state.username}
            />
            <TextField
              color="primary"
              variant="outlined"
              margin="normal"
              fullWidth
              id="first_name"
              label="First Name"
              name="first_name"
              autoComplete="first_name"
              autoFocus
              onChange={handleChange}
              value={state.first_name}
            />
            <TextField
              color="primary"
              variant="outlined"
              margin="normal"
              fullWidth
              id="last"
              label="Last Name"
              name="last_name"
              autoComplete="last_name"
              autoFocus
              onChange={handleChange}
              value={state.last_name}
            />
            <TextField
              color="primary"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Confirm Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
              value={state.email}
            />
            <TextField
              color="primary"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              autoComplete="password"
              type="password"
              autoFocus
              onChange={handleChange}
              value={state.password}
            />
            <TextField
              color="primary"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password_confirmation"
              label="Password Confirmation"
              name="password_confirmation"
              autoComplete="password_confirmation"
              type="password"
              autoFocus
              onChange={handleChange}
              value={state.password_confirmation}
            />
            <TextField
              color="primary"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="profile_image"
              label="Profile Image"
              name="profile_image"
              autoComplete="profile_image"
              type="profile_image"
              autoFocus
              onChange={handleChange}
              value={state.profile_image}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </form>
        </Paper>
      </Container>
    </ThemeProvider>
  )
}

export default ProfileEdit