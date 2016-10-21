/*
 * fis3-postprocessor-stylefmt
 * fisker Cheung<lionkay@gmail.com>
 */

'use strict';

// colors.js bug
// es6-shim `bold` breaks colors.js
var hasColors = false;
if (String.prototype.__lookupGetter__('bold')) {
  hasColors = true;
}
require('es6-shim');
if (hasColors) {
  String.prototype.__defineGetter__('bold', function() {
    return '\x1B[1m' + this + '\x1B[22m';
  });
}

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
