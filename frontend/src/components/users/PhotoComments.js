import React from 'react'
import ColorTheme from '../../../src/ColorTheme'
import { getUserId } from '../../lib/auth'
import { getUser, addPhotoComment } from '../../lib/api'
import { isAuthenticated } from '../../lib/auth'
import { Typography, Avatar, Grid, TextField, IconButton } from '@material-ui/core'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import { useParams } from 'react-router-dom'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import MessageIcon from '@material-ui/icons/Message'



function PhotoComments()  {

  const [comments, setComments] = React.useState('')
  const [profile_image, setProfile_image] = React.useState('')
  const [username, setUsername] = React.useState('')

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
  },[])

  const handleChange = e => {
    setComments(e.target.value)
  }

  const handleSubmit = async e => {
    if (e.keyCode === 13) {
      await addPhotoComment({ text: e.target.value, photo: currentPhotoId })
    }
  }

  // console.log('use params', useParams())

  // const { comments, profile_image } = this.state
  // const { comment, errors } = this.props
  
  console.log(comments)

  return (
    <>
      <ThemeProvider theme={ColorTheme}>
        <Grid container spacing={2}>
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
        </Grid>
      </ThemeProvider>

    </>

  )
}

export default PhotoComments