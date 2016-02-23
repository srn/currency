# currency [![Build Status](http://img.shields.io/travis/srn/currency.svg?style=flat-square)](https://travis-ci.org/srn/currency)

>  simple currency conversion cli using [openexchangerates.org](https://openexchangerates.org/)

## Install

```sh
$ npm install currency --global
```

## CLI

```sh
$ currency --help

  simple currency conversion in the terminal

  Example
    currency 10 usd dkk

    => 57.75516
```

## openexchangerates.org

If the provided `OPENEXCHANGERATES_APP_ID` is for whatever reason not valid anymore just set `OPENEXCHANGERATES_APP_ID` as the env var:

```
$ OPENEXCHANGERATES_APP_ID=a1337 currency 10 USD DKK
```

## License

MIT © [Søren Brokær](http://srn.io)
