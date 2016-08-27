"use strict";

import {
  SET_TITLE,
  SET_CONTENT
} from '../constants/NewProject'

const initialState ={
  title: '',
  content: '',
}

export default function newProject(state = initialState, action) {
  switch (action.type) {
    case SET_TITLE:
      return { ...state, title: action.payload };
    case SET_CONTENT:
      return { ...state, content: action.payload };
    default:
      return state;
  }
}
