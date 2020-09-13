import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import PersonIcon from '@material-ui/icons/Person'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import ColorTheme from '../../../src/ColorTheme'
import Paper from '@material-ui/core/Paper'

import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import { Link, useHistory } from 'react-router-dom'
import { popupNotification } from '../../lib/notification'
import { loginUser } from '../../lib/api'
import { setToken } from '../../lib/auth'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

function Login() {
  const classes = useStyles()
  const history = useHistory()

  const loginData = {
    data: {
      email: '',
      password: ''
    },
    errors: ''
  }

  const [state, setState] = React.useState(loginData)

  const handleChange = e => {
    const data = { ...state.data, [e.target.name]: e.target.value }
    console.log('Info check', state.data)
    const errors = { ...state.errors, [e.target.name]: '' }
    setState({ data, errors })
  }
  
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await loginUser(state.data)
      setToken(res.data.token)
      popupNotification(res.data.message)
      history.push('/photos')
      console.log('handle submit data ', res.data)
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
        {/* <Paper elevation={3}>

        </Paper> */}
        <Avatar color="primary" className={classes.grey}>
          <PersonIcon />
        </Avatar>
        <Typography component="h1" variant="h5" color="primary">
          Sign in
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            color="primary"
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
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
            value={state.password}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/register/" color="primary">
                <Typography color="primary">
                    Don't have an account? Sign Up
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </form>
      </Container>
    </ThemeProvider>
  )
}

export default Login