import React from 'react'
import { connect } from 'react-redux'
import { pushNotification } from '../../actions/notification'
import SpinLoader from '../spinloader'
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
      loaded: false,
      loadpercent: 0,
      columnasFotos: [],
      numColumnas: 4
    }
    this.loadPhotos()
  }

  loadPhotos () {
    let promises = []
    let fotos = []

    for (let i = 0; i < 18; i++) {
      let p = new Promise((resolve, reject) => {
        let req = new window.XMLHttpRequest()
        let height = 250// Math.floor(Math.random() * (350 - 250) + 250)
        req.onreadystatechange = () => {
          if (req.readyState === 4 && req.status === 200) {
            resolve({ status: 200, url: req.responseURL })
          } else if (req.readyState === 4 && req.status >= 400) {
            reject(new Error(req.responseText))
          }
        }
        if (height % 2 === 0) {
          req.open('GET', `${this.state.host}/200/${250}`, true)
        } else {
          req.open('GET', `${this.state.host}/200`, true)
        }

        req.setRequestHeader('Content-Type', 'application/json')
        req.setRequestHeader('Accept', 'application/json')
        req.send()
      })
      promises.push(p)
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
        this.setState({ loaded: true })
      }, error => {
        console.log(error)
      })
      .catch(err => console.log(err))
  }

  componentWillMount () {
    console.log('componentWillMount')
  }
  componentDidUpdate () {
    // console.log('componentDidUpdate', this)
  }
  componentDidMount () {
    console.log('componentDidMount')
  }
  componentWillReceiveProps (nextProps) {
    // console.log('componentWillReceiveProps', nextProps)
  }

  render () {
    console.log(this)
    let result
    if (this.state.loaded) {
      result = (
        <div className='responsive-grid-row'>
          {this.state.columnasFotos.map((c) => <ColumnaImagen key={c.id} fotos={c.fotos} />)}
        </div>
      )
    } else {
      result = (<SpinLoader />)
    }
    this.state.columnasFotos.forEach(c => {
      console.log('c', c)
    })
    return (
      <div className='w3-container'>
        <h1 className='mainTitle'>Gallery</h1>
        {result}
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
export default connect(mapStateToProps, mapDispatchToProps)(Gallery)
