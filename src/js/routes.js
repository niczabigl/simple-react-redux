import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import About from './views/about'
import Home from './views/home'
import SideMenu from './components/sidemenu'
import Notification from './components/notification'

class Routes extends React.Component {
  render () {
    return (
      <Router>
        <div className='w3-container'>
          <SideMenu />
          <Notification />
        </div>
        <div className='w3-container'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/about' component={About} />
            <Route path='/home' component={Home} />
            {/* <Route component={Notfound} /> */}
          </Switch>
        </div>
      </Router>
    )
  }
}

export default Routes
