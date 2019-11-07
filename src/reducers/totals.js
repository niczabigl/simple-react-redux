import constants from '../constants'
export default (state = {}, action) => {
  switch (action.type) {
    case constants.totals.SETUP_TOTALS:
      console.log('SETUP_TOTALS ', action.totals)
      return { ...state, ...action.totals }
    default:
      return state
  }
}
