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
import RoomIcon from '@material-ui/icons/Room'
import GridListTile from '@material-ui/core/GridListTile'
import GridList from '@material-ui/core/GridList'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import EditIcon from '@material-ui/icons/Edit'

import { Link } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import { getUser, followUser } from '../../lib/api'
import { getUserId } from '../../lib/auth'


class Profile extends React.Component {
  state = { 
    data: [],
    user: null,
    hideMap: true,
    hideGrid: false,
    isViewersProfile: false,
    isFollowing: false
  }

  async componentDidMount() {
    try {
      const resUser = await getUser(this.props.match.params.id)
      // console.log('this.props etc', this.props.match.params.id, getUserId())
      this.setState({ 
        user: resUser.data, 
        isViewersProfile: parseInt(this.props.match.params.id) === getUserId(), 
        isFollowing: this.checkIsFollowing(resUser) 
      })
    } catch (err) {
      console.log(err)
    }
  }

  checkIsFollowing = resUser => {
    return resUser.data.followers.some(followerId => { 
      return followerId === getUserId() 
    })
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
      await followUser(this.props.match.params.id)
      const resUser = await getUser(this.props.match.params.id)
      this.setState({ 
        user: resUser.data, 
        isFollowing: this.checkIsFollowing(resUser) 
      })

    } catch (err) {
      console.log(err)
    }
  }

  componentDidUpdate = async (prevProps) => {
    if (prevProps.location.pathname.includes('/profile/') && this.props.location.pathname.includes('/profile/')) {
      if (this.props.location.pathname !== prevProps.location.pathname) {
        const id = this.props.match.params.id
        const res = await getUser(id)
        this.setState({ user: res.data })
      }
    }
  }

  render() {
    // console.log(this.state.user)
    console.log('Are you this person?', this.state.isViewersProfile)
    console.log('Are you following?', this.state.isFollowing)

    const { user } = this.state

    if (!user) return null

    return (
      <ThemeProvider theme={ColorTheme}>
        <Container maxWidth="md">
          <Box component="span" className="profile-info" >
            <Grid className="profile-photo-followers">
              <Grid item md container direction="row" >
                <ButtonBase className="profile-image">
                  <Avatar 
                    alt="Userprofilephoto" 
                    src={user.profile_image} 
                    className="profile-avatar"
                    style={{
                      width: '130px',
                      height: '130px' }}
                  />
                </ButtonBase>
                {this.state.isViewersProfile &&                 
                <ButtonBase className="edit profile">
                  <Link to={`/profile/${user.id}/edit`}>
                    <EditIcon color="primary" />
                  </Link>
                </ButtonBase>}
                <Grid item xs container direction="column" spacing={2}>
                  <Typography varient="h1" color="primary">
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
              <Grid item xs container direction="row">

                <Button 
                  size="medium" 
                  fullWidth 
                  variant="outlined" 
                  color="primary" 
                  onClick={this.handleFollow}>
                  {this.state.isFollowing ? '• U n f o l l o w •' : '• F o l l o w •'}
                </Button>
              </Grid>
              <Grid item xs container direction="row" className="followers">
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
                      <Link to={`/photos/${tile.id}`}>
                        <img src={tile.image} alt={tile.title} />
                        <GridListTileBar
                          title={tile.location}
                        />
                      </Link>
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