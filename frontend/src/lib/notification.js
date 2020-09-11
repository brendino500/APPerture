import { notify } from 'react-notify-toast'

const popupStyles = { background: '#05515d', text: '#c7cecf' }

export const popupNotification = message => {
  notify.show(message, 'custom', 3001, popupStyles)
}