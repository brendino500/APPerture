import React from 'react'
import ColorTheme from '../../../src/ColorTheme'
import { getUserId } from '../../lib/auth'
import { getUser, addPhotoComment, showSinglePhoto } from '../../lib/api'
import { isAuthenticated } from '../../lib/auth'
import { Typography, Avatar, Grid, TextField, IconButton, Box } from '@material-ui/core'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import { useParams } from 'react-router-dom'
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
    <>
      <ThemeProvider theme={ColorTheme}>
        <Grid container spacing={2}>
          <Box className="photo comments">
            <Grid item md container direction="column" >
              {comments.map(comment => (
                <div key={comment.id}>
                  <Avatar 
                    alt="Userprofilephoto" 
                    src={comment.owner.profile_image} 
                    className="profile-avatar"
                  />
                  <Typography>
                    @{comment.owner.username}
                  </Typography>
                  <Typography>
                    {comment.text}
                  </Typography>
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
          </Box>
        </Grid>
      </ThemeProvider>
    </>

  )
}

export default PhotoComments

