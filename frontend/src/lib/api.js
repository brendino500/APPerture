import axios from 'axios'
import { getToken } from './auth'
const baseUrl = '/api'

const withHeaders = () => {
  return {
    headers: { Authorization: `Bearer ${getToken()}` }
  }
}

// Photo Related *******************************
export const getAllPhotos = () => {
  return axios.get(`${baseUrl}/photos`)
}

export const showSinglePhoto = id => {
  return axios.get(`${baseUrl}/photos/${id}`)
}

export const deletePhoto = id => {
  return axios.delete(`${baseUrl}/photos/${id}`)
}


// Comment Related **********************
export const addPhotoComment = (formData) => {
  console.log(formData)
  return axios.post(`${baseUrl}/comments/`, formData, withHeaders())
}

export const deleteComment = (id, commentId) => {
  return axios.delete(`${baseUrl}/photos/${id}/comments/${commentId}`)
}


// User Registration **************************
export const registerUser = formData => {
  return axios.post(`${baseUrl}/auth/register/`, formData)
}

export const loginUser = formData => {
  return axios.post(`${baseUrl}/auth/login/`, formData )
}


// Profile Related **************************
export const getAllUsers = () => {
  return axios.get(`${baseUrl}/auth/profiles`, withHeaders())
}

// export const getSingleUser = (pk) => {
//   return axios.get(`${baseUrl}/auth/profile/${pk}`, withHeaders())
// }

export const getUser = userId => {
  return axios.get(`${baseUrl}/auth/profile/${userId}`, withHeaders())
}

export const followUser = followedUserId => {
  return axios.post(`${baseUrl}/auth/profile/${followedUserId}/`, null, withHeaders())
}

export const editUser = (userId, formData) => {
  return axios.put(`${baseUrl}/auth/profile/${userId}`, formData, withHeaders())
}