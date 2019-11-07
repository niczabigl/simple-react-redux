import React from 'react'
import { connect } from 'react-redux'
import FooterOption from './footeroption'

class Footer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      footeroptions: props.footeroptions || {}
    }
  }
  componentWillReceiveProps (nextProps) {
    this.setState({ footeroptions: nextProps.footeroptions })
  }
  render () {
    let fos = []
    for (let i in this.state.footeroptions) {
      if (this.state.footeroptions[i].show) {
        fos.push(<FooterOption key={i}
          title={this.state.footeroptions[i].title}
          icon={this.state.footeroptions[i].icon}
          action={this.state.footeroptions[i].action}
          isLink={this.state.footeroptions[i].isLink}
          link={this.state.footeroptions[i].link}
          show={this.state.footeroptions[i].show} />)
      }
    }
    return (
      <div id='cfooter' className='content-footer'>
        {fos}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({

})

export default connect(null, mapDispatchToProps)(Footer)
