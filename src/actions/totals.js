import constants from '../constants'

export const setupTotals = (totals) => ({
  type: constants.totals.SETUP_TOTALS, totals
})
