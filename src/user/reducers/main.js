"use strict";

import {
  SET_AVATAR,
  SET_NAME,
  SET_CACHED_NAME,
  SET_RESUME,
  SET_CACHED_RESUME,
  SET_ABOUT,
  SET_CACHED_ABOUT
} from '../constants/Main'

const initialState ={
  nick: window.user.username,
  name: window.user.name,
  nameCached: window.user.name,
  resume: window.user.resume,
  resumeCached: window.user.resume,
  about: window.user.about,
  aboutCached: window.user.about,
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
    case SET_RESUME:
      return { ...state, resume: action.payload};
    case SET_CACHED_RESUME:
      return { ...state, resumeCached: action.payload};
    case SET_ABOUT:
      return { ...state, about: action.payload};
    case SET_CACHED_ABOUT:
      return { ...state, aboutCached: action.payload};
    default:
      return state;
  }
}
