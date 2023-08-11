import { Command } from 'commander';
import inquirer from 'inquirer';
import * as fs from 'fs-extra';

const generatePageCommand = new Command('generate:page')
  .description('Generate a new page')
  .action(async () => {
    const { name } = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter page name:',
      },
    ]);

    const pageTemplate = `import React from 'react';

    type ${name}PageProps = {
      // TODO: Add props
    };

    const ${name}Page: React.FC = () => {
      return (
        <div>
          <h1>Hello ${name} Page</h1>
        </div>
      );
    };

    export default ${name}Page;
    `;

    const pagePath = `src/pages/${name}Page.tsx`;

    fs.outputFileSync(pagePath, pageTemplate);

    console.log(`Page ${name} generated successfully at ${pagePath}`);
  });

export default generatePageCommand;
