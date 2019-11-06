import React from 'react'
import { connect } from 'react-redux'
import { popNotification } from '../../actions/notification'
import { success, warning, info, error } from '../../assets/icons/index'

class Notification extends React.Component {
  constructor (props) {
    super(props)
    this.toggle = this.checkNotification.bind(this)
  }
  checkNotification () {
    if (this.props.showNotification) {
      this.props.notification.img = this.getImg(this.props.notification.notificationType)
      setTimeout(() => {
        this.props.popNotification()
      }, 3000)
    }
    return this.props.showNotification
  }
  getImg (type) {
    switch (type) {
      case 'success':
        return success
      case 'warning':
        return warning
      case 'info':
        return info
      case 'error':
        return error
      default:
        return info
    }
  }
  render () {
    let notification, show
    show = 'hidden'
    if (this.toggle()) {
      show = 'show'
      notification =
        <div className='notification'>
          <img className='img w3-quarter' src={this.props.notification.img} />
          <div className={'content w3-threequarter ' + this.props.notification.notificationType}>
            <div className='tittle'>{this.props.notification.title}</div>
            <div className='message'>{this.props.notification.message}</div>
          </div>
        </div>
      return (
        <div id='snackbar' className={show}>{ notification }</div>
      )
    } else {
      return (
        <div id='snackbar' />
      )
    }
  }
}
const mapStateToProps = (state) => {
  return ({
    showNotification: state.notification.show,
    notification: state.notification.n
  })
}
const mapDispatchToProps = dispatch => {
  return ({
    popNotification: n => dispatch(popNotification())
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(Notification)
