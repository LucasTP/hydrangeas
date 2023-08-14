import inquirer from 'inquirer';
import * as fs from 'fs-extra';

import { basePath, getPageTemplate, toPascalCase } from './constant';

export const generatePage = async (name: string) => {
  console.log('Generating page...');
  let pageName = name;
  if (!name) {
    const { inputName } = await inquirer.prompt([
      {
        type: 'input',
        input: 'name',
        message: 'Enter page name:',
      },
    ]);

    pageName = inputName;
  }

  const pagePath = `${basePath}/pages/${pageName}Page.tsx`;
  const template = getPageTemplate(pageName);

  fs.outputFileSync(pagePath, template);

  console.log(`Page ${name} generated successfully at ${pagePath}`);
};
