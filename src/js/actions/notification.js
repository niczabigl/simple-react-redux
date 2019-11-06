import constantes from '../constantes'

export const pushNotification = (notification) => ({
  type: constantes.PUSH_NOTIFICATION, notification
})

export const popNotification = () => ({
  type: constantes.POP_NOTIFICATION
})
