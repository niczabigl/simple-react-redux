import constantes from '../constantes'

export const crearCurso = (curso) => ({
  type: constantes.CREAR_CURSO, payload: curso
})

export const idCursoIncrement = () => ({
  type: constantes.INCREMENTAR_ID
})

export const borrarCurso = (curso) => ({
  type: constantes.BORRAR_CURSO, payload: curso
})

export const idCursoDecrement = () => ({
  type: constantes.DECREMENTAR_ID
})

export const selectCurso = (curso) => ({
  type: constantes.SELECCIONAR_CURSO, payload: curso
})

export const deselectCurso = () => ({
  type: constantes.DESELECCIONAR_CURSO
})

export const unselectAll = () => ({
  type: constantes.DESELECCIONAR_TODO
})

export const editCurso = (curso) => ({
  type: constantes.EDIT_CURSO, id: curso.id, payload: curso
})
