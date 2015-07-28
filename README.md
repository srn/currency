# currency [![Build Status](http://img.shields.io/travis/srn/currency.js.svg?style=flat-square)](https://travis-ci.org/srn/currency.js)

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
    currency 10 USD DKK

    => 57.75516
```

## openexchangerates.org

If the provided `app_id` is for whatever reason not valid anymore just set `APP_ID` as the env var:

```
$ APP_ID=a1337 currency 10 USD DKK
```

## License

MIT © [Søren Brokær](http://srn.io)
