import React from 'react'
import { registerUser } from '../../lib/api'
import TextField from '@material-ui/core/TextField'
import { makeStyles, createMuiTheme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { Container,  CssBaseline, Avatar, Typography, ThemeProvider, Paper } from '@material-ui/core'
import LockIcon from '@material-ui/icons/Lock'
import { popupNotification } from '../../lib/notification'
import { useHistory } from 'react-router-dom'
import ColorTheme from '../../../src/ColorTheme'

const useStyles = makeStyles((theme) => ({
  typography: {
    fontFamily: 'Libre Baskerville'
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1)
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

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

function Register() {
  const history = useHistory()
  const classes = useStyles()
  const [state, setState] = React.useState(initialState)

  const handleChange = e => {
    const data = { ...state.data, [e.target.name]: e.target.value }
    console.log('Info check', state.data)
    const errors = { ...state.errors, [e.target.name]: '' }
    setState({ data, errors })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await registerUser(state.data)
      popupNotification(res.data.message)
      history.push('/login')
    } catch (err) {
      console.log(err)
      setState({ errors: err.response.data.errors })
      popupNotification('Wrong Credentials')
    }
  }
  
  return (
    <ThemeProvider theme={ColorTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper elevation={3} color="primary">
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
        Register
            </Typography>
            <form 
              className={classes.form} 
              noValidate
              onSubmit={handleSubmit}  
              autoComplete="off">
              <TextField
                color="primary"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
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
                required
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
                required
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
                label="Email"
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
              <input
                accept="image/*"
                multiple
                type="file"
                required
                id="outlined-required"
                label="profile_image"
                autoComplete="profile-image"
                variant="outlined"
                style={{ margin: 8 }}
                fullWidth
                margin="normal"
                name="profile_image"
                onChange={handleChange}
                value={state.profile_image}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className="button"
              >
            Register
              </Button>
            </form>
          </div>
        </Paper>
      </Container>
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </ThemeProvider>

  )
}
export default Register