"use strict";

import {
  SET_AVATAR,
  SET_NAME,
  SET_CACHED_NAME
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
