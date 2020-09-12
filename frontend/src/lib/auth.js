export const setToken = receivedToken => {
  window.localStorage.setItem('token', receivedToken)
}

export const getToken = () => {
  return window.localStorage.getItem('token')
}

export const logout = () => {
  window.localStorage.removeItem('token')
}

const getPayload = () => {
  const token = getToken()
  // ! console.log('REACHING CHECK TOKEN', token)
  if (!token) return false
  const parts = token.split('.')
  // ! console.log('REACHING CHECK PARTS', parts)
  if (parts.length < 3) return false
  // console.log('REACHING DO WE REACH THIS STAGE')
  return JSON.parse(window.atob(parts[1]))
}

export const isAuthenticated = () => {
  const payload = getPayload()
  // ! console.log('REACHING STAGE 1',payload)
  if (!payload) return false
  const now = Math.round(Date.now() / 1000)
  // ! console.log('REACHING STAGE 2', now)
  // ! console.log('REACHING STAGE 3',now < payload.exp)
  return now < payload.exp
}

export const isOwner = userId => {
  if (!isAuthenticated) return false
  return userId === getPayload().sub
}

export const getUserId = () => {
  return getPayload().sub
}
