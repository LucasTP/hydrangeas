#!/usr/bin/env node
import { Command } from 'commander';

//import generatePageCommand from './generators/page';

const figlet = require('figlet');
const fs = require('fs');
const path = require('path');

const program = new Command();

console.log(figlet.textSync('My React CLI'));

program
  .version('1.0.0')
  .description('CLI for generating React components')
  .option('-l, --list [value]', 'List all files in the current directory')
  .option('-g, --generate [value]', 'Generate a component')
  .option('-p, --page <page>', 'Generate a page')
  .option('-c, --component <component>', 'Generate a component')
  .option('-r, --redux <redux>', 'Generate a redux component')
  .option('-s, --style <style>', 'Generate a style')
  .option('-t, --test <test>', 'Generate a test')
  .option('-a, --all <all>', 'Generate all')
  //.addCommand(generatePageCommand)
  .parse(process.argv);

const options = program.opts();

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
