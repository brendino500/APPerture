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
export const photoComment = (id, formData) => {
  return axios.post(`${baseUrl}/photos/${id}/comments`, formData)
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
  return axios.get(`${baseUrl}/profile`, withHeaders())
}

export const getUser = userId => {
  return axios.get(`${baseUrl}/profile/${userId}`, withHeaders())
}

export const editUser = (userId, formData) => {
  return axios.put(`${baseUrl}/profile/${userId}`, formData, withHeaders())
}