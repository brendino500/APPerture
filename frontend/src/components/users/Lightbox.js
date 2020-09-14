import React from 'react'
import ColorTheme from '../../../src/ColorTheme'
import PhotoComments from './PhotoComments'
import { PopupboxManager, PopupboxContainer } from 'react-popupbox'
import { showSinglePhoto } from '../../lib/api'

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import MessageIcon from '@material-ui/icons/Message'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import { Typography, Box, Grid, Paper, Avatar, TextField, Divider, IconButton } from '@material-ui/core'
import { Link } from 'react-router-dom'

class Lightbox extends React.Component {
  state = {
    photo: null
  }

  useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500
    },
    image: {
      width: 128,
      height: 128
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%'
    }
  }));

  async componentDidMount() {
    const user = this.props.match.params.id
    console.log('state user', this.state)
    try {
      const res = await showSinglePhoto(user)
      this.setState({ photo: res.data })
      console.log(this.state)
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  // openPopupbox() {
  //   // const classes = useStyles()
  //   const { photo } = this.state
  //   const content = (
  //     <ThemeProvider theme={ColorTheme}>
  //       <div className="box">
  //         <Box
  //           color="primary"
  //           bgcolor="background.paper">
  //           <Paper className="content">
  //             <Grid container spacing={2}>
  //               <Grid className="photo-image">
  //                 <img className="photo" alt="picture" src={photo.image}></img>
  //               </Grid>
  //               <Grid item xs={12} sm container>
  //                 <Grid item xs container direction="column" spacing={2}>
  //                   <Grid item xs>
  //                     <Typography varient="h1" color="primary">
  //                       {photo.owner.username}
  //                       {photo.owner.location}
  //                     </Typography>
  //                     <br />
  //                     <PhotoComments />
  //                   </Grid>
  //                 </Grid>
  //               </Grid>
  //             </Grid>
  //             <TextField
  //               id="standard-multiline-static"
  //               label="Multiline"
  //               multiline
  //               rows={4}
  //               defaultValue="Default Value"
  //             />
  //           </Paper>
  //         </Box>
  //       </div>
  //     </ThemeProvider>
  //   )
  //   PopupboxManager.open({ content })
  // }

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
    console.log(this.state)
    console.log('state IMAGE', photo)

    if (!this.state.photo) return null
  

    // const popupboxConfig = {
    //   titleBar: {
    //     enable: true,
    //     text: 'Popupbox Demo'
    //   },
    //   fadeIn: true,
    //   fadeInSpeed: 500
    // }

    return (
      <ThemeProvider theme={ColorTheme}>
        <div className="box">
          <Box
            color="primary"
            bgcolor="background.paper">
            <Paper className="content">
              <Grid container spacing={2}>
                <Grid className="photo-image">
                  <img className="photo" alt="picture" height="400px" src={photo.image} />
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Link to={`/profile/${photo.owner.id}`}>
                        <Grid item xs direction="row">
                          <Avatar alt="profile avatar" src={photo.owner.profile_image} />
                          <Typography varient="h1">
                            @{photo.owner.username}
                          </Typography>
                        </Grid>
                      </Link>
                      <Typography varient="subtitle1" color="primary">
                        {photo.location}
                      </Typography>
                      <Divider />
                      <IconButton aria-label="favourite">
                        <FavoriteBorderIcon 
                          color="primary"
                          onClick={this.handleOnClick} />
                      </IconButton>
                      <IconButton aria-label="comment">
                        <MessageIcon color="primary"/>
                      </IconButton>
                      <PhotoComments />
                      <TextField 
                        id="outlined-basic" 
                        fullWidth
                        color="primary"
                        label="Add a comment..." 
                        variant="outlined" />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </div>
      </ThemeProvider>
    )
  }
}

export default Lightbox