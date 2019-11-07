import React from 'react'
import { connect } from 'react-redux'
import { pushNotification } from '../../actions/notification'
import TransactionDetail from './transactiondetail'
import MultiCurrencyDetail from './multicurrencydetail'
import TaxFreeDetail from './taxfreedetail'
import SplitPaymentDetail from './splitpaymentdetail'

import Header from '../../components/header'
import Body from '../../components/body'
import Footer from '../../components/footer'
import { goBack, print, goExit } from '../../utils/index.js'
class Details extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      type: props.match.params.type || '',
      data: {},
      firstTransaction: '',
      lastTransaction: '',
      firstDate: '',
      lastDate: '',
      date: '',
      session: 0,
      footeroptions: {
        back: { id: 0, title: 'ATRÁS', icon: 'back-green-arrow.png', action: goBack.bind(this), show: true },
        print: { id: 1, title: 'IMPRIMIR', icon: 'print.png', action: print.bind(this), show: true },
        close: { id: 2, title: 'CERRAR', icon: 'close-red-cross.png', action: goExit.bind(this), show: true }
      }
    }
  }
  formatTitle () {
    switch (this.state.type) {
      case 'transactionsreport':
        return 'DETALLE TRANSACCIONES'
      case 'multicurrencyreport':
        return 'DETALLE MULTIDIVISA'
      case 'splitpaymentreport':
        return 'DETALLE PAGO FRACCIONADO'
      case 'taxfreereport':
        return 'DETALLE TAX FREE'
      case 'cashoutreport':
        return 'DETALLE CASHOUT'
    }
  }
  getDetailComponent () {
    switch (this.state.type) {
      case 'transactionsreport':
        console.log('transactionsreport', this.state.data)
        return (<TransactionDetail transactions={this.state.data.transactions} />)
      case 'multicurrencyreport':
        console.log('multicurrencyreport', this.state.data)
        return (<MultiCurrencyDetail data={this.state.data} susceptible={this.state.data.susceptible} converted={this.state.data.converted} />)
      case 'taxfreereport':
        console.log('taxfreereport', this.state.data)
        return (<TaxFreeDetail data={this.state.data} susceptible={this.state.data.susceptible} />)
      case 'splitpaymentreport':
        console.log('splitpaymentreport', this.state.data)
        return (<SplitPaymentDetail data={this.state.data} susceptible={this.state.data.susceptible} converted={this.state.data.converted} />)
      case 'cashoutreport':
        console.log('cashoutreport', this.state.data)
        return (<MultiCurrencyDetail data={this.state.data} susceptible={this.state.data.susceptible} converted={this.state.data.converted} />)
      default:
        return (<div />)
    }
  }
  componentWillMount () {
    this.setState({
      data: this.props.detail,
      firstTransaction: this.props.report.FirstTransaction,
      lastDate: this.props.report.LastDate,
      lastTransaction: this.props.report.LastTransaction,
      firstDate: this.props.report.FirstDate,
      date: this.props.report.Date,
      session: this.props.report.Session.Number
    })
  }

  render () {
    const component = this.getDetailComponent()
    return (
      <div>
        <Header title={this.formatTitle()} />
        <Body>
          <div className={`${this.state.type} Details`}>
            <div className='header-details'>
              <div className='datareport ranges'>
                <div>
                  <strong>Operaciones</strong>
                  <strong>{this.state.firsTransaction} - {this.state.lastTransaction}</strong>
                </div>
                <div>
                  <strong>Fechas: </strong>
                  <strong>{this.state.firstDate} - {this.state.lastDate}</strong>
                </div>
                <div>
                  <strong>Session: </strong>
                  <strong>{this.state.session}</strong>
                </div>
              </div>
            </div>
            <div className='body-details'>
              {component}
            </div>
          </div>
        </Body>
        <Footer footeroptions={{ ...this.state.footeroptions }} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return ({
    detail: state.totals[`${ownProps.match.params.type}`],
    report: state.totals.datareport
  })
}
const mapDispatchToProps = dispatch => {
  return ({
    pushNotification: n => dispatch(pushNotification(n))
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(Details)
