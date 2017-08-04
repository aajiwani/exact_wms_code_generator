import path from 'path';
import _ from 'lodash';
import availableGenerators from './AvailableGenerators';

var generatorsFolder = path.resolve(__dirname, '..', 'src', 'Generators');

export function GetFileObject(name)
{
  var filtered = _.filter(availableGenerators, { name: name });
  if (filtered.length === 1)
  {
    var fileName = path.resolve(generatorsFolder, filtered[0].file);
    var respondantClass = require(`${fileName}`).default;
    return new respondantClass();
  }
  else
  {
    console.log('Available Generators: ');
    _.forEach(availableGenerators, function(item)
    {
      console.log(item.name);
    });
  }

  throw new Error('Error finding the required generator');
}
