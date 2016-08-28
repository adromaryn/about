"use strict";

import {
  SET_TITLE,
  SET_CONTENT,
  SET_PROJECTS
} from '../constants/Projects'

const initialState ={
  title: '',
  content: '',
  projects: window.user.projects
}

export default function newProject(state = initialState, action) {
  switch (action.type) {
    case SET_TITLE:
      return { ...state, title: action.payload };
    case SET_CONTENT:
      return { ...state, content: action.payload };
    case SET_PROJECTS:
      return { ...state, projects: action.payload };
    default:
      return state;
  }
}
