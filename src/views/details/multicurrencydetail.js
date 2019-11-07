import React from 'react'
import { connect } from 'react-redux'
import { pushNotification } from '../../actions/notification'
import TableDetail from '../../components/tabledetail'

class MultiCurrencyDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      susceptible: props.susceptible || {},
      converted: props.converted || {},
      data: props.data || {}
    }
  }

  componentWillMount () {
  }

  render () {
    this.state.data.columnshead[0] = { text: 'Divisa', prop: 'Currency' }
    return (
      <div>
        <div className='multicurrency-table'>
          <TableDetail
            data={this.state}
            title={`MULTIDIVISA CONVERTIDA`}
            columnshead={this.state.data.columnshead}
            rows={this.state.converted.Summary}
            total={{ totaltext: 'TOTAL', Quantity: this.state.converted.Quantity, Amount: this.state.converted.Amount }}
          />
        </div>
        <div className='multicurrency-table'>
          <TableDetail
            data={this.state}
            title={`MULTIDIVISA SUSCEPTIBLE`}
            columnshead={this.state.data.columnshead}
            rows={this.state.susceptible.Summary}
            total={{ totaltext: 'TOTAL', Quantity: this.state.susceptible.Quantity, Amount: this.state.susceptible.Amount }}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return ({

  })
}
const mapDispatchToProps = dispatch => {
  return ({
    pushNotification: n => dispatch(pushNotification(n))
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(MultiCurrencyDetail)
