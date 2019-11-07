import React from 'react'
import { connect } from 'react-redux'

class TableDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: props.data || {},
      title: props.title || '',
      columnshead: props.columnshead || [],
      rows: props.rows || [],
      total: props.total || { totaltext: '', Ratio: '', Quantity: '', Amount: '' }
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      data: nextProps.data,
      title: nextProps.title,
      columnshead: nextProps.columnshead,
      rows: nextProps.rows,
      total: nextProps.total
    })
  }

  createTableHeader () {
    let ths = this.state.columnshead.map((head, i) => {
      let text = head.text || head
      return (<th key={i}>{text}</th>)
    })
    const trhead = (<tr>{ths}</tr>)

    const thead = (<thead>{trhead}</thead>)

    let trbody = this.state.rows.map((row, i) => {
      let tds = this.state.columnshead.map((td, i) => {
        return (<td key={i}>{row[td.prop] !== undefined ? row[td.prop] : td }</td>)
      })
      return (<tr key={i}>{tds}</tr>)
    })
    const tbody = (<tbody>{trbody}</tbody>)
    const table = (<table className='table-header'>{thead}{tbody}</table>)
    return table
  }

  createTableFooter () {
    let tbody = (<tbody><tr><td>{this.state.total.totaltext}</td><td>{this.state.total.Quantity}</td><td>{this.state.total.Amount}</td></tr></tbody>)
    const table = (<table className='table-footer'>{tbody}</table>)
    return table
  }

  render () {
    console.log(this)
    const tabledetailheader = this.createTableHeader()
    const tabledetailfooter = this.createTableFooter()
    return (
      <div className='table'><strong>{this.state.title}</strong>{tabledetailheader}{tabledetailfooter}</div>
    )
  }
}

const mapDispatchToProps = dispatch => ({

})

export default connect(null, mapDispatchToProps)(TableDetail)
