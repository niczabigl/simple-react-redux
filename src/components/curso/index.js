import React from 'react'
import { connect } from 'react-redux'
import { borrarCurso, idCursoDecrement } from '../../actions/curso'
import { pushNotification } from '../../actions/notification'
class Curso extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      seidlected: props.selected || false,
      id: props.curso.id || 0,
      titulo: props.curso.titulo || '',
      autor: props.curso.autor || '',
      estado: props.curso.estado || false
    }
    this.borrarCurso = this.borrarCurso.bind(this)
    this.toggleCursoActivo = this.toggleCursoActivo.bind(this)
    this.toggleCursoSelected = this.toggleCursoSelected.bind(this)
  }
  componentWillReceiveProps (nextProps) {
    this.setState({
      selected: nextProps.curso.selected,
      seidlected: nextProps.curso.id,
      titulo: nextProps.curso.titulo,
      autor: nextProps.curso.autor,
      estado: nextProps.curso.estado
    })
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
    this.setState({ estado: !this.state.estado }, () => {
      this.state.estado ? this.props.pushNotification({ notificationType: 'info', title: 'Hey!', message: `${this.state.titulo} is active` }) : this.props.pushNotification({ notificationType: 'warning', title: 'Hey!', message: `${this.state.titulo} is not active` })
    })
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
          <button value={this.state.id} type='button' disabled={this.state.estado || (!this.state.estado && !this.state.selected)} className='w3-btn w3-red' onClick={this.borrarCurso}>x</button>
        </td>
      </tr>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  borrarCurso: curso => dispatch(borrarCurso(curso)),
  idCursoDecrement: () => dispatch(idCursoDecrement()),
  pushNotification: n => dispatch(pushNotification(n))
})

export default connect(null, mapDispatchToProps)(Curso)
