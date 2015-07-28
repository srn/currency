'use strict';

var request = require('request');
var money = require('money');

var appId = process.env.OPENEXCHANGERATES_APP_ID || '9c3a9fa4d4b7415e95880e677db3d080';

module.exports = function (amount, from, to, callback) {
  var path = 'https://openexchangerates.org/api/latest.json?app_id=' + appId;

  amount = amount || 10;
  from = from ? from.toUpperCase() : 'USD';
  to = to ? to.toUpperCase() : 'DKK';

  request(path, function (err, response, body) {
    if (err) {
      return callback(err);
    }

    // http://theprofoundprogrammer.com/post/25728479232/text-what-the-fuck-kind-of-variable-name-is
    var data = JSON.parse(body);

    if (data.error === true) {
      return callback(new Error(data.message));
    }

    money.base = data.base;
    money.rates = data.rates;

    var converted = money.convert(amount, {
      from: from,
      to: to
    });

    callback(null, converted);
  });
};
