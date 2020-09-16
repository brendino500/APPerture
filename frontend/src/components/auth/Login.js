import React from 'react'
import ColorTheme from '../../../src/ColorTheme'
import { popupNotification } from '../../lib/notification'
import { loginUser } from '../../lib/api'
import { setToken } from '../../lib/auth'

import PersonIcon from '@material-ui/icons/Person'
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Grid, Typography, Container, Paper } from '@material-ui/core'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import { Link, useHistory } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    alignItems: 'center'
  },
  marginAutoItem: {
    margin: 'auto'
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
        <Paper elevation={3} color="primary">
          <div className={classes.paper}>
            <Avatar align={classes.avatar} color="primary">
              <PersonIcon />
            </Avatar>
            <Typography align="center" component="h1" variant="h5" color="secondary">
          Sign in
            </Typography>
            <form 
              onSubmit={handleSubmit} 
              className={classes.form} 
              noValidate>
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
                color="secondary"
                className={classes.submit}
              >
            Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/register/" color="primary">
                    <Typography color="secondary" alignItems="center" varient="subtitle2">
                    Don't have an account? Register here
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Paper>
      </Container>
    </ThemeProvider>
  )
}

export default Login