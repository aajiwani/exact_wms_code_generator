var Promise = require("bluebird");
var fs = require("fs");
Promise.promisifyAll(fs);

export default [
  {
    name: 'componentName',
    type: 'input',
    message: 'Enter component name:',
    validate: function( value )
    {
      var re = new RegExp('^[A-Za-z]+\\w*$', 'g');
      return re.test(value) ? true : 'Please enter a component name matching regex(^[A-Za-z]+\\w*$)';
    }
  },
  {
    name: 'shallRequireParentProps',
    type: 'confirm',
    message: 'Success component requires parent props support? :',
    default: true
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
  },
  {
    name: 'isSeperateScreen',
    type: 'confirm',
    message: 'Will this component be used as a seperate screen? :',
    default: true
  },
  {
    name: 'shallOverwrite',
    type: 'confirm',
    message: 'Shall we overwrite if the directory already exists? :',
    default: false
  }
];
