import { argv } from 'process';
import { createReadStream } from 'fs';
import { createInterface } from 'readline';
import { executeCommand, supportedCommands } from './command/executor';
import { extractCommands } from './command/extractor';
import { Command } from './command/types';

const fileName = argv[2];

if (!fileName) {
  console.error('Please provide a file name.');
  process.exit(1);
}

const fileStream = createReadStream(fileName);
const rl = createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

let commands: Command[] = [];
rl.on('line', (line) => {
  try {
    const commandsToParse = supportedCommands();
    commands = commands.concat(extractCommands(line, ...commandsToParse));
  } catch (error) {
    console.error(`Error processing line: '${error.message}', skipping`);
  }
});
rl.on('close', () => {
  const results = commands.map(executeCommand);
  const mulSum = results
    .filter((r) => r.key === 'mul' && r.failed === false)
    .reduce((acc, r) => acc + r.result, 0);
  console.log(`Total sum of mul results: ${mulSum}`);
});
