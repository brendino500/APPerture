import React from 'react'
import ColorTheme from '../../../src/ColorTheme'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'
import { popupNotification } from '../../lib/notification'
import { addNewPhoto } from '../../lib/api'
import { getUserId } from '../../lib/auth'
import { Avatar, Button, CssBaseline, TextField, Typography, Container, Paper } from '@material-ui/core'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'


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

function AddNewPhoto() {
  const classes = useStyles()
  const history = useHistory()

  const photoData = {
    data: {
      location: '',
      image: '',
      owner: '',
      created_at: ''
    },
    errors: ''
  }

  const [state, setState] = React.useState(photoData)

  const handleChange = e => {
    const data = { ...state.data, [e.target.name]: e.target.value }
    const errors = { ...state.errors, [e.target.name]: '' }
    setState({ data, errors })
  }
  
  const handleSubmit = async e => {
    e.preventDefault()
    const currentUserId = getUserId()
    try {
      const res = await addNewPhoto(currentUserId, state.data)
      history.push(`/profile/${currentUserId}/`)
      console.log('handle submit data ', res.data)
    } catch (err) {
      console.log(err)
      // setState({ errors: err.response.data.errors })
      popupNotification('All Fields Needed')
    }
  }

  return (
    <ThemeProvider theme={ColorTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper elevation={3} color="primary">
          <div className={classes.paper}>
            <Avatar align={classes.avatar} color="primary">
              <PhotoCameraIcon />
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
                id="location"
                label="Location"
                name="location"
                autoComplete="location"
                autoFocus
                onChange={handleChange}
                value={state.location}
              />
              <TextField
                variant="outlined"
                color="primary"
                margin="normal"
                required
                fullWidth
                id="image"
                label="Image"
                name="image"
                autoComplete="image"
                autoFocus
                onChange={handleChange}
                value={state.image}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
            Upload Photo
              </Button>
            </form>
          </div>
        </Paper>
      </Container>
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <br /><br />
    </ThemeProvider>
  )
}

export default AddNewPhoto