import * as WizardMap from '../config/WizardMap';
import inquirer from 'inquirer';

export default class Wizard
{
  static BeginWizard(name, requirements)
  {
    var realizedClass = WizardMap.GetFileObject(name);
    inquirer.prompt(realizedClass.questions())
    .then((answers) => {
      console.log(realizedClass.generate(answers));
    });
  }
}
