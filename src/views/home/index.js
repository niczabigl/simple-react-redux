import React from 'react'

class Home extends React.Component {
  constructor () {
    super()
    this.state = {
      demo1: { x: 0, y: 0 },
      demo2: { x: 0, y: 0 },
      demo3: '',
      demo4: ''
    }
    this.mousemoveevent = this.mousemoveevent.bind(this)
  }

  mousemoveevent (e) {
    console.log(e.clientY)
    this.setState({
      demo1: { x: e.clientX, y: e.clientY },
      demo2: { x: e.clientX - 8, y: e.clientY - 8 }
    })
  }
  render () {
    return (
      <div>
        <h1 className='mainTitle'>Home</h1>
        <p>Black dot: {JSON.stringify(this.state.demo2)}</p>
        <p>Cursor: {JSON.stringify(this.state.demo1)}</p>
        <p>{this.demo2}</p>
        <p>{this.demo3}</p>
        <p>{this.demo4}</p>
        <div id='hometest' onMouseMove={this.mousemoveevent}>
          <div style={{ overflow: 'hidden', backgroundColor: 'black', width: '5px', height: '5px', position: 'absolute', left: this.state.demo1.x > 5 ? this.state.demo1.x - 8 : 0, top: this.state.demo1.y - 8 }} />
        </div>
      </div>
    )
  }
}

export default Home
