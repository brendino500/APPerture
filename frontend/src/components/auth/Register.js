import React from 'react'
import { registerUser } from '../../lib/api'
import TextField from '@material-ui/core/TextField'
import { makeStyles, createMuiTheme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { Container,  CssBaseline, Avatar, Typography } from '@material-ui/core'
import LockIcon from '@material-ui/icons/Lock'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '50ch'
    },
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  '& > *': {
    margin: theme.spacing(1)
  },
  input: {
    display: 'none'
  },
  display: 'flex',
  flexWrap: 'wrap',
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch'
  },
  buttonStyle: {
    color: 'grey'
  }
}))

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark'
  }
})

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
      console.log('REACHING THIS STAGE')
      const res = await registerUser(state.data)
      console.log('handle submit data ', res.data)
    } catch (err) {
      console.log(err)
      setState({ errors: err.response.data.errors })
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography component="h1" varient="h5">
          Register
        </Typography>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
              <Grid item xs={12}>
                <TextField
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
              </Grid>
              <Grid item xs={12}>
                <TextField
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
              </Grid>
              <Grid item xs={12}>
                <TextField
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
              </Grid>
              <Grid item xs={12}>
                <TextField
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
              </Grid>
              <Grid item xs={12}>
                <TextField
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
              </Grid>
              <Grid item xs={12}>
                <TextField
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
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
              <Button 
                className={classes.buttonStyle}
                type="submit"
                variant="outlined"
              >
            Submit
              </Button>
            </form>
          </Grid>
        </div>
      </div>
    </Container>
    
  )
}

export default Register

{/* <TextField
          required
          id="outlined-password-confirm"
          label="profile_image"
          autoComplete="profile-image"
          variant="outlined"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          name="profile_image"
          onChange={handleChange}
          value={state.profile_image}
        /> */}
{/* <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
          Upload
          </Button>
        </label> */}