#!/usr/bin/env node
'use strict';

var pkg = require('./package.json');
var currency = require('./');
var argv = process.argv.slice(2);

const updateNotifier = require('update-notifier');
updateNotifier({pkg}).notify();

function help() {
  console.log([
    '',
      '  ' + pkg.description,
    '',
    '  Example',
    '    currency 10 usd dkk',
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

var opts = {
  amount: argv[0],
  from: argv[1],
  to: argv[2]
};

currency(opts).then(console.log).catch(err => {
  console.log(err);

  process.exit(1);
});
