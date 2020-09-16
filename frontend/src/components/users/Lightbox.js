import React from 'react'
import ColorTheme from '../../../src/ColorTheme'
import PhotoComments from './PhotoComments'
import { showSinglePhoto } from '../../lib/api'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import { Typography, Box, Grid, Paper, Avatar, Divider, Container } from '@material-ui/core'
import { Link } from 'react-router-dom'

class Lightbox extends React.Component {
  state = {
    photo: null,
    comments: null
  }

  async componentDidMount() {
    const photoID = this.props.match.params.id
    console.log('state user', this.state)
    try {
      const res = await showSinglePhoto(photoID)
      this.setState({ photo: res.data, comments: res.data })
      // console.log(this.state)
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  handleOnClick() {
    let color = 'primary'
    if (color === 'primary') {
      return color = 'red'
    } else if (color === 'red') {
      return color = 'primary'
    }
  }
  
  render() {
    const { photo } = this.state

    if (!this.state.photo) return null

    return (
      <ThemeProvider theme={ColorTheme}>
        <Container maxWidth="lg" spacing={4} fixed>
          <Box
            mx="auto"
            component="span"
            color="primary"
            bgcolor="background.paper">
            <Paper elevation={3} color="primary">
              <Grid container spacing={1}>
                <Grid className="photo-image">
                  <img 
                    className="photo" 
                    alt="picture" 
                    width="550px" 
                    src={photo.image} />
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Link to={`/profile/${photo.owner.id}`}>
                        <Grid item xs>
                          <Avatar alt="profile avatar" src={photo.owner.profile_image} />
                          <Typography 
                            varient="h1" 
                            color="secondary"
                            style={{
                              fontSize: '18px',
                              marginTop: '5px',
                              fontFamily: 'Libre Baskerville' }}>
                            @{photo.owner.username}
                          </Typography>
                        </Grid>
                      </Link>
                      <Typography 
                        varient="subtitle1" 
                        color="secondary"
                        style={{
                          marginTop: '5px',
                          fontSize: '12px',
                          fontFamily: 'Libre Baskerville' }}>
                        {photo.location}
                      </Typography>
                      <Divider />
                      <PhotoComments photoComments={this.state.comments} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Container>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      </ThemeProvider>
    )
  }
}

export default Lightbox