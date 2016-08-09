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

const initialState ={
  nick: '',
  password: '',
  passwordConfirmation: '',
  question: 'Кличка первого питомца',
  yourQVisible: false,
  yourQuestion: '',
  answer: '',
  name: '',
  resume: '',
  about: '',
  avatar: undefined
}

export default function registration(state = initialState, action) {

  switch (action.type) {
    case SET_NICK:
      return { ...state, nick: action.payload };
    case SET_PASSWORD:
      return { ...state, password: action.payload };
    case SET_CONFIRMATION:
      return { ...state, passwordConfirmation: action.payload };
    case SET_QUESTION:
      return { ...state, question: action.payload };
    case SET_YOUR_QUESTION_VISIBILITY:
      return { ...state, yourQVisible: action.payload };
    case SET_YOUR_QUESTION:
      return { ...state, yourQuestion: action.payload };
    case SET_ANSWER:
      return { ...state, answer: action.payload };
    case SET_NAME:
      return { ...state, name: action.payload };
    case SET_RESUME:
      return { ...state, resume: action.payload };
    case SET_ABOUT:
      return { ...state, about: action.payload };
    case SET_AVATAR:
      return { ...state, avatar: action.payload}
    default:
      return state;
  }
}
