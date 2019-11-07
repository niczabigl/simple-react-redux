import React from 'react'
import { Link } from 'react-router-dom'
class FooterOption extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: props.icon.split('.')[0] || '',
      title: props.title || '',
      icon: props.icon || '',
      show: props.show || true,
      action: props.action || undefined,
      isLink: props.isLink || false,
      link: props.link || {}
    }
  }
  componentWillReceiveProps (nextProps) {
    this.setState(nextProps)
  }
  render () {
    let footeroption
    if (this.state.isLink) {
      footeroption = (<Link props={this.state.link.props} to={`${this.state.link.url}`}><div id={this.state.id} className='footer-option'><img src={`../js/assets/images/${this.state.icon}`} /><span>{this.state.title}</span></div></Link>)
    } else {
      footeroption = (<div id={this.state.id} onClick={this.state.action.bind(this)} className='footer-option'><img src={`../js/assets/images/${this.state.icon}`} /><span>{this.state.title}</span></div>)
    }
    return (
      footeroption
    )
  }
}

export default FooterOption
