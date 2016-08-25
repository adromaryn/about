"use strict";

import {
  SET_TELEGRAM
} from '../constants/Contacts'

export function setTelegram(telegram) {
  return {
    type: SET_TELEGRAM,
    payload: telegram
  }
}
