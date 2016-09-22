// pollfile
// https://github.com/paulmillr/es6-shim/blob/master/es6-shim.js
if (!String.prototype.repeat) {
  // Fast repeat, uses the `Exponentiation by squaring` algorithm.
  // Perf: http://jsperf.com/string-repeat2/2
  var stringRepeat = function repeat(s, times) {
    if (times < 1) { return ''; }
    if (times % 2) { return repeat(s, times - 1) + s; }
    var half = repeat(s, times / 2);
    return half + half;
  };

  var $String = String;
  var _floor = Math.floor;
  var _abs = Math.abs;
  var stringMaxLength = Infinity;
  var _toString = Function.call.bind(Object.prototype.toString);
  var numberIsNaN = Number.isNaN || function isNaN(value) {
    // NaN !== NaN, but they are identical.
    // NaNs are the only non-reflexive value, i.e., if x !== x,
    // then x is NaN.
    // isNaN is broken: it converts its argument to number, so
    // isNaN('foo') => true
    return value !== value;
  };
  var numberIsFinite = Number.isFinite || function isFinite(value) {
    return typeof value === 'number' && globalIsFinite(value);
  };
  var ES = {
    RequireObjectCoercible: function (x, optMessage) {
      /* jshint eqnull:true */
      if (x == null) {
        throw new TypeError(optMessage || 'Cannot call method on ' + x);
      }
      return x;
    },
    ToString: function ToString(string) {
      return $String(string);
    },
    ToNumber: function (value) {
      if (_toString(value) === '[object Symbol]') {
        throw new TypeError('Cannot convert a Symbol value to a number');
      }
      return +value;
    },
    ToInteger: function (value) {
      var number = ES.ToNumber(value);
      if (numberIsNaN(number)) { return 0; }
      if (number === 0 || !numberIsFinite(number)) { return number; }
      return (number > 0 ? 1 : -1) * _floor(_abs(number));
    }
  };

  String.prototype.repeat = function(times) {
    var thisStr = ES.ToString(ES.RequireObjectCoercible(this));
    var numTimes = ES.ToInteger(times);
    if (numTimes < 0 || numTimes >= stringMaxLength) {
      throw new RangeError('repeat count must be less than infinity and not overflow maximum string size');
    }
    return stringRepeat(thisStr, numTimes);
  }
}

var stylefmt = require('stylefmt').process;
var fs = require('fs');
var content = process.argv[2];

function printResult(data) {
  console.log(JSON.stringify(data));
}

stylefmt(content, {})
  .then(function(result) {
    printResult({
      css: result && result.css
    });
  })
  .catch(function(err) {
    printResult({
      error: {
        code: err.code,
        message: err.message,
        stack: err.stack
      }
    });
  });
