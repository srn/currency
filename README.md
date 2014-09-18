# currency.js
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