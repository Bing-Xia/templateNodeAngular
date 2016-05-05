'use strict';

var SwigFilters = {};

SwigFilters.buildNumber = function(input) {
  var idx = input.indexOf('?')+1, version = 'ver='+global.AppConfig.buildNumber;
  return input + (idx?'&': '?') + version;
};

module.exports = SwigFilters;