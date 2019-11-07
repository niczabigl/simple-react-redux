import constantes from '../constants'

export const pushNotification = (notification) => ({
  type: constantes.notification.PUSH_NOTIFICATION, notification
})

export const popNotification = () => ({
  type: constantes.notification.POP_NOTIFICATION
})
