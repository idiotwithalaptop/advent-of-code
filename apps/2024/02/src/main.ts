import { argv } from 'process';
import { createReadStream } from 'fs';
import { createInterface } from 'readline';
import { processLine, Result } from './processor';

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

const results: Result[] = [];
rl.on('line', (line) => {
  try {
    results.push(processLine(line));
  } catch (error) {
    console.error(`Error processing line: '${error.message}', skipping`);
  }
});
rl.on('close', () => {
  console.dir(results);
  const totalSafeV1 = results.filter((r) => r.isSafeV1).length;
  const totalSafeV2 = results.filter((r) => r.isSafeV2).length;
  console.log(`Total safe lines (v1): ${totalSafeV1}`);
  console.log(`Total safe lines (v2): ${totalSafeV2}`);
});
