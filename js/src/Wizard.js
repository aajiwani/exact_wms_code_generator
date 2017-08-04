import * as WizardMap from '../config/WizardMap';
import inquirer from 'inquirer';

export default class Wizard
{
  static BeginWizard(name, params)
  {
    var realizedClass = WizardMap.GetFileObject(name, params);
    inquirer.prompt(realizedClass.questions())
    .then((answers) => {
      console.log(realizedClass.generate(answers));
    });
  }
}
