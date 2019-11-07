import constants from '../constants'
export default (state = {}, action) => {
  switch (action.type) {
    case constants.curso.CREAR_CURSO:
      console.log('CREAR_CURSO curso', action.payload)
      return { ...state, list: [...state.list, action.payload] }
    case constants.curso.INCREMENTAR_ID:
      console.log('INCREMENTAR_ID state.autogenid', state.autogenid)
      return { ...state, autogenid: state.autogenid + 1 }
    case constants.curso.BORRAR_CURSO:
      console.log('BORRAR_CURSO id', action.payload.id)
      return { ...state, list: state.list.filter(c => c.id !== parseInt(action.payload.id)) }
    case constants.curso.DECREMENTAR_ID:
      console.log('DECREMENTAR_ID state.autogenid', state.autogenid)
      return { ...state, autogenid: state.autogenid - 1 }
    case constants.curso.EDIT_CURSO:
      console.log('EDIT_CURSO', action)
      const updatedItems = state.list.map(item => {
        if (item.id === action.id) {
          return action.payload
        }
        return item
      })
      return { ...state, list: updatedItems }
    default:
      return state
  }
}
