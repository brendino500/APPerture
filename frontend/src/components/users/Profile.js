import React from 'react'
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
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
// import GridListTile from '@material-ui/core/GridListTile'
import { PopupboxManager, PopupboxContainer } from 'react-popupbox'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListSubheader from '@material-ui/core/ListSubheader'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import tileData from './tileData'
import { makeStyles } from '@material-ui/core/styles'

class Profile extends React.Component {

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

  // useStyles = makeStyles((theme) => ({
  //   root: {
  //     display: 'flex',
  //     flexWrap: 'wrap',
  //     justifyContent: 'space-around',
  //     overflow: 'hidden',
  //     backgroundColor: theme.palette.background.paper
  //   },
  //   gridList: {
  //     width: 500,
  //     height: 450
  //   },
  //   icon: {
  //     color: 'rgba(255, 255, 255, 0.54)'
  //   }
  // }));

  render() {
    // const classes = useStyles()
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
          <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
            <Button><AppsIcon /></Button>
            <Button><ViewAgendaIcon /></Button>
            <Button><RoomIcon /></Button>
          </ButtonGroup>
        </Box>
        <br />
        <Box component="span" className="photo-view">
          <Card className="text" onClick={this.openPopupbox}>
            <CardContent>
              <Typography className="text" color="textSecondary" gutterBottom>
          Word of the Day
              </Typography>
              <Typography variant="h5" component="h2">
          Text
              </Typography>
              <Typography className="text" color="textSecondary">
          adjective
              </Typography>
              <Typography variant="body2" component="p">
          well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box className="test">
          <div className="test">
            <GridList cellHeight={180} className="test">
              <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                <ListSubheader component="div">December</ListSubheader>
              </GridListTile>
              {tileData.map((tile) => (
                <GridListTile key={tile.img}>
                  <img src={tile.img} alt={tile.title} />
                  <GridListTileBar
                    title={tile.title}
                    subtitle={<span>by: {tile.author}</span>}
                    actionIcon={
                      <IconButton aria-label={`info about ${tile.title}`} className="test">
                        <InfoIcon />
                      </IconButton>
                    }
                  />
                </GridListTile>
              ))}
            </GridList>
          </div>
        </Box>
      </Container>
    )
  }
}

export default Profile 