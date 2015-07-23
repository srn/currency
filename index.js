'use strict';

var request = require('request');
var money = require('money');

var appId = process.env.APP_ID || '9c3a9fa4d4b7415e95880e677db3d080';

module.exports = function (amount, from, to, callback) {
  var path = 'https://openexchangerates.org/api/latest.json?app_id=' + appId;

  amount = amount || 10;
  from = from ? from.toUpperCase() : 'USD';
  to = to ? to.toUpperCase() : 'DKK';

  request(path, function (error, response, body) {
    var data = JSON.parse(body);
    money.base = data.base;
    money.rates = data.rates;

    var converted = money.convert(amount, {from: from, to: to});

    callback(converted);
  });
};