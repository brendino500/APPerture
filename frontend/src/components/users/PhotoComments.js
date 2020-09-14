import React from 'react'
import ColorTheme from '../../../src/ColorTheme'
import { getUser } from '../../lib/api'
import { isAuthenticated } from '../../lib/auth'
import { Typography, Avatar, Grid } from '@material-ui/core'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles'


class PhotoComments extends React.Component {
  state = {
    commentData: null
  }

  async componentDidMount() {
    try {
      const currentUserId = getUser()
      const loggedIn = await isAuthenticated()
      if (!loggedIn) {
        this.setState({ commentData: '' })
      } else {
        const res = await getUser(currentUserId)
        this.setState({ commentData: res.data })
      }
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <ThemeProvider theme={ColorTheme}>
        <Grid container spacing={2}>
          <Avatar alt="profile avatar" src="owner">

          </Avatar>
        </Grid>
      </ThemeProvider>
    )
  }
}

export default PhotoComments