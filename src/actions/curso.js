import constants from '../constants'

export const crearCurso = (curso) => ({
  type: constants.curso.CREAR_CURSO, payload: curso
})

export const idCursoIncrement = () => ({
  type: constants.curso.INCREMENTAR_ID
})

export const borrarCurso = (curso) => ({
  type: constants.curso.BORRAR_CURSO, payload: curso
})

export const idCursoDecrement = () => ({
  type: constants.curso.DECREMENTAR_ID
})

export const selectCurso = (curso) => ({
  type: constants.curso.SELECCIONAR_CURSO, payload: curso
})

export const deselectCurso = () => ({
  type: constants.curso.DESELECCIONAR_CURSO
})

export const unselectAll = () => ({
  type: constants.curso.DESELECCIONAR_TODO
})

export const editCurso = (curso) => ({
  type: constants.curso.EDIT_CURSO, id: curso.id, payload: curso
})
