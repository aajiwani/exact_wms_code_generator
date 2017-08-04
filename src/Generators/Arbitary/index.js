//var template = require('es6-template-strings');
// You can reuse same templates:
import compile from 'es6-template-strings/compile';
import resolveToString from 'es6-template-strings/resolve-to-string';
import fs from 'fs';
import path from 'path';
import questionsArray from './questions';
import BasicGenerator from '../BasicGenerator';

export default class ArbitaryGenerator extends BasicGenerator
{
  constructor()
  {
    super();
  }

  questions()
  {
    return questionsArray;
  }

  generate(input)
  {
    // console.log(input);
    var data = fs.readFileSync(path.resolve(__dirname, 'fileString.txt'), 'utf8');
    var compiled = compile(data);
    return resolveToString(compiled, input);
  }
}
