import { argv } from 'process';
import { createReadStream } from 'fs';
import { createInterface } from 'readline';
import { Letter, toLinkedLetter, WordSearch } from './domain';
import { find } from './searcher';

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

const wordSearchBoard: WordSearch = [];
rl.on('line', (line) => {
  wordSearchBoard.push(line.split('') as Letter[]);
});
rl.on('close', () => {
  const word = toLinkedLetter('XMAS');
  const result = find(word, wordSearchBoard);
  console.log("Number of found xmas': ", result);
});
