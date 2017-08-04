import _ from 'lodash';
import Wizard from './src/Wizard';

var argv = require('minimist')(process.argv);

if (_.has(argv, 'generate'))
{
  Wizard.BeginWizard(argv.generate);
}
else
{
  console.log('npm run-script start -- --generate={what-to-generate}');
}
