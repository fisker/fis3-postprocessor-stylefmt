/*
 * fis3-postprocessor-stylefmt
 * fisker Cheung<lionkay@gmail.com>
 */

'use strict';

require('es6-shim');
var syncPromise = require('promise-synchronizer');
var stylefmt = require('stylefmt').process;;
var log = (global.fis && fis.log) || console;

module.exports = function(content, file, conf){

  var promise = stylefmt(content, {})
    .then(function(result) {
      if (result && result.css) {
        content = result.css;
      }
    });

  syncPromise(promise);
  return content;
};


