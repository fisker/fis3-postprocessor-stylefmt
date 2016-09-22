# fis3-postprocessor-stylefmt
a css formatter of fis3 based on stylefmt

[![npm](https://img.shields.io/npm/v/fis3-postprocessor-stylefmt.svg?style=flat-square)](https://www.npmjs.com/package/fis3-lint-stylelint) 
[![npm](https://img.shields.io/npm/dt/fis3-postprocessor-stylefmt.svg?style=flat-square)](https://www.npmjs.com/package/fis3-lint-stylelint) 
[![npm](https://img.shields.io/npm/dm/fis3-postprocessor-stylefmt.svg?style=flat-square)](https://www.npmjs.com/package/fis3-lint-stylelint)

## usage

    $ npm i -g fis3-postprocessor-stylefmt

```
// fis-conf.js

fis.match('*.{css,scss,less,sss}}', {
  postprocessor: fis.plugin('stylefmt')
});
```

## links
fis3: [http://fis.baidu.com/]

stylefmt: [https://github.com/morishitter/stylefmt]
