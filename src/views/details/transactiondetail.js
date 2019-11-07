import React from 'react'
import { connect } from 'react-redux'
import { pushNotification } from '../../actions/notification'

class Transaction extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      Type: props.Type || '',
      Amount: props.Amount || '',
      CardIssuer: props.CardIssuer || '',
      CardNumber: props.CardNumber || '',
      Id: props.Id || '',
      OriginalTransactionId: props.OriginalTransactionId || '',
      OriginalTransactionDate: props.OriginalTransactionDate || '',
      Time: props.Time || '',
      Date: props.Date || ''
    }
  }

  render () {
    const op = this.state.Id !== '' ? (<span>Op. {this.state.Id}</span>) : (<span />)
    const oporiginal = this.state.OriginalTransactionId !== '' ? (<span>Op. original: {this.state.OriginalTransactionId} - {this.state.OriginalTransactionDate}</span>) : (<span />)
    return (
      <div className='op'>
        <div className='type-icon'>
          <img src={`../js/assets/images/${this.state.Type}.png`} />
        </div>
        <div className='op-data'>
          <strong>{this.state.Amount}</strong>
          <span>{this.state.CardIssuer} {this.state.CardNumber}</span>
          {op}
          {oporiginal}
        </div>
        <div className='op-date'>
          <strong>{this.state.Time}</strong>
          <span>{this.state.Date}</span>
        </div>
      </div>
    )
  }
}

class TransactionDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      transactions: props.transactions || []
    }
  }

  componentWillMount () {
  }

  render () {
    let key = 0
    return (
      <div className='transactions'>
        {this.state.transactions.map((t) => {
          key++
          return (<Transaction
            key={key}
            Type={t.Type}
            Amount={t.Amount}
            CardIssuer={t.CardIssuer}
            CardNumber={t.CardNumber}
            Id={t.Id}
            OriginalTransactionId={t.OriginalTransactionId}
            OriginalTransactionDate={t.OriginalTransactionDate}
            Time={t.Time}
            Date={t.Date} />)
        })}
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
export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetail)
