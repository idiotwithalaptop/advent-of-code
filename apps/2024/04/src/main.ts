import { argv } from 'process';
import { createReadStream } from 'fs';
import { createInterface } from 'readline';
import { Letter, toLinkedLetter, WordSearch } from './domain';
import { find, findX } from './searcher';

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
  const part1Result = find(toLinkedLetter('XMAS'), wordSearchBoard);
  console.log("Number of found xmas': ", part1Result);
  const part2Result = findX(toLinkedLetter('MAS'), wordSearchBoard);
  console.log("Number of found X-MAS': ", part2Result);
});
