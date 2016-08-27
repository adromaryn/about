"use strict";

import {
  SET_TITLE,
  SET_CONTENT
} from '../constants/NewProject'

export function setTitle(title) {
  return {
    type: SET_TITLE,
    payload: title
  }
}

export function setContent(content) {
  return {
    type: SET_CONTENT,
    payload: content
  }
}
