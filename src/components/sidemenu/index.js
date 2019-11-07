import React from 'react'
import { Link } from 'react-router-dom'

class SideMenu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      show: props.show || false
    }
  }
  componentWillReceiveProps (nextProps) {
    // console.log('SideMenu componentWillReceiveProps', nextProps)
    this.setState({
      show: nextProps.show
    })
  }
  showSideMenu (event) {
    this.setState({ show: !this.state.show })
  }
  render () {
    return (
      <div className='mainside'>
        {this.state.show ? (
          <div id='mainSidebar' v-if='showMainSide' className='w3-sidebar w3-bar-block' >
            <div className='logocontainer w3-bar-block'>
              <button id='toggleSideBarIn' onClick={this.showSideMenu.bind(this)} className='w3-button w3-teal w3-xlarge'><span>≡</span></button>
            </div>

            <nav className='w3-bar-block'>
              <div className='menu-card'>
                <h3 className='w3-bar-item w3-center'>Menu</h3>
                <Link className='w3-bar-item' to='/'>Home</Link>
                <Link className='w3-bar-item' to='/about'>About</Link>
                <Link className='w3-bar-item' to='/courses'>Courses</Link>
                <Link className='w3-bar-item' to='/photo'>Gallery</Link>
                <Link className='w3-bar-item' to='/totals'>Totals</Link>
              </div>
            </nav>

            <div className='w3-full-height'>
              <div className='w3-display-bottomleft '>
                <div className='w3-bar-block' />
              </div>
            </div>
          </div>
        ) : (<button id='toggleSideBarOut' onClick={this.showSideMenu.bind(this)} className='w3-button w3-teal w3-xlarge'><span>≡</span></button>)}
      </div>
    )
  }
}

export default SideMenu
