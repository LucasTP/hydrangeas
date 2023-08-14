#!/usr/bin/env node
import { Command } from 'commander';

import { generatePage } from './generators/page';

const figlet = require('figlet');
const fs = require('fs');
const path = require('path');

const program = new Command();

console.log(figlet.textSync('Hydrangeas React CLI'));

program
  .version('1.0.0')
  .description('CLI for generating React components')
  .option('-l, --list [value]', 'List all files in the current directory')
  .option('-g, --generate [option] [value]', 'Generate page, component, redux')
  .parse(process.argv);

const options = program.opts();

const args = program.args;

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
  const name = args.length > 0 ? args[0] : '';
  switch (options.generate) {
    case 'page':
      generatePage(name.trim());
      break;
    case 'component':
      console.log('Generating component');
      break;
    case 'redux':
      console.log('Generating redux');
      break;
    default:
      console.error('Unknown option for generate');
      break;
  }
}
