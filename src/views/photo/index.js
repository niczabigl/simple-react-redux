import React from 'react'
import { connect } from 'react-redux'
import Galery from '../../components/gallery'
import { pushNotification } from '../../actions/notification'

class Photo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      photos: props.photos || []
    }
  }

  render () {
    return (
      <div className='w3-container'>
        <Galery />
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return ({
    id: state.cursos.autogenid
  })
}
const mapDispatchToProps = dispatch => {
  return ({
    pushNotification: n => dispatch(pushNotification(n))
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(Photo)
