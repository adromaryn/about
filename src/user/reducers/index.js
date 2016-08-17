"use strict";

import { combineReducers } from 'redux'
import main from './main'
import contacts from './contacts'

export default combineReducers({
  main,
  contacts,
})
