import { notify } from 'react-notify-toast'

const popupStyles = { background: 'black', text: 'white' }

export const popupNotification = message => {
  notify.show(message, 'custom', 3000, popupStyles)
}