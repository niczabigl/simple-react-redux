import React from 'react'
// import response1 from './response_1'
import response2symbols from './response_2_symbols'
import response2iso from './response_1_iso'
import Amount from '../../../lib/currencyLib'

class Currency extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      responsesymbols: response2symbols,
      responseisos: response2iso,
      allisocode: [],
      allisonumbers: [],
      result: '',
      comma: ['Albania', 'Alemania', 'Andorra', 'Argentina', 'Austria', 'Azerbaiyán', 'Bielorrusia', 'Bélgica', 'Bolivia', 'Bosnia-Herzegovina', 'Brasil', 'Bulgaria', 'Camerún', 'Canadá', 'Chile', 'Chipre', 'Colombia', 'Costa Rica', 'Croacia', 'Cuba', 'Dinamarca', 'Ecuador', 'Eslovaquia', 'Eslovenia', 'España', 'Estonia', 'Finlandia', 'Francia', 'Grecia', 'Groenlandia', 'Guinea Ecuatorial', 'Hungría', 'Indonesia', 'Islandia', 'Italia', 'Letonia', 'Lituania', 'Luxemburgo', 'Moldavia', 'Mongolia', 'Noruega', 'Países Bajos', 'Paraguay', 'Perú', 'Polonia', 'Portugal', 'República Checa', 'Rumania', 'Rusia', 'Serbia', 'Sudáfrica', 'Suecia', 'Suiza', 'Turquía', 'Ucrania', 'Uruguay', 'Venezuela', 'Zimbabue'],
      point: ['Australia', 'Botsuana', 'Bolivia', 'Canadá', 'China', 'Corea del Norte', 'Corea del Sur', 'El Salvador', 'Estados', 'Filipinas', 'Guatemala', 'Honduras', 'Hong Kong', 'India', 'Nicaragua', 'Irlanda', 'Israel', 'Japón', 'Malasia', 'México', 'Nigeria', 'Nueva Zelanda', 'Panamá', 'Pakistán', 'Reino Unido', 'República Dominicana', 'Singapur', 'Taiwán', 'Tailandia']
    }
  }

  componentWillMount () {
    let globalCurrencyIsoSymbols = {}
    let symbols = this.state.responsesymbols

    let symbolhtml = document.createElement('html')
    symbolhtml.innerHTML = symbols
    // console.log(symbolhtml.childNodes[1].childNodes[3].childNodes[0].childNodes[6].childNodes[0].children)
    /* RESPONSE 1
    let currencies = symbolhtml.childNodes[2].children[2].children[4].children
    for (let c of currencies) {
      if (c.attributes.getNamedItem('typeof') !== null) {
        console.log(c)
        let name = c.children[0].children[0].innerText
        let htmlcode = c.children[2].children[0].children[4].innerText
        console.log('name', name)
        console.log('htmlcode', htmlcode)
      }
    } */

    // RESPONSE 2
    let currenciessymbol = symbolhtml.childNodes[1].childNodes[3].childNodes[0].childNodes[6].childNodes[0].children
    for (let c of currenciessymbol) {
      if (c.attributes.length === 1) {
        let name = c.children[0].innerText
        let isocode = c.children[1].innerText
        let htmlcode = c.children[2].innerText
        let symbol = c.children[3].innerText
        let isonumber = ''
        let decimals = ''
        let countries = []

        globalCurrencyIsoSymbols[isocode] = { name, isocode, htmlcode, symbol, isonumber, decimals, countries }
      }
    }

    let isos = this.state.responseisos
    let isoshtml = document.createElement('html')
    isoshtml.innerHTML = isos
    // console.log(isoshtml.childNodes[2].childNodes[5].childNodes[9].childNodes[11].childNodes[1].childNodes[19].childNodes[1].children)
    // console.log(isoshtml.childNodes[2].childNodes[5].childNodes[9].childNodes[11].childNodes[19].childNodes[1].children)
    let currenciesiso = isoshtml.childNodes[2].childNodes[5].childNodes[9].childNodes[11].childNodes[1].childNodes[19].childNodes[1].children
    for (let c of currenciesiso) {
      // console.log(c.children[4].children)
      // console.log(c.children[4].children[2] !== undefined ? c.children[4].children[2].innerHTML : c.children[4])
      if (c.children[0].outerText === 'Código') continue
      let isocode = c.children[0].outerText.substring(0, 3)
      let found = false
      for (let i in globalCurrencyIsoSymbols) {
        if (globalCurrencyIsoSymbols[i].isocode === isocode.toString()) {
          found = true
          globalCurrencyIsoSymbols[i].countries = []
          for (let child of c.children[4].children) {
            if (child.hasAttribute('title')) {
              globalCurrencyIsoSymbols[i].countries.push(child.getAttribute('title'))
            }
          }
          globalCurrencyIsoSymbols[i].isonumber = c.children[1].outerText.substring(0, 3)
          globalCurrencyIsoSymbols[i].decimals = c.children[2].outerText
        }
      }
      if (!found) {
        let countries = []
        for (let child of c.children[4].children) {
          if (child.hasAttribute('title')) {
            countries.push(child.getAttribute('title'))
          }
        }
        globalCurrencyIsoSymbols[c.children[0].outerText] = {
          name: c.children[3].children[0] !== undefined ? c.children[3].children[0].innerHTML : c.children[3].innerHTML,
          isocode: c.children[0].outerText,
          htmlcode: '',
          symbol: '',
          isonumber: c.children[1].outerText.substring(0, 3),
          decimals: c.children[2].outerText,
          countries: countries
        }
      }
    }
    // globalCurrencyIsoSymbols = this.merge(globalCurrencyIsoSymbols, newCurrencies)
    for (let i in globalCurrencyIsoSymbols) {
      this.state.comma.forEach(comma => {
        globalCurrencyIsoSymbols[i].countries.forEach(country => {
          if (country.search(comma) !== -1) globalCurrencyIsoSymbols[i].separator = ','
        })
      })
      this.state.point.forEach(point => {
        globalCurrencyIsoSymbols[i].countries.forEach(country => {
          if (country.search(point) !== -1) globalCurrencyIsoSymbols[i].separator = '.'
        })
      })
    }
    console.log(JSON.stringify(globalCurrencyIsoSymbols))
    this.setState({ result: JSON.stringify(globalCurrencyIsoSymbols) })
  }

  merge () {
    let dst = {}
    let src
    let p
    let args = [].splice.call(arguments, 0)

    while (args.length > 0) {
      src = args.splice(0, 1)[0]
      if (toString.call(src) === '[object Object]') {
        for (p in src) {
          if (src.hasOwnProperty(p)) {
            if (toString.call(src[p]) === '[object Object]') {
              dst[p] = this.merge(dst[p] || {}, src[p])
            } else {
              dst[p] = src[p]
            }
          }
        }
      }
    }
    return dst
  }

  render () {
    let u1 = Amount.getFormatedAmount('USD', 1000, true, false, 'L')
    let u2 = Amount.getFormatedAmount('USD', 100, true, false, 'R')
    let u3 = Amount.getFormatedAmount('USD', 10, false, 'L')
    let a1 = Amount.getFormatedAmount('USD', 100, true, false, 'R')
    let a2 = Amount.getFormatedAmount('EUR', 10, true, false, 'L')
    let b1 = Amount.getFormatedAmount('940', 100, true, false, 'R')
    let b2 = Amount.getFormatedAmount(940, 10, false, true, 'L')
    let c1 = Amount.getFormatedAmount('944', 100, false, true, 'R')
    let c2 = Amount.getFormatedAmount(944, 10, true, false, 'L')
    let d1 = Amount.getFormatedAmount('944', 100, false, false, 'H')
    let d2 = Amount.getFormatedAmount(944, '10', true, false, 'L')
    let d3 = Amount.getFormatedAmount('944', '100', undefined)
    let d4 = Amount.getFormatedAmount(undefined, '100', undefined)
    let d5 = Amount.getFormatedAmount(null, '100', undefined)
    let d6 = Amount.getFormatedAmount('944', undefined, undefined)
    let d7 = Amount.getFormatedAmount(944, null, undefined)
    let html = Amount.getHtmlSymbol(944)
    return (
      <div>
        <h1>CURRENCY</h1>
        <p>getFormatedAmount('USD', 1000, true, 'L')-> <strong>{u1}</strong></p>
        <p>getFormatedAmount('USD', 100, true, 'R')-> <strong>{u2}</strong></p>
        <p>getFormatedAmount('USD', 10, false, 'L')-> <strong>{u3}</strong></p>
        <p>getFormatedAmount('USD', 100, true, 'R')-> <strong>{a1}</strong></p>
        <p>getFormatedAmount('EUR', 10, true, 'L') -> <strong>{a2}</strong></p>
        <p>getFormatedAmount('940', 100, true, 'R')-> <strong>{b1}</strong></p>
        <p>getFormatedAmount(940, 10, false, 'L')-> <strong>{b2}</strong></p>
        <p>getFormatedAmount('944', 100, false, 'R')-> <strong>{c1}</strong></p>
        <p>getFormatedAmount(944, 10, true, 'L')-> <strong>{c2}</strong></p>
        <p>getFormatedAmount('944', 100, false, 'H') -> <strong>{d1}</strong></p>
        <p>getFormatedAmount(944, '10', true, 'L') -> <strong>{d2}</strong></p>
        <p>getFormatedAmount('944', '100', undefined) -> <strong>{d3}</strong></p>
        <p>getFormatedAmount(undefined, '100', undefined)-> <strong>{d4}</strong></p>
        <p>getFormatedAmount(null, '100', undefined) -> <strong>{d5}</strong></p>
        <p>getFormatedAmount('944', undefined, undefined) -> <strong>{d6}</strong></p>
        <p>getFormatedAmount(944, null, undefined) -> <strong>{d7}</strong></p>
        <p contenteditable='true'>{html}</p>
        <p id='html' />
      </div>
    )
  }
}

export default Currency
