import { SET_LOGIN, SET_PASSWORD } from '../constants/Login'

export function setLogin(login) {
  return {
    type: SET_LOGIN,
    payload: login
  }
}

export function setPassword(password) {
  return {
    type: SET_PASSWORD,
    payload: password
  }
}
