const fs = require('fs');
const path = require('path');
const stdout = process.stdout;

const readText = fs.createReadStream(path.join(__dirname, 'text.txt'), {
  encoding: 'utf-8'
});


readText.on('data', (chunk => stdout.write(chunk)));
readText.on('error', error => console.log('Error', error.message));