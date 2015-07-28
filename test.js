'use strict';

var assert = require('assert');
var nock = require('nock');
var childProcess = require('child_process');

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

describe('conversion', function(){
  it('should convert 10 USD to DKK', function(){
    currency(10, 'USD', 'DKK', function(err, amount){
      assert.equal(amount, 57.75516);
    });
  });

  it('should convert 100 DKK to USD', function(){
    currency(100, 'DKK', 'USD', function(err, amount){
      assert.equal(amount, 17.314470256856705);
    });
  });

  it('should convert 100 MYR to DKK', function(){
    currency(100, 'MYR', 'DKK', function(err, amount){
      assert.equal(amount, 178.78524192357588);
    });
  });

  it('should handle err', function(){
    var body = {
      error: true,
      status: 401,
      message: 'invalid_app_id'
    };

    nock.cleanAll();
    nock('https://openexchangerates.org')
      .get('/api/latest.json?app_id=a1337')
      .reply(200, body);

    currency(100, 'MYR', 'DKK', function(err, amount){
      assert.equal(err.message, body.message);
      assert.equal(amount, void 0);
    });
  });
});
