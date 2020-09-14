import React from 'react'
import { PopupboxManager, PopupboxContainer } from 'react-popupbox'
import { showSinglePhoto } from '../../lib/api'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

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

  openPopupbox() {
    // const classes = useStyles()
    const { photo } = this.state
    const content = (
      <div className="box">
        <Paper className="content">
          <Grid container spacing={2}>
            <Grid className="photo-image">
              <img className="photo" alt="picture" src={photo.image}></img>
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
    PopupboxManager.open({ content })
  }
  
  render() {
    const { photo } = this.state
    console.log(this.state)
    console.log('state IMAGE', photo)

    if (!this.state.photo) return null
  

    const popupboxConfig = {
      titleBar: {
        enable: true,
        text: 'Popupbox Demo'
      },
      fadeIn: true,
      fadeInSpeed: 500
    }

    return (
      <div>
        <div className="box">
          <Paper className="content">
            <Grid container spacing={2}>
              <Grid className="photo-image">
                <img height="200px" className="photo" alt="picture" src={photo.image} />
              </Grid>
            </Grid>
          </Paper>
        </div>
        <PopupboxContainer { ...popupboxConfig }/>
      </div>
    )
  }
}

export default Lightbox