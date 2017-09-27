#!/usr/bin/env node

const currency = require('./')
const argv = process.argv.slice(2)

const ora = require('ora')
const updateNotifier = require('update-notifier')
const pkg = require('./package.json')

updateNotifier({pkg}).notify()

function help() {
  console.log([
    '',
    '  ' + pkg.description,
    '',
    '  Example',
    '    $ currency 10 usd dkk',
    '    => 10 USD = 62.208 DKK',
    '',
    '  See readme.md for detailed usage.'
  ].join('\n'))
}

if (argv.indexOf('--help') !== -1) {
  help()
  return
}

if (argv.indexOf('--version') !== -1) {
  console.log(pkg.version)
  return
}

const spinner = ora('Fetching exchange data..').start()

let opts = {
  amount: argv[0] || 1,
  from: (argv[1] || 'USD').toUpperCase(),
  to: (argv[2] || 'BTC').toUpperCase()
}

currency(opts)
  .then(result => {
    spinner.stop()

    console.log(`${opts.amount} ${opts.from} = ${result} ${opts.to}`)
  })
  .catch(err => {
    spinner.stop()

    console.log(err)

    process.exit(1)
  })
