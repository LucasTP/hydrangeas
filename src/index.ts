#!/usr/bin/env node
import { Command } from 'commander';
import inquirer from 'inquirer';

import { EOptions } from './generators/constant';
import { generatePage } from './generators/page';

const figlet = require('figlet');
const fs = require('fs');
const path = require('path');

const program = new Command();
const prompt = inquirer.createPromptModule();

console.log(figlet.textSync('Hydrangeas React CLI'));

program
  .version('1.0.0')
  .description('CLI for generating React components')
  .option('-l, --list [value]', 'List all files in the current directory')
  .option(
    '-g, --generate [option] [name]',
    'Generate files base on option: page, component, redux',
  )
  .parse(process.argv);

const options = program.opts();

const args = program.args;

function handleGenerateOption(option: string) {
  switch (option) {
    case EOptions.Page:
      generatePage(args);
      break;
    case EOptions.Component:
      console.log('Generating component');
      break;
    case EOptions.Redux:
      console.log('Generating redux');
      break;
    default:
      console.log('Invalid option');
      break;
  }
}

async function listDirContents(filePath: string) {
  try {
    const files = await fs.promises.readdir(filePath);
    const detaildFilesPromises = files.map(async (file: File) => {
      let fileDetails = await fs.promises.lstat(path.resolve(filePath, file));
      const { size, birthtime } = fileDetails;

      return {
        filename: file,
        'size(KB)': size,
        created_at: birthtime,
      };
    });

    const detailedFiles = await Promise.all(detaildFilesPromises);

    console.table(detailedFiles);
  } catch (err) {
    console.log('Error occured while reading the directory!', err);
  }
}

if (options.list) {
  const filePath =
    typeof options.list === 'string' ? options.list : process.cwd();
  listDirContents(filePath);
}

if (options.generate) {
  switch (options.generate) {
    case EOptions.Page:
      if (args.length > 1) {
        console.error('Invalid arguments');
        break;
      }
      generatePage(args);
      break;
    case EOptions.Component:
      console.log('Generating component');
      break;
    case EOptions.Redux:
      console.log('Generating redux');
      break;
    default:
      const choices = Object.values(EOptions) as string[];
      prompt({
        type: 'list',
        name: 'option',
        choices,
        message: 'Which type do you want to generate:',
      }).then((answers) => {
        const { option } = answers;
        handleGenerateOption(option);
      });
      break;
  }
}
