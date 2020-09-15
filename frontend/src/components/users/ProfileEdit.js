import React from 'react'
import ColorTheme from '../../../src/ColorTheme'

import { ThemeProvider, Container, CssBaseline, Avatar, Paper, Typography } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

class ProfileEdit extends React.Component {

  render() {
    return (
      <ThemeProvider them={ColorTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Paper elevation={3} color="primary">
            <Avatar color="primary">
              <AccountCircleIcon />
            </Avatar>
            <Typography component="h1" color="primary">
              Edit Profile
            </Typography>

          </Paper>
        </Container>
      </ThemeProvider>
    )
  }
}

export default ProfileEdit