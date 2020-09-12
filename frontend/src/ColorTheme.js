import { createMuiTheme } from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/grey'

export default createMuiTheme({
  palette: {
    primary: {
      main: grey[400]
    },
    secondary: {
      main: grey[700]
    }
    // // primary: { 400: '#bdbdbd' },
    // primary2Color: { 400: '#bdbdbd' },
    // primary3Color: { 400: '#bdbdbd' },
    // secondary: { 700: '#616161' },
    // secondary2Color: { 500: '#9e9e9e' },
    // secondary3Color: { 500: '#9e9e9e' },
    // textColor: { 50: '#fafafa' },
    // secondaryTextColor: { 50: '#fafafa' },
    // alternateTextColor: { 800: '#424242' },
    // shadowColor: { 900: '#212121' }
  }
})