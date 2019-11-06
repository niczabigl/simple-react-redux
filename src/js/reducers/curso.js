import constantes from '../constantes'
export default (state = {}, action) => {
  switch (action.type) {
    case constantes.CREAR_CURSO:
      console.log('CREAR_CURSO curso', action.payload)
      return { ...state, list: [...state.list, action.payload] }
    case constantes.INCREMENTAR_ID:
      console.log('INCREMENTAR_ID state.autogenid', state.autogenid)
      return { ...state, autogenid: state.autogenid + 1 }
    case constantes.BORRAR_CURSO:
      console.log('BORRAR_CURSO id', action.payload.id)
      return { ...state, list: state.list.filter(c => c.id !== parseInt(action.payload.id)) }
    case constantes.DECREMENTAR_ID:
      console.log('DECREMENTAR_ID state.autogenid', state.autogenid)
      return { ...state, autogenid: state.autogenid - 1 }
    case constantes.EDIT_CURSO:
      console.log('EDIT_CURSO', state)
      const updatedItems = state.list.map(item => {
        if (item.id === action.id) {
          return action.payload
        }
        return item
      })
      console.log(updatedItems)
      return { ...state, list: updatedItems }
    default:
      return state
  }
}
