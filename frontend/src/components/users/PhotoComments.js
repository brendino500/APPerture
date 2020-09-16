import React from 'react'
import ColorTheme from '../../../src/ColorTheme'
import { getUserId } from '../../lib/auth'
import { getUser, addPhotoComment, showSinglePhoto } from '../../lib/api'
import { isAuthenticated } from '../../lib/auth'
import { Typography, Avatar, Grid, TextField, IconButton, Box } from '@material-ui/core'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import { useParams, Link } from 'react-router-dom'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
import MessageIcon from '@material-ui/icons/Message'

function PhotoComments({ photoComments })  {

  console.log('OBJECT', photoComments)

  const [like, setLike] = React.useState(false)
  const [comments, setComments] = React.useState([])
  const { id: currentPhotoId } = useParams()


  const getData = async () => {
    const res = await showSinglePhoto(photoComments.id)
    // console.log('CHECK RESPONSE', res.data)
    setComments(res.data.comments)
    console.log('RESPONSE', res.data.comments)
  }

  React.useEffect(() => {
    getData()
  },[])

  const handleSubmit = async e => {
    if (e.keyCode === 13) {
      await addPhotoComment({ text: e.target.value, photo: currentPhotoId })
      getData()
    }
  }

  const handleToggle = () => {
    setLike(!like)
  }

  console.log(comments)

  return (
    <ThemeProvider theme={ColorTheme}>
      <Grid container spacing={2}>
        <Box className="photo comments">
          <Grid className="comments">
            <Grid item md container direction="column" >
              {comments.map(comment => (
                <div key={comment.id}>
                  <Box p={1}>
                    <Grid container wrap="nowrap" spacing={2}>
                      <Grid item>
                        <Link to={`/profile/${comment.owner.id}`}>
                          <Avatar 
                            alt="Userprofilephoto" 
                            src={comment.owner.profile_image} 
                            className="profile-avatar"
                          />
                        </Link>
                      </Grid>
                      <Grid item md zeroMinWidth spacing={2}>
                        <Link to={`/profile/${comment.owner.id}`}>
                          <Typography color="secondary" spacing={8} varient="subtitle1">
                            @{comment.owner.username}
                          </Typography>
                        </Link>
                        <Typography color="secondary" spacing={2}>
                          {comment.text}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </div>
              ))}
            </Grid>
            <IconButton aria-label="favourite">
              {(() => {
                if (like) {
                  return <FavoriteIcon
                    color="secondary"
                    onClick={handleToggle}
                  />
                } else {
                  return <FavoriteBorderIcon 
                    color="secondary"
                    onClick={handleToggle}
                  />
                }
              })()}
            </IconButton>
            <IconButton aria-label="comment">
              <MessageIcon color="secondary"/>
            </IconButton>
            <TextField 
              id="outlined-basic" 
              fullWidth
              color="primary"
              label="Add a comment..." 
              onKeyDown={handleSubmit}
              variant="outlined" />
          </Grid>
        </Box>
      </Grid>
    </ThemeProvider>
  )
}

export default PhotoComments
