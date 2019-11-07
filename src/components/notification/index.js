import React from 'react'
import { connect } from 'react-redux'
import { popNotification } from '../../actions/notification'

class Notification extends React.Component {
  constructor (props) {
    super(props)
    this.toggle = this.checkNotification.bind(this)
  }
  checkNotification () {
    if (this.props.showNotification) {
      setTimeout(() => {
        this.props.popNotification()
      }, 2990)
    }
    return this.props.showNotification
  }

  render () {
    let notification, show
    show = 'hidden'
    if (this.toggle()) {
      show = 'show'
      notification =
        <div className='notification'>
          <div className={this.props.notification.notificationType}>
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
