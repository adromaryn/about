"use strict";

import { combineReducers } from 'redux'
import main from './main'
import contacts from './contacts'
import newProject from './newProject'

export default combineReducers({
  main,
  contacts,
  newProject
})
