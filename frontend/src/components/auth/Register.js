import React from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import { registerUser } from '../../lib/api'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch'
    }
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
    <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          required
          id="outlined-required"
          label="Required"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          defaultValue="Username"
          name="username"
          variant="outlined"
          onChange={handleChange}
          value={state.username}
        />
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="First Name"
          variant="outlined"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          name="first_name"
          onChange={handleChange}
          value={state.first_name}
        />
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Last Name"
          variant="outlined"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          name="last_name"
          onChange={handleChange}
          value={state.last_name}
        />
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Email"
          variant="outlined"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          name="email"
          onChange={handleChange}
          value={state.email}
        />
        <TextField
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          name="password"
          onChange={handleChange}
          value={state.password}
        />
        <TextField
          required
          id="outlined-password-confirm"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          name="password_confirmation"
          onChange={handleChange}
          value={state.password_confirmation}
        />
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
        {/* <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
          Upload
          </Button>
        </label> */}
        <Button 
          type="submit"
          variant="outlined"
        >
            Submit
        </Button>
      </div>
    </form>
  )
}

export default Register