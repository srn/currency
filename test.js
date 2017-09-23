import test from 'ava'
import nock from 'nock'

import currency from './'

test.beforeEach(t => {
  nock('https://api.fixer.io')
    .get('/latest?base=USD')
    .reply(200, {
      base: 'USD',
      rates: {
        DKK: 6.2208
      }
    })

  nock('https://api.fixer.io')
    .get('/latest?base=DKK')
    .reply(200, {
      base: 'DKK',
      rates: {
        USD: 0.16075
      }
    })

  nock('https://blockchain.info')
    .get('/ticker')
    .reply(200, {
      "USD" : {"15m" : 3755.12, "last" : 3755.12, "buy" : 3755.29, "sell" : 3754.95, "symbol" : "$"},
      "DKK" : {"15m" : 23383.98, "last" : 23383.98, "buy" : 23385.04, "sell" : 23382.92, "symbol" : "kr"}
    })

  nock('https://etherchain.org')
    .get('/api/statistics/price')
    .reply(200, {
      "status": 1,
      "data": [
        {
          "time": "2017-09-23T16:10:56.000Z",
          "usd": 278.91
        }
      ]
    })
})

test('convert 1 USD to DKK', async t => {
  const converted = currency({
    amount: 1,
    from: 'USD',
    to: 'DKK'
  })

  t.is(await converted, 6.2208)
})

test('convert 1 DKK to USD', async t => {
  const converted = currency({
    amount: 1,
    from: 'DKK',
    to: 'USD'
  })

  t.is(await converted, 0.16075)
})

test('convert 1 BTC to USD', async t => {
  const converted = currency({
    amount: 1,
    from: 'BTC',
    to: 'USD'
  })

  t.is(await converted, 3755.12)
})

test('convert 1 BTC to DKK', async t => {
  const converted = currency({
    amount: 1,
    from: 'BTC',
    to: 'DKK'
  })

  t.is(await converted, 23383.98)
})

test('convert 1 DKK to BTC', async t => {
  const converted = currency({
    amount: 1,
    from: 'DKK',
    to: 'BTC'
  })

  t.is(await converted, 0.00004276431984632214)
})

test('convert 1 ETH to USD', async t => {
  const converted = currency({
    amount: 1,
    from: 'ETH',
    to: 'USD'
  })

  t.is(await converted, 278.91)
})

test('convert 1 ETH to DKK', async t => {
  const converted = currency({
    amount: 1,
    from: 'ETH',
    to: 'DKK'
  })

  t.is(await converted, 1735.043328)
})

test('convert 1 USD to ETH', async t => {
  const converted = currency({
    amount: 1,
    from: 'USD',
    to: 'ETH'
  })

  t.is(await converted, 0.0035853859667993255)
})
