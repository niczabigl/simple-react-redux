import React from 'react'
import Main from './views/main'
import configureStore from './store/configStore.js'
import { Provider } from 'react-redux'

// fake store
const defaultState = {
  cursos: {
    list: [
      { id: 1, titulo: 'React', autor: 'Nico', estado: false },
      { id: 2, titulo: 'Angular', autor: 'Nicolas', estado: false },
      { id: 3, titulo: 'Vue', autor: 'Javi', estado: true },
      { id: 4, titulo: 'JavaScript', autor: 'Salocin', estado: false },
      { id: 5, titulo: 'AngularJs', autor: 'Nik', estado: true },
      { id: 6, titulo: 'VueJs', autor: 'Nicola', estado: false }
    ],
    autogenid: 7,
    selected: {}
  },
  totals: {
  },
  notification: {
    show: false,
    n: {}
  }
}

const store = configureStore(defaultState)

class Root extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    )
  }
}

export default Root
