import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState,
    window.devToolsExtension && window.devToolsExtension())
  return store
}
