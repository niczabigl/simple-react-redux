import React from 'react'
import { connect } from 'react-redux'
import ListaCursos from '../../components/listacursos'
import FormularioCurso from '../../components/formulariocurso'
import { pushNotification } from '../../actions/notification'
import constants from '../../constants'

class Courses extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      cursos: props.cursos || [],
      curso: props.curso || {},
      isEdit: props.isEdit || false
    }
    this.transferCursoToEdit = this.transferCursoToEdit.bind(this)
  }
  transferCursoToEdit (curso) {
    if (curso != null) {
      console.log(curso)
      this.setState({ curso: curso, isEdit: true }, () => {
        this.props.pushNotification(`${this.state.curso.titulo} ready to edit`)
      })
    } else {
      this.setState({ curso: constants.curso.INITIAL_STATE_CURSO, isEdit: false })
    }
  }
  componentWillReceiveProps (nextProps) {
    this.setState({
      cursos: nextProps.cursos
    })
  }
  render () {
    return (
      <div className='w3-container'>
        <div className='w3-half'>
          <FormularioCurso
            curso={this.state.curso}
            isEdit={this.state.isEdit}
          />
        </div>
        <div>
          <ListaCursos transferCursoToEdit={this.transferCursoToEdit} />
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return ({
    id: state.cursos.autogenid,
    cursos: state.cursos.list
  })
}
const mapDispatchToProps = dispatch => {
  return ({
    pushNotification: n => dispatch(pushNotification(n))
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(Courses)
