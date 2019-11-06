import React from 'react'
import fetch from 'isomorphic-fetch'

class ColumnaImagen extends React.Component {
  render () {
    return (
      <div className='responsive-grid-column'>{this.props.fotos.map((f) => <Imagen key={f.src} src={f.src} />)}</div>
    )
  }
}
class Imagen extends React.Component {
  render () {
    return (<img alt={this.props.id} src={this.props.src} />)
  }
}

class Gallery extends React.Component {
  constructor (params) {
    super(params)
    this.state = {
      host: 'https://picsum.photos',
      initialState: false,
      columnasFotos: [],
      numColumnas: 4
    }

    // setTimeout(() => {
    //   this.setState({ initialState: false })
    // }, 3000)
  }
  componentWillMount () {
    // console.log('componentWillMount')
  }
  componentDidUpdate () {
    // console.log('componentDidUpdate', this)
  }
  componentDidMount () {
    // pillar las imagenes con ajax
    // console.log('componentDidMount')
    let promises = []
    let fotos = []
    for (let i = 0; i < 18; i++) {
      if (i % 2 === 0) {
        let height = Math.floor(Math.random() * (350 - 250) + 250)
        let p = fetch(`${this.state.host}/200/${height}`)
        promises.push(p)
      } else {
        let p = fetch(`${this.state.host}/200`)
        promises.push(p)
      }
    }
    Promise.all(promises)
      .then(result => {
        let columnCounter = Math.floor(result.length / this.state.numColumnas)
        let fotoCounter = 0
        result.map((r) => {
          if (r.status === 200) {
            let id = r.url.split('/')
            fotos.push({ id: id[4], src: r.url })
            fotoCounter++
            if (columnCounter === fotoCounter) {
              this.setState({ columnasFotos: [...this.state.columnasFotos, { id: this.state.columnasFotos.length, fotos: fotos }] })
              fotos = []
              fotoCounter = 0
            }
          }
          return true
        })
      })
  }
  componentWillReceiveProps (nextProps) {
    console.log('componentWillReceiveProps', nextProps)
  }
  shouldComponentUpdate (nextProps, nextState) {
    console.log('componentWillReceiveProps', nextProps, nextState)
    if (nextProps !== nextState) return true
    return false
  }
  render () {
    return (
      <div className='w3-container'>
        <h1>Gallery</h1>
        <div className='responsive-grid-row'>
          {this.state.columnasFotos.map((c) => <ColumnaImagen key={c.id} fotos={c.fotos} />)}
        </div>
      </div>
    )
  }
}

export default Gallery
