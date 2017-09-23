const got = require('got')
const money = require('money')

const FIXER_URL = 'https://api.fixer.io/latest'
const BLOCKCHAIN_URL = 'https://blockchain.info/ticker'
const ETHERCHAIN_URL = 'https://etherchain.org/api/statistics/price'

const CURRENCY_BITCOIN = 'BTC'
const CURRENCY_ETHEREUM = 'ETH'

let isAnyBTC = (from, to) => [from, to].includes(CURRENCY_BITCOIN)
let isAnyETH = (from, to) => [from, to].includes(CURRENCY_ETHEREUM)

const httpOpts = {
  json: true
}

module.exports = (opts) => {
  let {
    amount = 1,
    from = 'USD',
    to = CURRENCY_BITCOIN
  } = opts

  let base = from
  let promises = []

  const anyBTC = isAnyBTC(from, to)
  const anyETH = isAnyETH(from, to)

  if (anyBTC) {
    base = (from === CURRENCY_BITCOIN) ? to : from
    promises.push(got(BLOCKCHAIN_URL, httpOpts))
  }

  if (anyETH) {
    // always default base to USD when dealing with Etherum
    base = 'USD'
    promises.push(got(ETHERCHAIN_URL, httpOpts))
  }

  promises.unshift(got(`${FIXER_URL}?base=${base}`, httpOpts))

  return Promise.all(promises).then(result => {
    let [fixer] = result

    money.base = fixer.body.base
    money.rates = fixer.body.rates

    let conversionOpts = {
      from,
      to
    }

    if (anyBTC) {
      let blockchain = result.find(r => r.body.hasOwnProperty(base))

      Object.assign(money.rates, {
        BTC: blockchain.body[base].last
      })
    }

    if (anyETH) {
      let etherchain = result.find(r => r.body.hasOwnProperty('data') && r.body.status === 1)
      let {usd} = etherchain.body.data[etherchain.body.data.length - 1]

      let ethTo = to === CURRENCY_ETHEREUM ? from : to

      let etherumConversionOpts = {
        from: 'USD', // always convert from USD
        to: ethTo
      }

      let eth = money.convert(usd, etherumConversionOpts)

      // set proper base
      money.base = ethTo

      Object.assign(money.rates, {
        ETH: eth
      })
    }

    if (anyBTC || anyETH) {
      // swap the conversion opts
      Object.assign(conversionOpts, {
        from: to,
        to: from
      })
    }

    return money.convert(amount, conversionOpts)
  })
}
