import React from 'react'
import { connect } from 'react-redux'

class BlackBox extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: props.selected || false,
      report: props.report || {},
      type: props.type || '',
      title: props.title || '',
      columnshead: props.columnshead || [],
      rows: props.rows || [],
      total: props.total || { totaltext: '', Quantity: '', Amount: '' }
    }
  }
  componentWillReceiveProps (props) {
    this.setState({
      selected: props.selected,
      report: props.report,
      type: props.type,
      title: props.title,
      columnshead: props.columnshead,
      rows: props.rows,
      total: props.total
    })
  }

  render () {
    let quantity
    let amount
    let thead = this.state.columnshead.map((th, i) => {
      let text = th.text || th
      return (<th key={i}>{text}</th>)
    })
    let tbody = this.state.rows.map(tr => {
      let aux = []
      if (this.state.type !== 'Transactions') {
        aux = this.state.columnshead.map((element, i) => {
          let td = tr[element.prop] !== undefined ? tr[element.prop] : tr.type
          return (<td key={i}>{td}</td>)
        })
        if (this.state.type === 'TaxFree') {
          quantity = (<td>{this.state.total.Quantity}</td>)
          amount = (<td>{this.state.total.Amount}</td>)
        } else {
          quantity = (<td />)
          amount = (<td>{this.state.total.Ratio}</td>)
        }

        return (
          <tr key={tr.type}>
            {aux}
          </tr>)
      } else {
        aux = this.state.columnshead.map((element, i) => {
          let td = tr[tr.type][element.prop] !== undefined ? tr[tr.type][element.prop] : tr.type
          td = typeof td === 'string' ? td.includes('Preauthorization') ? td.replace('Preauthorization', 'Pre.') : td : td
          td = typeof td === 'string' ? td.includes('Confirmation') ? td.replace('Confirmation', 'Confirm') : td : td
          return (<td key={i}>{td}</td>)
        })
        quantity = (<td>{this.state.total.Quantity}</td>)
        amount = (<td>{this.state.total.Amount}</td>)
        return (
          <tr key={tr.type}>
            {aux}
          </tr>)
      }
    })
    return (
      <div className={`${this.state.type} totals-section ${this.state.selected ? 'selectedblock' : ''}`}>
        <strong>{this.state.title}</strong>
        <table className='table-header'>
          <thead>
            <tr>
              {thead}
            </tr>
          </thead>
          <tbody>
            {tbody}
          </tbody>
        </table>
        <table className='table-footer'>
          <tbody>
            <tr>
              <td>{this.state.total.totaltext}</td>
              {quantity}
              {amount}
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({

})

export default connect(null, mapDispatchToProps)(BlackBox)
