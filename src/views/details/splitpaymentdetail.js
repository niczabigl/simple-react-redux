import React from 'react'
import { connect } from 'react-redux'
import { pushNotification } from '../../actions/notification'
import TableDetail from '../../components/tabledetail'

class SplitPaymentDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      susceptible: props.susceptible || {},
      converted: props.converted || {},
      data: props.data || {}
    }
  }

  componentWillMount () {
    let state = this.state
    state.susceptible.columnshead = JSON.parse(JSON.stringify(this.state.data.columnshead))
    state.susceptible.columnshead[0] = ''
    state.converted.columnshead = JSON.parse(JSON.stringify(this.state.data.columnshead))
    state.converted.columnshead[0] = { text: 'Nº Meses', prop: 'Months' }
    this.setState(state)
  }

  render () {
    console.log(this)
    return (
      <div>
        <div className='splitpayment-table'>
          <TableDetail
            data={this.state}
            title={`PAGO FRACCIONADO SUSCEPTIBLE`}
            columnshead={this.state.susceptible.columnshead}
            rows={this.state.susceptible.Summary}
            total={{ totaltext: 'TOTAL', Quantity: this.state.susceptible.Quantity, Amount: this.state.susceptible.Amount }}
          />
        </div>
        <div className='splitpayment-table'>
          <TableDetail
            data={this.state}
            title={`PAGO FRACCIONADO CONVERTIDA`}
            columnshead={this.state.converted.columnshead}
            rows={this.state.converted.Summary}
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
export default connect(mapStateToProps, mapDispatchToProps)(SplitPaymentDetail)
