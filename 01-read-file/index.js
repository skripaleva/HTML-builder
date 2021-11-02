const fs = require('fs');
const path = require('path');
//
// fs.readFile(path.join(__dirname, 'text.txt'), (err, data) => {
//   if(err) throw err;
//   console.log(data.toString());
// });
const readText = fs.createReadStream(path.join(__dirname, 'text.txt'), {
  encoding: 'utf-8',
  // highWaterMark: 100
});

readText.on('data', (chunk => console.log(chunk)));

