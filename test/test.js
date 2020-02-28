const fs = require('fs');
const xml2vtt = require('../');

const Reset = '\x1b[0m';
const Bright = '\x1b[1m';
const FgCyan = '\x1b[36m';
const FgGreen = '\x1b[32m';
const FgRed = '\x1b[31m';

console.log(`${FgCyan}${Bright}%s${Reset}`, 'Starting Tests...\n');
console.time(`${FgGreen}${Bright}Finished in${Reset}`);
let xmlFile;
let expectedRes;

try {
  xmlFile = fs.readFileSync(`${__dirname}/testData/caption.xml`, 'utf8');
  expectedRes = fs.readFileSync(`${__dirname}/testData/caption.vtt`, 'utf8');
} catch (err) {
  throw new Error(
    `${FgRed}${Bright}Tests failed, couldn't open test data${Reset}`
  );
}

xml2vtt
  .Parse(xmlFile)
  .then(data => {
    if (data !== expectedRes)
      throw new Error('Tests failed, expected result does not match result');
    console.log(`${FgGreen}${Bright}%s${Reset}`, 'Tests passed successfully!');
    console.timeEnd(`${FgGreen}${Bright}Finished in${Reset}`);
    return process.exit(0);
  })
  .catch(err => {
    console.log(`${FgRed}${Bright}%s${Reset}`, err);
  });
