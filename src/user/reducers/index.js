"use strict";

import { combineReducers } from 'redux'
import main from './main'
import contacts from './contacts'
import projects from './projects'

export default combineReducers({
  main,
  contacts,
  projects
})
