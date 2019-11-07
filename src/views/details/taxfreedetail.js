import React from 'react'
import { connect } from 'react-redux'
import { pushNotification } from '../../actions/notification'
import TableDetail from '../../components/tabledetail'

class TaxFreeDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      susceptible: props.susceptible || {},
      data: props.data || {}
    }
  }

  componentWillMount () {
    let data = this.state.data
    data.columnshead[0] = { text: 'País', prop: 'Country' }
    this.setState(data)
  }

  render () {
    console.log(this)
    return (
      <div>
        <div className='taxfree-table'>
          <TableDetail
            data={this.state}
            title={`TAXFREE SUSCEPTIBLE`}
            columnshead={this.state.data.columnshead}
            rows={this.state.susceptible.Summary}
            total={this.state.data.total}
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
export default connect(mapStateToProps, mapDispatchToProps)(TaxFreeDetail)
