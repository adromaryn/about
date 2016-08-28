"use strict";

import {
  SET_TITLE,
  SET_CONTENT,
  SET_PROJECTS
} from '../constants/Projects'

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

export function setProjects(projects) {
  return {
    type: SET_PROJECTS,
    payload: projects
  }
}
