'use strict';

const got = require('got');
const money = require('money');

const APP_ID = process.env.OPENEXCHANGERATES_APP_ID || 'ead040886c774aa5824508a084181ecb';
const path = `https://openexchangerates.org/api/latest.json?app_id=${APP_ID}`;

module.exports = (opts) => {
  if (opts.amount === void 0) {
    opts.amount = 1;
  }

  if (opts.from === void 0) {
    opts.from = 'usd';
  }

  if (opts.to === void 0) {
    opts.to = 'dkk';
  }

  return got(path, {json:true}).then(response => {
    money.base = response.body.base;
    money.rates = response.body.rates;

    const converted = money.convert(opts.amount, {
      from: opts.from.toUpperCase(),
      to: opts.to.toUpperCase()
    });

    return Number(converted.toFixed(3));
  });
};
