'use strict';

var assert = require('assert');
var nock = require('nock');
var currency = require('./');


var exchangeRates = {
  base: 'USD',
  rates: {
    DKK: 5.775516,
    MYR: 3.230421
  }
};

beforeEach(function(){
  nock('https://openexchangerates.org')
    .get('/api/latest.json?app_id=9c3a9fa4d4b7415e95880e677db3d080')
    .reply(200, exchangeRates);
});

describe('currency.js', function(){
  it('USD to DKK', function(){
    currency(10, 'USD', 'DKK', function(amount){
      assert.equal(amount, 57.75516);
    });
  });

  it('DKK to USD', function(){
    currency(100, 'DKK', 'USD', function(amount){
      assert.equal(amount, 17.314470256856705);
    });
  });

  it('MYR to DKK', function(){
    currency(100, 'MYR', 'DKK', function(amount){
      assert.equal(amount, 178.78524192357588);
    });
  });
});