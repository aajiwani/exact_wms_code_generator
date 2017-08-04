import _ from 'lodash';
import Wizard from './Wizard';

var argv = require('minimist')(process.argv);

if (_.has(argv, 'generate'))
{
  Wizard.BeginWizard(argv.generate, argv);
}
// else
// {
//   console.log('node npm run-script start -- --generate={what-to-generate}');
// }
