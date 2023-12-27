import decode from 'jwt-decode'


const TOKEN_KEY = 'ANSSYS_TOKEN'
const USER_KEY  = 'ANSSYS_USER'

export const getToken = () => {
  return window.localStorage.getItem(TOKEN_KEY)
}


export const removeUser = () => {
  window.localStorage.removeItem(USER_KEY)
}

export const loadUser = () => {
  return JSON.parse(window.localStorage.getItem(USER_KEY))
}

export const saveUser = (data) => {
  window.localStorage.setItem(USER_KEY, JSON.stringify(data))
}


export default { loadUser, saveUser, removeUser, getToken }