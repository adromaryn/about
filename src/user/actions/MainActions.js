"use strict";

import {
  SET_AVATAR
} from '../constants/Main'

export function setAvatar(avatar) {
  return {
    type: SET_AVATAR,
    payload: avatar
  }
}
