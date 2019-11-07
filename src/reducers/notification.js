import constants from '../constants'

export default (state = {}, action) => {
  switch (action.type) {
    case constants.notification.PUSH_NOTIFICATION:
      console.log('PUSH_NOTIFICATION ', action.notification)
      return { ...state, n: action.notification, show: true }
    case constants.notification.POP_NOTIFICATION:
      console.log('POP_NOTIFICATION ')
      return { ...state, show: false }
    default:
      return state
  }
}
