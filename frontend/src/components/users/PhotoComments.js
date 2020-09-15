import React from 'react'
import ColorTheme from '../../../src/ColorTheme'
import { getUserId } from '../../lib/auth'
import { getUser, addPhotoComment, showSinglePhoto } from '../../lib/api'
import { isAuthenticated } from '../../lib/auth'
import { Typography, Avatar, Grid, TextField, IconButton, Box } from '@material-ui/core'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import { useParams } from 'react-router-dom'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import MessageIcon from '@material-ui/icons/Message'


function PhotoComments()  {
  const [comments, setComments] = React.useState('')
  const [commentData, setCommentData] = React.useState('')
  // const { photoComments } = this.props
  const { id: currentPhotoId } = useParams()

  
  React.useEffect(() => {
    const currentUserId = getUserId()
    const loggedIn = isAuthenticated()
    if (!loggedIn) {
      setComments('')
    } else {
      const res = getUser(currentUserId)
      setComments(res.data)
    }

    // const commentRes = showSinglePhoto(currentUserId)
    // console.log('commentRes', commentRes)

  },[])

  const handleChange = e => {
    setComments(e.target.value)
  }

  const handleSubmit = async e => {
    if (e.keyCode === 13) {
      await addPhotoComment({ text: e.target.value, photo: currentPhotoId })
    }
  }

  console.log('comments', comments)

  return (
    <>
      <ThemeProvider theme={ColorTheme}>
        <Grid container spacing={2}>
          <Box className="photo comments">
            {}

            <IconButton aria-label="favourite">
              <FavoriteBorderIcon 
                color="secondary"
              // onClick={this.handleOnClick}
              />
            </IconButton>
            <IconButton aria-label="comment">
              <MessageIcon color="secondary"/>
            </IconButton>
            <TextField 
              id="outlined-basic" 
              fullWidth
              color="primary"
              label="Add a comment..." 
              onChange={handleChange}
              onKeyDown={handleSubmit}
              variant="outlined" />
          </Box>
        </Grid>
      </ThemeProvider>

    </>

  )
}

export default PhotoComments