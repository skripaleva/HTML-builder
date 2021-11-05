const stdout = process.stdout;
const stdin = process.stdin;
const fs = require('fs');
const path = require('path');

const output = fs.createWriteStream(path.join(__dirname, 'about.txt'));

stdout.write('Hello! Tell us about yourself:\n');

stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    stdout.write('Thank you and good luck!');
    process.exit();
  }
  output.write(data);
});

process.on('SIGINT', () => {
  stdout.write('Thank you and good luck!');
  process.exit();
});
