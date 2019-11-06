import React from 'react'
import { connect } from 'react-redux'
import { borrarCurso, idCursoDecrement } from '../../actions/curso'

class Curso extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: props.selected || false,
      id: props.curso.id || 0,
      titulo: props.curso.titulo || '',
      autor: props.curso.autor || '',
      estado: props.curso.estado || false
    }
    this.borrarCurso = this.borrarCurso.bind(this)
    this.toggleCursoActivo = this.toggleCursoActivo.bind(this)
    this.toggleCursoSelected = this.toggleCursoSelected.bind(this)
  }

  toggleCursoSelected (e) {
    e.stopPropagation()
    this.setState({ selected: !this.state.selected }, () => {
      this.props.handleCursoSelected(this.state)
    })
  }
  borrarCurso (e) {
    e.stopPropagation()
    if (this.state.selected) this.props.borrarCurso(this.state)
  }
  toggleCursoActivo (e) {
    e.stopPropagation()
    this.setState({ estado: !this.state.estado })
  }

  render () {
    return (
      <tr onClick={this.toggleCursoSelected} className={this.state.selected ? 'curso-selected' : ''}>
        <td>{this.state.id}</td>
        <td>{this.state.titulo}</td>
        <td>
          <button value={this.state.id} type='button' className={this.state.estado ? 'w3-btn w3-green' : 'w3-btn w3-red'} onClick={this.toggleCursoActivo}>{this.state.estado ? 'activo' : 'inactivo'}</button>
        </td>
        <td>{this.state.autor}</td>
        <td>
          <button value={this.state.id} type='button' disabled={this.state.estado === true} className='w3-btn w3-red' onClick={this.borrarCurso}>x</button>
        </td>
      </tr>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  borrarCurso: curso => dispatch(borrarCurso(curso)),
  idCursoDecrement: () => dispatch(idCursoDecrement())
})

export default connect(null, mapDispatchToProps)(Curso)
