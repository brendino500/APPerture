import React from 'react'
import ProfileMap from './ProfileMap'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Box from '@material-ui/core/Box'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import AppsIcon from '@material-ui/icons/Apps'
import ViewAgendaIcon from '@material-ui/icons/ViewAgenda'
import RoomIcon from '@material-ui/icons/Room'
import GridListTile from '@material-ui/core/GridListTile'
import GridList from '@material-ui/core/GridList'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import { makeStyles } from '@material-ui/core/styles'
import { getAllPhotos, getAllUsers, getUser } from '../../lib/api'
import { PopupboxManager, PopupboxContainer } from 'react-popupbox'
class Profile extends React.Component {
  state = { 
    data: [],
    user: null,
    hideMap: true,
    hideGrid: false
  }
  async componentDidMount() {
    try {
      // const resPhoto = await getAllPhotos()
      // this.setState({ data: resPhoto.data })
      const resUser = await getUser(this.props.match.params.id)
      console.log(resUser.data)
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
  useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper
    },
    gridList: {
      width: 500,
      height: 450
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)'
    }
  }));
  render() {
    console.log(this.state.user)
    if (!this.state.user) return null
    return (
      <Container maxWidth="sm">
        <Box component="span" className="profile-info">
          <Grid className="profile-photo-followers">
            <ButtonBase className="profile-image">
              <img className="profile-image"/>
            </ButtonBase>
            <Grid className="username-info">
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography varient="h5">
                    Username
                  </Typography>
                  <Typography varient="subtitle1">
                    First Name
                  </Typography>
                  <Typography varient="subtitle2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin turpis elit, tincidunt a placerat sit amet, accumsan porttitor sem. Nam sed libero maximus, eleifend dui vitae, posuere augue. 
                  </Typography>
                  <br />
                  <Divider />
                </Grid>
              </Grid>
              <Grid item xs container direction="row" spacing={2}>
                <Grid item xs>
                  <Typography varient="p">
                    29 <br /> Posts
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography varient="p">
                    48 <br /> Followers
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography varient="p">
                    532 <br /> Following
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
                {this.state.user.created_photo.map((tile) => (
                  <GridListTile key={tile.image}>
                    <img src={tile.image} alt={tile.title} />
                    <GridListTileBar
                      title={tile.location}
                      subtitle={<span>by: {tile.location}</span>}
                      actionIcon={
                        <IconButton aria-label={`info about ${tile.location}`} className="test">
                          <InfoIcon />
                        </IconButton>
                      }
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
    )
  }
}
export default Profile 