import { argv } from 'process';
import { createReadStream } from 'fs';
import { createInterface } from 'readline';
import { calculateDistance } from './calculators/distance';
import { calculateSimilarity } from './calculators/similarity';

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

const origin: number[] = [];
const destination: number[] = [];
rl.on('line', (line) => {
  if (line.match(/^\d+\s+\d+$/)) {
    const [x, y] = line.split(/\s+/).map(Number);
    origin.push(x);
    destination.push(y);
  } else {
    console.error(`Invalid input: '${line}', skipping`);
  }
});
rl.on('close', () => {
  calculateDistance(origin, destination)
    .then((distance) => {
      console.log(`Part 1 Result: ${distance}`);
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  calculateSimilarity(origin, destination)
    .then((distance) => {
      console.log(`Part 1 Result: ${distance}`);
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
});
