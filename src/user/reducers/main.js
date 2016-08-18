"use strict";

import {
  SET_AVATAR,
  SET_NAME,
  SET_CACHED_NAME
} from '../constants/Main'

import 'whatwg-fetch';

const initialState ={
  nick: window.user.username,
  name: window.user.name,
  nameCached: window.user.name,
  resume: window.user.resume,
  about: window.user.about,
  avatar: window.ava
}

export default function main(state = initialState, action) {

  switch (action.type) {
    case SET_AVATAR:
      return { ...state, avatar: action.payload };
    case SET_NAME:
      return { ...state, name: action.payload};
    case SET_CACHED_NAME:
      return { ...state, nameCached: action.payload};
    default:
      return state;
  }
}
