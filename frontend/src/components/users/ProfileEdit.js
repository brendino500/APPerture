import React from 'react'
import ColorTheme from '../../../src/ColorTheme'

import { ThemeProvider, Container, CssBaseline, Avatar, Paper, Typography, TextField, Button } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import SaveIcon from '@material-ui/icons/Save'

class ProfileEdit extends React.Component {

  render() {
    return (
      <ThemeProvider them={ColorTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Paper elevation={3} color="primary">
            <Avatar color="primary" align="center">
              <AccountCircleIcon />
            </Avatar>
            <Typography component="h1" color="primary" align="center">
              Edit Profile
            </Typography>
            <form onSubmit="submit function" noValidate>
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
                onChange="HANDLE CHANGE FUNCTION"
                // value="USERNAME VALUE"
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
                onChange="HANDLE CHANGE FUNCTION"
                // value="FIRSTNAME VALUE"
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
                onChange="HANDLE CHANGE FUNCTION"
                // value="LASTNAME VALUE"
              />
              <Button
                variant="contained"
                fullWidth
                color="primary"
                startIcon={<CloudUploadIcon />}
              >
                Upload Profile Photo
              </Button>
              <Button
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
}

export default ProfileEdit