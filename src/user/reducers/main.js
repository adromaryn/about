"use strict";

import {
  SET_AVATAR
} from '../constants/Main'

import 'whatwg-fetch';

const initialState ={
  nick: window.user.username,
  resume: window.user.resume,
  avatar: window.ava
}

export default function main(state = initialState, action) {

  switch (action.type) {
    case SET_AVATAR:
      return { ...state, avatar: action.payload };
    default:
      return state;
  }
}
