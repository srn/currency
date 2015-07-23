#!/usr/bin/env node
'use strict';

var pkg = require('./package.json');
var currency = require('./');
var argv = process.argv.slice(2);

function help() {
  console.log([
    '',
      '  ' + pkg.description,
    '',
    '  Example',
    '    currency 10 USD DKK',
    '',
      '    => 57.75516'
  ].join('\n'));
}

if (argv.indexOf('--help') !== -1) {
  help();
  return;
}

if (argv.indexOf('--version') !== -1) {
  console.log(pkg.version);
  return;
}

currency(argv[0], argv[1], argv[2], function(err, converted){
  if (err) {
    throw err;
  }

  console.log(converted);
});
