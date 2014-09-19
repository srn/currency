# currency.js [![Build Status](http://img.shields.io/travis/srn/currency.js.svg?style=flat-square)](https://travis-ci.org/srn/currency.js) [![Dependency Status](http://img.shields.io/gemnasium/srn/currency.js.svg?style=flat-square)](https://gemnasium.com/srn/currency.js)

>  simple currency conversion in the terminal

## Install

```sh
$ npm install currency --save
```

## Usage

```js
var currency = require('currency');

currency(10, 'USD', 'DKK', function(converted){
    console.log(converted);

    => 57.54916
});
```

## CLI
```sh
$ npm install --global currency
```

```sh
$ currency --help

  simple currency conversion in the terminal

  Example
    currency 10 USD DKK

    => 57.75516
```

## License

MIT © [Søren Brokær](http://srn.io)
