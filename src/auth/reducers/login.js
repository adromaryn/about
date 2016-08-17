"use strict";

import { SET_LOGIN, SET_PASSWORD } from '../constants/Login'

const initialState ={
  login: '',
  passwordLogin: ''
}

export default function login(state = initialState, action) {

  switch (action.type) {
    case SET_LOGIN:
      return { ...state, login: action.payload };
    case SET_PASSWORD:
      return { ...state, passwordLogin: action.payload}
    default:
      return state;
  }
}
