import { Command } from 'commander';
import generatePageCommand from './generators/page';

const program = new Command();

program.version('1.0.0');

program.addCommand(generatePageCommand);

program.parse(process.argv);
