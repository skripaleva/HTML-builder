const fs = require('fs');
const path = require('path');

const fileName = `${path.join(__dirname, 'project-dist', 'bundle.css')}`;
const folderStyles = `${path.join(__dirname, 'styles')}`;
const output = fs.createWriteStream(fileName);

fs.readdir(folderStyles, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    fs.stat(path.join(folderStyles, file), (err, stats) => {
      if (err) throw err;
      if (stats.isFile()) {
        if (path.extname(file) === '.css') {
          fs.readFile(path.join(folderStyles, file), (err,content) => {
            if (err) throw err;
            output.write(content.toString() + '\n');
          });
        }
      }
    });
  });
});