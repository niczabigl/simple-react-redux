import React from 'react'
import { connect } from 'react-redux'
import { pushNotification } from '../../actions/notification'

class About extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  render () {
    return (
      <div>
        <h1 className='w3-center'>About</h1>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return ({

  })
}
const mapDispatchToProps = dispatch => {
  return ({
    pushNotification: n => dispatch(pushNotification(n))
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(About)
