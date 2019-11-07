import React from 'react'
import BlackBox from '../../components/blackbox'
import Header from '../../components/header'
import Body from '../../components/body'
import Footer from '../../components/footer'
import { connect } from 'react-redux'
import { pushNotification } from '../../actions/notification'
import { setupTotals } from '../../actions/totals'
import { goBack, print, goExit } from '../../utils/index'
import mockuptotals from './newtotal.json'

class Totals extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      host: 'https://192.168.0.106:8080/api/raw',
      requestdata: { 'TR-REQ': { 'VersionInfo': { 'Version': '02.00', 'Release': '0.0' }, 'TerminalTransID': { 'CountryCode': 724, 'MerchantID': '329811087', 'TerminalID': '00000001', 'TimeStamp': '180924142827', 'TransNumber': 296 }, 'POSData': { 'TerminalID': { 'ManufacturerCode': '01', 'FamilyCode': 'MOVE', 'ModelCode': '5000', 'SerialNumber': '161277313051008501065157' }, 'SoftwareID': { 'AppName': 'ABCDEFGHI', 'AppVersion': '1.00.00', 'AppRelease': '00.00', 'AppDate': '2016-02-01' }, 'ParamsVersion': {}, 'Functionalities': {}, 'TerminalConfiguration': { 'TerminalLanguage': 'spa', 'TerminalTimeZone': 'CEST', 'SignatureIndicator': 4, 'OffLineTransIndicator': 12 } }, 'TransactionData': { 'TransactionClass': '06', 'TransactionID': '00' } } },
      datareport: {},
      sessionreport: {},
      transactionsreport: {},
      multicurrencyreport: {},
      taxfreereport: {},
      splitpaymentreport: {},
      typestatusreport: {},
      containerselected: '',
      boxes: ['transactionsreport', 'multicurrencyreport', 'taxfreereport', 'splitpaymentreport', 'typestatusreport'],
      footeroptions: {
        back: { id: 0, title: 'ATRÁS', icon: 'back-green-arrow.png', action: goBack.bind(this), show: true },
        print: { id: 1, title: 'IMPRIMIR', icon: 'print.png', action: print.bind(this), show: true },
        close: { id: 2, title: 'CERRAR', icon: 'close-red-cross.png', action: goExit.bind(this), show: true },
        detail: { id: 3, title: 'DETALLES', icon: 'detail.png', action: () => {}, isLink: true, link: { props: {}, url: {} } }
      }
    }
    this.showDetails = this.showDetails.bind(this)
    this.setupTotals = this.setupTotals.bind(this)
  }
  componentWillMount () {
    let p = new Promise((resolve, reject) => {
      let req = new window.XMLHttpRequest()
      req.onreadystatechange = () => {
        if (req.readyState === 4 && req.status === 200) {
          resolve(JSON.parse(req.responseText))
        } else if (req.readyState === 4 && req.status >= 400) {
          reject(new Error(req.responseText))
        } else if (req.status === 0) { // lanzo el mockup
          resolve(mockuptotals)
        }
      }
      req.open('POST', `${this.state.host}`, true)
      req.timeout = 5000
      req.ontimeout = () => {
        resolve(mockuptotals)
      }
      req.setRequestHeader('Content-Type', 'application/json')
      req.setRequestHeader('Accept', 'application/json')
      req.send(JSON.stringify(this.state.requestdata))
    })
    p.then((result) => {
      result = result['TR-RESP']
      if (result.ProcessingResult.ProcessingStatus === 0 && result.Operation.ResponseCode === '600') {
        let t = result.Operation.Payload.Report
        if (t.TypeStatusReport) {
          t.typestatusreport = t.TypeStatusReport
        }
        if (t.Transactions) {
          t.TypeStatusReport.Types.forEach(type => {
            type.type = Object.keys(type)[0]
          })
          t.transactionsreport = {
            selected: false,
            title: 'OPERACIONES',
            total: { totaltext: 'TOTAL', Amount: t.TypeStatusReport.Amount, Quantity: t.TypeStatusReport.Quantity },
            rows: t.TypeStatusReport.Types,
            columnshead: ['', { text: 'Cantidad', prop: 'Quantity' }, { text: 'Importe', prop: 'Amount' }],
            transactions: t.Transactions
          }
        }
        if (t.MultiCurrencyReport) {
          t.MultiCurrencyReport.Susceptible.type = 'Susceptible'
          t.MultiCurrencyReport.Converted.type = 'Converted'
          t.multicurrencyreport = {
            selected: false,
            title: 'MULTIDIVISA',
            total: { totaltext: 'RATIO CONV.', Ratio: t.MultiCurrencyReport.Ratio },
            rows: [t.MultiCurrencyReport.Converted, t.MultiCurrencyReport.Susceptible],
            columnshead: ['', { text: 'Cantidad', prop: 'Quantity' }, { text: 'Importe', prop: 'Amount' }],
            susceptible: t.MultiCurrencyReport.Susceptible,
            converted: t.MultiCurrencyReport.Converted
          }
        }
        if (t.TaxFreeReport) {
          t.TaxFreeReport.Susceptible.type = 'Susceptible'
          t.taxfreereport = {
            selected: false,
            title: 'TAX FREE',
            total: { totaltext: 'TOTAL', Amount: t.TaxFreeReport.Susceptible.Amount, Quantity: t.TaxFreeReport.Susceptible.Quantity },
            rows: [t.TaxFreeReport.Susceptible],
            columnshead: ['', { text: 'Cantidad', prop: 'Quantity' }, { text: 'Importe', prop: 'Amount' }],
            susceptible: t.TaxFreeReport.Susceptible
          }
        }
        if (t.SplitPaymentReport) {
          t.SplitPaymentReport.Susceptible.type = 'Susceptible'
          t.SplitPaymentReport.Converted.type = 'Converted'
          t.splitpaymentreport = {
            selected: false,
            title: 'PAGO FRACCIONADO',
            total: { totaltext: 'RATIO CONV.', Ratio: t.SplitPaymentReport.Ratio },
            rows: [t.SplitPaymentReport.Susceptible, t.SplitPaymentReport.Converted],
            columnshead: ['', { text: 'Cantidad', prop: 'Quantity' }, { text: 'Importe', prop: 'Amount' }],
            susceptible: t.SplitPaymentReport.Susceptible,
            converted: t.SplitPaymentReport.Converted
          }
        }
        this.setState({
          datareport: result.Operation.Payload.Report,
          sessionreport: {
            id: result.Processor.Session.Number,
            date: result.Processor.Session.Date
          },
          transactionsreport: t.transactionsreport,
          multicurrencyreport: t.multicurrencyreport,
          taxfreereport: t.taxfreereport,
          splitpaymentreport: t.splitpaymentreport,
          typestatusreport: result.Operation.Payload.Report.TypeStatusReport
        }, () => {
          this.setupTotals(this.state)
        })
      }
    })
      .catch(e => console.log(e))
  }
  setupTotals (t) {
    this.props.setupTotals(t)
  }
  showDetails () {
    let fo = this.state.footeroptions
    let url = `/details/${this.state.containerselected}`
    let props = this.state[this.state.containerselected]
    fo.detail.link.url = url
    fo.detail.link.props = props
    this.setState({ ...this.setState.footeroptions })
  }
  unselectBoxes () {
    this.state.boxes.forEach(b => {
      let box = this.state[b]
      box.selected = false
      this.setState(box)
    })
  }
  toggleFooter (bool) {
    const fo = this.state.footeroptions
    if (bool) {
      fo.back.show = true
      fo.print.show = true
      fo.close.show = true
      fo.detail.show = false
    } else {
      fo.back.show = false
      fo.print.show = false
      fo.close.show = false
      fo.detail.show = true
      this.showDetails()
    }
    this.setState({ footeroptions: fo })
  }
  selectBox (b) {
    let box = this.state[b]
    if (box.selected) {
      this.unselectBoxes()
      box.selected = false
    } else {
      this.unselectBoxes()
      box.selected = true
    }
    this.setState(box, () => {
      if (box.selected) {
        this.setState({ containerselected: b }, () => {
          this.toggleFooter(false)
        })
      } else {
        this.setState({ containerselected: '' }, () => {
          this.toggleFooter(true)
        })
      }
    })
  }
  render () {
    return (
      <div>
        <Header title={'TOTALES'} />
        <Body>
          <div className='checkTotals'>
            <div className='datareport ranges'>
              <div>
                <strong>Operaciones</strong>
                <strong>{this.state.datareport.FirsTransaction} - {this.state.datareport.LastTransaction}</strong>
              </div>
              <div>
                <strong>Fechas: </strong>
                <strong>{this.state.datareport.FirstDate} - {this.state.datareport.LastDate}</strong>
              </div>
              <div>
                <strong>Session: </strong>
                <strong>{this.state.sessionreport.id}</strong>
              </div>
            </div>
            <div onClick={() => this.selectBox(`transactionsreport`)} className={`Transactions totals-container blackbox`}>
              <BlackBox
                selected={this.state.transactionsreport.selected}
                type={'Transactions'}
                report={this.state.transactionsreport}
                title={this.state.transactionsreport.title}
                columnshead={this.state.transactionsreport.columnshead}
                rows={this.state.transactionsreport.rows}
                total={this.state.transactionsreport.total}
              />
            </div>
            <div onClick={() => this.selectBox(`splitpaymentreport`)} className={`SplitPayment totals-container blackbox`}>
              <BlackBox
                selected={this.state.splitpaymentreport.selected}
                type={'SplitPayment'}
                report={this.state.splitpaymentreport}
                title={this.state.splitpaymentreport.title}
                columnshead={this.state.splitpaymentreport.columnshead}
                rows={this.state.splitpaymentreport.rows}
                total={this.state.splitpaymentreport.total}
              />
            </div>
            <div onClick={() => this.selectBox(`taxfreereport`)} className={`TaxFree totals-container blackbox`}>
              <BlackBox
                selected={this.state.taxfreereport.selected}
                type={'TaxFree'}
                report={this.state.taxfreereport}
                title={this.state.taxfreereport.title}
                columnshead={this.state.taxfreereport.columnshead}
                rows={this.state.taxfreereport.rows}
                total={this.state.taxfreereport.total}
              />
            </div>
            <div onClick={() => this.selectBox(`multicurrencyreport`)} className={`MultiCurrency totals-container blackbox`}>
              <BlackBox
                selected={this.state.multicurrencyreport.selected}
                type={'MultiCurrency'}
                report={this.state.multicurrencyreport}
                title={this.state.multicurrencyreport.title}
                columnshead={this.state.multicurrencyreport.columnshead}
                rows={this.state.multicurrencyreport.rows}
                total={this.state.multicurrencyreport.total}
              />
            </div>
          </div>
        </Body>
        <Footer footeroptions={{ ...this.state.footeroptions }} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    id: state.cursos.autogenid,
    totals: state.totals
  })
}
const mapDispatchToProps = dispatch => {
  return ({
    pushNotification: n => dispatch(pushNotification(n)),
    setupTotals: t => dispatch(setupTotals(t))
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(Totals)
