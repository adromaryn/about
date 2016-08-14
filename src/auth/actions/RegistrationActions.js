import {
  SET_NICK,
  SET_PASSWORD,
  SET_CONFIRMATION,
  SET_QUESTION,
  SET_YOUR_QUESTION_VISIBILITY,
  SET_YOUR_QUESTION,
  SET_ANSWER,
  SET_NAME,
  SET_RESUME,
  SET_ABOUT,
  SET_AVATAR
} from '../constants/Registration'

import 'whatwg-fetch';

export function setNick(nick) {
  return {
    type: SET_NICK,
    payload: nick
  }
}

export function setPassword(password) {
  return {
    type: SET_PASSWORD,
    payload: password
  }
}

export function setConfirmation(confirmation) {
  return {
    type: SET_CONFIRMATION,
    payload: confirmation
  }
}

export function setName(name) {
  return {
    type: SET_NAME,
    payload: name
  }
}

export function setQuestion(question) {
  return {
    type: SET_QUESTION,
    payload: question
  }
}

export function setYourQuestionVisibility(visible) {
  return {
    type: SET_YOUR_QUESTION_VISIBILITY,
    payload: visible
  }
}

export function setYourQuestion(question) {
  return {
    type: SET_YOUR_QUESTION,
    payload: question
  }
}

export function setAnswer(answer) {
  return {
    type: SET_ANSWER,
    payload: answer
  }
}

export function setResume(resume) {
  return {
    type: SET_RESUME,
    payload: resume
  }
}

export function setAbout(about) {
  return {
    type: SET_ABOUT,
    payload: about
  }
}

export function setAvatar(avatar) {
  return {
    type: SET_AVATAR,
    payload: avatar
  }
}
