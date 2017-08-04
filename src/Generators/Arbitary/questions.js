var Promise = require("bluebird");
var fs = require("fs");
Promise.promisifyAll(fs);

export default [
  {
    name: 'stringname',
    type: 'input',
    message: 'Enter class name:',
    validate: function( value ) {
      if (value.length) {
        return true;
      } else {
        return 'Please enter your classname correctly';
      }
    }
  },
  {
    name: 'varName',
    type: 'input',
    message: 'Enter variable name:',
    validate: function( value ) {
      if (value.length) {
        return true;
      } else {
        return 'Please enter your variable name correctly';
      }
    }
  },
  {
    name: 'varValue',
    type: 'input',
    message: 'Enter a value for your variable:',
    validate: function( value ) {
      if (value.length) {
        return true;
      } else {
        return 'Please enter your value correctly';
      }
    }
  },
  {
    name: 'generationPath',
    type: 'input',
    message: 'Enter folder to generate the component at:',
    validate: function( value )
    {
      return fs.accessAsync(value, fs.constants.R_OK | fs.constants.W_OK)
        .then(() => true);
    }
  }
];
