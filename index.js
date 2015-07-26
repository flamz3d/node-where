'use strict';

var isIP = require('validator').isIP;
var Address = require('./lib/address');
var IP = require('./lib/ip');
var request = require('request');

/*
 * callback: fn(err, result);
 */
var is = function(ipOrAddress, callback) {
  var locator;
  var opts;

  if (isIP(ipOrAddress)) {
    locator = new IP(ipOrAddress);
  } else {
    locator = new Address(ipOrAddress);
  }

  opts = {
    method: 'GET',
    url: locator.url,
    json: true
  };

  request(opts, function(err, res, body) {
    if (err) {
      return callback(err);
    }

    callback(null, locator.buildResult(body));
  });
};

module.exports = {
  is: is
};
