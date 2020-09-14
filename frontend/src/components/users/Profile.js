import React from 'react'
import ProfileMap from './ProfileMap'
import ColorTheme from '../../../src/ColorTheme'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Box from '@material-ui/core/Box'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import AppsIcon from '@material-ui/icons/Apps'
import Avatar from '@material-ui/core/Avatar'
import ViewAgendaIcon from '@material-ui/icons/ViewAgenda'
import RoomIcon from '@material-ui/icons/Room'
import GridListTile from '@material-ui/core/GridListTile'
import GridList from '@material-ui/core/GridList'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'

import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import { getAllPhotos, getAllUsers, getUser, followUser, getSingleUser } from '../../lib/api'
import { getUserId } from '../../lib/auth'
import { PopupboxManager, PopupboxContainer } from 'react-popupbox'
import { pink } from '@material-ui/core/colors'

class Profile extends React.Component {
  state = { 
    data: [],
    user: null,
    hideMap: true,
    hideGrid: false
  }

  async componentDidMount() {
    try {
      const resUser = await getUser(this.props.match.params.id)
      // console.log(resUser.data)
      this.setState({ user: resUser.data })
    } catch (err) {
      console.log(err)
    }
  }

  openPopupbox() {
    const content = (
      <div>
        <p className="quotes">Work like you don`t need the money.</p>
        <p className="quotes">Dance like no one is watching.</p>
        <p className="quotes">And love like you`ve never been hurt.</p>
        <span className="quotes-from">― Mark Twain</span>
      </div>
    )
    PopupboxManager.open({ content })
  }


  handleDisplayCard = e => {
    e.preventDefault()
    console.log('clicked', e.target)
    if (e.currentTarget.name === 'showGrid') {
      this.setState({ hideMap: true, hideGrid: false })
      console.log(e.target.name)
    } else {
      this.setState({ hideMap: false, hideGrid: true })
    }
  }

  handleFollow = async e => {
    e.preventDefault()

    try {
      // console.log(followedUser)
      await followUser(this.props.match.params.id)
      const resUser = await getUser(this.props.match.params.id)
      // console.log(resUser.data)
      this.setState({ user: resUser.data })

    } catch (err) {
      console.log(err)
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.userID !== prevProps.userID) {
      this.fetchData(this.props.userID)

    }
  }

  useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexGrow: 1,
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      alignItems: 'center',
      backgroundColor: theme.palette.background.paper,
      margin: theme.spacing(8)
    },
    button: {
      alignItems: 'center'
    },
    gridList: {
      width: 500,
      height: 450
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)'
    },
    typography: {
      fontFamily: 'Libre Baskerville'
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7)
    }
  }))

  render() {
    console.log(this.state.user)

    const { user } = this.state
    const classes = makeStyles()

    if (!this.state.user) return null

    return (
      <ThemeProvider theme={ColorTheme}>
        <Container maxWidth="md">
          <Box component="span" className="profile-info">
            <Grid className="profile-photo-followers">
              <ButtonBase className="profile-image">
                <Avatar alt="Userprofilephoto" src={user.profile_image} className="profile-avatar" />
              </ButtonBase>
              <Grid className="username-info">
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography varient="h5" color="primary">
                      @{user.username}
                    </Typography>
                    <Typography varient="subtitle1" color="primary">
                      {user.first_name} {user.last_name}
                    </Typography>
                    <Typography varient="subtitle2" color="primary">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin turpis elit, tincidunt a placerat sit amet, accumsan porttitor sem. Nam sed libero maximus, eleifend dui vitae, posuere augue. 
                    </Typography>
                    <br />
                    <Divider />
                  </Grid>
                </Grid>
                <Button variant="outlined" color="primary" onClick={this.handleFollow}>
                Follow
                </Button>
                <Button variant="outlined" color="primary">
                Message
                </Button>
                <Grid item xs container direction="row" spacing={2}>
                  <Grid item xs>
                    <Typography varient="p" color="primary">
                      {user.created_photo.length} <br /> Posts
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography varient="p" color="primary">
                      {user.followers.length} <br /> Followers
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography varient="p" color="primary">
                      {user.following.length} <br /> Following
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <br />
          <Divider />
          <Box component="span" className="view-buttons">
            <ButtonGroup color="primary" aria-label="text primary button group">
              <Button name="showGrid" onClick={this.handleDisplayCard}>
                <AppsIcon/>
              </Button>
              <Button name="showMap" onClick={this.handleDisplayCard}>
                <RoomIcon/>
              </Button>
            </ButtonGroup>
          </Box>
          <br />
          <Box className="test">
            <div className="test">
              <section 
                className={`${this.state.hideGrid ? 'section spot-grid is-hidden' : 'spot-grid'}`}>
                <GridList cellHeight={300} className="test">
                  <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                  </GridListTile>
                  {user.created_photo.map((tile) => (
                    <GridListTile key={tile.image}>
                      <img src={tile.image} alt={tile.title} />
                      <GridListTileBar
                        title={tile.location}
                      />
                    </GridListTile>
                  ))}
                </GridList>
              </section>
              <section className={`${this.state.hideMap ? 'section spot-map is-hidden' : 'spot-map'}`}>
                <ProfileMap />
              </section>
            </div>
          </Box>
        </Container>
      </ThemeProvider>
    )
  }
}

export default Profile 