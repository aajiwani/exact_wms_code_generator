import compile from 'es6-template-strings/compile';
import resolveToString from 'es6-template-strings/resolve-to-string';
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';
import questionsArray from './questions';
import BasicGenerator from '../BasicGenerator';
import * as Helper from './helpers.js';

export default class Generator extends BasicGenerator
{
  constructor()
  {
    super();
  }

  questions()
  {
    return questionsArray;
  }

  _prepareAndSaveLoadingComponent(folderPath, input)
  {
    var loadingComponentFile = path.join(folderPath, input.fileName);
    var loadingComponent = fs.readFileSync(path.resolve(__dirname, 'loadingComponent.txt'), 'utf8');
    fs.writeFileSync(loadingComponentFile, loadingComponent);
    return loadingComponent;
  }

  _prepareAndSaveSuccessComponent(folderPath, input)
  {
    var successComponentFile = path.join(folderPath, input.fileName);
    var successComponent = fs.readFileSync(path.resolve(__dirname, 'successComponent.txt'), 'utf8');

    successComponent = compile(successComponent);
    successComponent = resolveToString(successComponent, {
      successComponentName: input.componentName + 'SuccessComponent'
    });

    fs.writeFileSync(successComponentFile, successComponent);
    return successComponent;
  }

  _prepareAndSaveMainComponent(folderPath, input)
  {
    var mainComponentFile = path.join(folderPath, input.fileName);
    var mainComponent = fs.readFileSync(path.resolve(__dirname, 'mainComponent.txt'), 'utf8');

    mainComponent = compile(mainComponent);
    mainComponent = resolveToString(mainComponent, {
      successComponentName: input.componentName + 'SuccessComponent',
      successComponentFilePath: input.successComponentPath,
      loadingComponentName: input.componentName + 'LoadingComponent',
      loadingComponentFilePath: input.loadingComponentPath,
      componentName: input.componentName,
    });

    fs.writeFileSync(mainComponentFile, mainComponent);
    return mainComponent;
  }

  _prepareAndSaveScreenComponent(folderPath, input)
  {
    var screenComponentFile = path.join(folderPath, input.fileName);
    var screenComponent = fs.readFileSync(path.resolve(__dirname, 'screenComponent.txt'), 'utf8');

    screenComponent = compile(screenComponent);
    screenComponent = resolveToString(screenComponent, {
      mainComponentFileName: input.mainComponentFilePath,
      componentName: input.componentName,
      propsSupplied: (input.supplyParentProps) ? '{...this.props}' : ''
    });

    fs.writeFileSync(screenComponentFile, screenComponent);
    return screenComponent;
  }

  _prepareFolderStructure(generationPath, componentName, shallOverwrite)
  {
    if (shallOverwrite)
    {
      if (fs.existsSync(path.join(generationPath, componentName)))
      {
        Helper.rimraf(path.join(generationPath, componentName));
      }
    }

    fs.mkdirSync(path.join(generationPath, componentName));
    fs.mkdirSync(path.join(generationPath, componentName, 'components'));

    return {
      componentsPath: path.join(generationPath, componentName, 'components'),
      rootPath: path.join(generationPath, componentName)
    };
  }

  generate(input)
  {
    var paths = this._prepareFolderStructure(input.generationPath, input.componentName, input.shallOverwrite);

    var loadingComponentFileName = input.componentName + 'LoadingComponent.js';
    var successComponentFileName = input.componentName + 'SuccessComponent.js';
    var mainComponentFileName = input.componentName + 'MainComponent.js';

    var loadingComponent = this._prepareAndSaveLoadingComponent(
      paths.componentsPath,
      { fileName: loadingComponentFileName }
    );

    var successComponent = this._prepareAndSaveSuccessComponent(
      paths.componentsPath,
      {
        fileName: successComponentFileName,
        componentName: input.componentName
      }
    );

    var mainComponent = this._prepareAndSaveMainComponent(
      paths.componentsPath,
      {
        fileName: mainComponentFileName,
        componentName: input.componentName,
        successComponentPath: './' + successComponentFileName,
        loadingComponentPath: './' + loadingComponentFileName
      }
    );

    if (input.isSeperateScreen)
    {
      var screenInput = {
        supplyParentProps: input.shallRequireParentProps,
        fileName: 'index.js'
      };

      screenInput.componentName = input.componentName;
      screenInput.mainComponentFilePath = './components/' + mainComponentFileName;

      this._prepareAndSaveScreenComponent(
        paths.rootPath,
        screenInput
      );
    }
    return 'Generation Successful';
  }
}
