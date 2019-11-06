import { combineReducers } from 'redux'
import cursoReducer from './curso'
import notificationReducer from './notification'

const rootReducer = combineReducers(
  {
    cursos: cursoReducer,
    notification: notificationReducer
  }
)

export default rootReducer
