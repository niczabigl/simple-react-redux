import React from 'react'
import { connect } from 'react-redux'
import ListaCursos from '../../components/listacursos'
import FormularioCurso from '../../components/formulariocurso'
import { pushNotification } from '../../actions/notification'
import constantes from '../../constantes'

class About extends React.Component {
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
      this.setState({ curso: curso, isEdit: true })
    } else {
      this.setState({ curso: constantes.INITIAL_STATE_CURSO, isEdit: false })
    }
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
export default connect(mapStateToProps, mapDispatchToProps)(About)
