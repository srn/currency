var requirejs = require('requirejs').config({nodeRequire:require, baseUrl:''});

requirejs(['http', 'commander', 'money'], function (http, commander, money) {
  var options = {
    host: 'openexchangerates.org',
    path: '/api/latest.json?app_id=9c3a9fa4d4b7415e95880e677db3d080'
  };

  var data = '';
  http.request(options, function(response){
    response.on('data', function (chunk) {
      data += chunk;
    });

    response.on('end', callback);
  }).end();

  var callback = function(){
    data = JSON.parse(data);
    money.base = data.rates;
    money.rates = data.rates;

    commander
        .version('0.0.4');

    commander
        .command('* <currency> * [from] * [to]')
        .description('convert from any currency to any currency')
        .action(function(currency, from, to){
          from = from ? from.toUpperCase() : 'USD';
          to = to ? to.toUpperCase() : 'DKK';

          var converted = money.convert(currency, {from: from, to: to});

          console.log('=>', converted);
        });

    commander.parse(process.argv);
  };
});
