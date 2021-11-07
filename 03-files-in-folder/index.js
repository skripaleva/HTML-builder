const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    fs.stat(path.join(__dirname, 'secret-folder', file), (err, stats) => {
      if (err) throw err;
      if (stats.isFile()) {
        console.log(path.basename(file, path.extname(file)) + ' - ' + path.extname(file).slice(1) + ' - '
          + stats.size/1024 + 'kb');
      }
    });
  });
});