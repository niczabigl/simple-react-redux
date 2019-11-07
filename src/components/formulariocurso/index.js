import React from 'react'
import { connect } from 'react-redux'
import { crearCurso, idCursoIncrement, editCurso } from '../../actions/curso'

class FormularioCurso extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      curso: {
        id: props.curso.id || -1,
        titulo: props.curso.titulo || '',
        autor: props.curso.autor || '',
        estado: props.curso.estado || false
      },
      isEdit: props.isEdit || false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentWillMount () {
    // console.log('FormularioCurso componentWillMount', this)
  }
  componentDidUpdate () {
    // console.log('FormularioCurso componentDidUpdate', this)
  }
  componentDidMount () {
    // console.log('FormularioCurso componentDidMount')
  }
  componentWillReceiveProps (nextProps) {
    // console.log('FormularioCurso componentWillReceiveProps', nextProps)
    this.setState({
      id: nextProps.id,
      curso: nextProps.curso,
      isEdit: nextProps.isEdit })
  }
  shouldComponentUpdate (nextProps, nextState) {
    // console.log('FormularioCurso shouldComponentUpdate', nextProps, nextState)
    if (nextProps !== nextState) return true
    return false
  }

  handleSubmit (event) {
    event.preventDefault()
    const c = Object.assign({}, this.state.curso)
    this.setState({ curso: c })
    if (this.validateForm()) {
      if (this.state.isEdit) {
        // console.log('editarCurso')
        c.id = this.state.curso.id
        this.props.editCurso(c)
        // this.props.pushNotification({ title: '', message: 'Curso Modificado', notificationType: 'info', type: 'blue' })
      } else {
        c.id = this.state.curso.id
        this.props.crearCurso(c)
        this.props.idCursoIncrement()
        // this.props.pushNotification({ title: '', message: 'Curso creado', notificationType: 'success', type: 'green' })
      }
    } else {
      // this.props.pushNotification({ title: '', message: 'Error', notificationType: 'error', type: 'red' })
    }
  }

  handleChange (event) {
    const c = Object.assign({}, this.state.curso)
    switch (event.target.name) {
      case 'titulo':
        c.titulo = event.target.value
        return this.setState({ curso: c })
      case 'autor':
        c.autor = event.target.value
        return this.setState({ curso: c })
      case 'estado':
        c.estado = event.target.checked
        return this.setState({ curso: c })
      default: break
    }
  }
  validateForm () {
    if (this.state.curso.titulo === '' || this.state.curso.autor === '') return false
    if (this.props.cursos.includes(this.state.curso)) return false
    return true
  }

  render () {
    return (
      <div className='w3-container' >
        <h1>Formulario</h1>
        <form className='w3-container' onSubmit={this.handleSubmit}>
          <label htmlFor='fname'>Título</label>
          <input className='w3-input w3-border w3-light-gray' type='text' id='ftitulo' name='titulo' value={this.state.curso.titulo} onChange={this.handleChange} />

          <label htmlFor='lname'>Autor</label>
          <input className='w3-input w3-border w3-light-gray' type='text' id='lautor' name='autor' value={this.state.curso.autor} onChange={this.handleChange} />

          <p htmlFor='lestado'>Estado <input className='w3-check' type='checkbox' id='lestado' name='estado' onChange={this.handleChange} value={this.state.curso.estado} /></p>
          {JSON.stringify(this.state.curso)}
          <button className={this.state.isEdit ? 'w3-right w3-button w3-hover-grey w3-yellow' : 'w3-right w3-button w3-hover-grey w3-green'} type='submit' >{this.state.isEdit ? 'Editar Curso' : 'Crear Curso'}</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    id: state.cursos.list.length + 1,
    cursos: state.cursos.list
  })
}
const mapDispatchToProps = dispatch => {
  return ({
    crearCurso: curso => dispatch(crearCurso(curso)),
    editCurso: curso => dispatch(editCurso(curso)),
    idCursoIncrement: () => dispatch(idCursoIncrement())
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(FormularioCurso)
