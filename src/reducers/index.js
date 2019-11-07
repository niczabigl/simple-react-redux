import { combineReducers } from 'redux'
import cursoReducer from './curso'
import notificationReducer from './notification'
import totalsReducer from './totals'

const rootReducer = combineReducers(
  {
    cursos: cursoReducer,
    notification: notificationReducer,
    totals: totalsReducer
  }
)

export default rootReducer
