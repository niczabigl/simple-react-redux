import React from 'react'
import { connect } from 'react-redux'

class Header extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      topbanner: props.topbanner || '../js/assets/logo-comercia.png',
      title: props.title || ''
    }
  }
  componentWillReceiveProps (nextProps) {

  }

  render () {
    return (
      <div id='cheader' className='content-header'>
        <div className='topbanner'><img src={this.state.topbanner} /></div>
        <div className='page-title'>
          <span>{this.state.title}</span>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({

})

export default connect(null, mapDispatchToProps)(Header)
