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

export function setAvatar(avatar) {
  return {
    type: SET_AVATAR,
    payload: avatar
  }
}

export function setName(name) {
  return {
    type: SET_NAME,
    payload: name
  }
}

export function setCachedName(name) {
  return {
    type: SET_CACHED_NAME,
    payload: name
  }
}

export function setResume(resume) {
  return {
    type: SET_RESUME,
    payload: resume
  }
}

export function setCachedResume(resume) {
  return {
    type: SET_CACHED_RESUME,
    payload: resume
  }
}

export function setAbout(about) {
  return {
    type: SET_ABOUT,
    payload: about
  }
}

export function setCachedAbout(about) {
  return {
    type: SET_CACHED_ABOUT,
    payload: about
  }
}
