# currency [![Build Status](http://img.shields.io/travis/srn/currency.svg?style=flat-square)](https://travis-ci.org/srn/currency)

> simple currency conversion cli using [fixer.io](http://fixer.io), [blockchain.info](https://blockchain.info) and [etherchain.org](https://etherchain.org)

![screenshot.gif](screenshot.gif)

## Install

```sh
$ npm i currency -g
```

## Currencies

- All currencies listed in the [European Central Bank](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html) API
- Bitcoin using [blockchain.info](https://blockchain.info)
- Ethereum using [etherchain.org](https://etherchain.org)

## CLI

```sh
$ currency --help

  simple currency conversion in the terminal

  Example
    $ currency 10 usd dkk
    => 10 USD = 62.208 DKK

    $ currency 1 btc usd
    => 1 BTC = 3746.18 USD

    $ currency 500 usd btc
    => 500 USD = 0.13358982579886716 BTC

    $ currency 1 eth usd
    => 1 ETH = 282.81 USD

    $ currency 500 usd eth
    => 500 USD = 1.767971429581698 ETH
```

## License

MIT © [Søren Brokær](http://srn.io)
