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

class Profile extends React.Component {
  render() {
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
        <Box component="span" className="photo-view">

        </Box>
      </Container>
    )
  }
}

export default Profile 