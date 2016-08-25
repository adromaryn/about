"use strict";

import {
  SET_TELEGRAM
} from '../constants/Contacts'

const initialState ={
  telegram: window.user.telegram,
  cachedTelegram: window.user.telegram,
}

export default function login(state = initialState, action) {
  switch (action.type) {
    case SET_TELEGRAM:
      return { ...state, telegram: action.payload };
    default:
      return state;
  }
}
