import inquirer from 'inquirer';
import * as fs from 'fs-extra';

import {
  basePath,
  EOptions,
  getPageStyleTemplate,
  getPageTemplate,
  mergePath,
} from './constant';
const prompt = inquirer.createPromptModule();

export const generatePage = async (args: string[]) => {
  console.log('Generating page...');

  let pagePath = args.length > 0 ? args[0] : '';
  if (!pagePath) {
    const { inputName } = await prompt({
      type: 'input',
      name: 'inputName',
      message: 'Enter page name:',
    });
    pagePath = inputName;
  }

  const transformedPath = pagePath.split('/');
  if (transformedPath.length < 1) {
    console.error('Invalid path');
    return;
  }
  const pageName = transformedPath[transformedPath.length - 1];
  const mergedPath = mergePath(transformedPath, EOptions.Page);
  const template = getPageTemplate(pageName);
  const styleTemplate = getPageStyleTemplate(pageName);

  const fullPagePath = `${mergedPath}/${pageName}Page.tsx`;
  const fullStylePagePath = `${mergedPath}/${pageName}PageStyle.tsx`;

  fs.outputFileSync(fullPagePath, template);
  fs.outputFileSync(fullStylePagePath, styleTemplate);

  console.log(`Page ${pageName} generated successfully at:`);
  console.log(`Path: ${fullPagePath}`);
  console.log(`Path: ${fullStylePagePath}`);
};
