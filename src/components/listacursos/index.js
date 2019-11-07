import React from 'react'
import { connect } from 'react-redux'
import Curso from '../curso'

class ListaCursos extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      filter: '',
      soloActivos: false,
      soloInactivos: false,
      cursos: props.cursos || [],
      cursoSelected: {}
    }
    this.handleCursoSelected = this.handleCursoSelected.bind(this)
  }
  handleCursoSelected (curso) {
    // console.log('handleCursoSelected', curso)
    let cursos = this.state.cursos.map((c) => {
      c.selected = false
      return c
    })
    cursos[curso.id - 1] = curso
    this.setState({
      cursos
    })
    if (curso.selected) {
      this.props.transferCursoToEdit(curso)
    } else {
      this.props.transferCursoToEdit(null)
    }
  }
  displayCursos (cursos) {
    return cursos.map((curso, i) => {
      // console.log('curso', curso)
      return <Curso
        key={curso.id}
        curso={curso}
        selected={curso.selected || false}
        handleCursoSelected={this.handleCursoSelected}
      />
    })
  }
  setFilter (event) {
    this.setState({ filter: event.target.value })
  }
  setOnlyActives (event) {
    this.setState({ soloActivos: event.target.checked })
  }
  setOnlyInactives (event) {
    this.setState({ soloInactivos: event.target.checked })
  }
  componentWillMount () {
    // // console.log('componentWillMount')
  }
  componentDidUpdate () {
    // // console.log('ListaCursos componentDidUpdate', this)
  }
  componentWillReceiveProps (nextProps) {
    // console.log('ListaCursos componentWillReceiveProps', nextProps)
    this.setState({
      cursos: nextProps.cursos
    })
  }
  render () {
    let cursos = this.state.cursos.filter(
      (curso) => {
        if (!this.state.soloActivos && !this.state.soloInactivos) {
          return curso.titulo.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1
        }
        if (!this.state.soloActivos && this.state.soloInactivos) {
          return curso.titulo.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1 && !curso.estado
        }
        if (this.state.soloActivos && !this.state.soloInactivos) {
          return curso.titulo.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1 && curso.estado
        } else {
          return curso
        }
      })
    return (
      <div className='w3-half'>
        <h1>Lista de Cursos</h1>
        <input className='w3-input w3-border w3-light-gray' onChange={this.setFilter.bind(this)} value={this.state.filter} type='text' placeholder='filtrar Cursos' />
        <div> solo cursos activos <input className='w3-check' onChange={this.setOnlyActives.bind(this)} checked={this.state.soloActivos} type='checkbox' /></div>
        <div> solo cursos inactivos <input className='w3-check' onChange={this.setOnlyInactives.bind(this)} checked={this.state.soloInactivos} type='checkbox' /></div>
        <table className='w3-table w3-striped w3-bordered w3-hoverable'>
          <thead>
            <tr>
              <th>id</th>
              <th>titulo</th>
              <th>estado</th>
              <th>autor</th>
            </tr>
          </thead>
          <tbody>
            {
              this.displayCursos(cursos)
            }
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = ({ cursos }) => ({
  cursos: cursos.list
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(ListaCursos)
