import React from 'react'
import { connect } from 'react-redux'

class Body extends React.Component {
  render () {
    return (
      <div id='cbody' className='content-body'>
        {this.props.children}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({

})

export default connect(null, mapDispatchToProps)(Body)
