const fs = require('fs');
const path = require('path');

const folderName = `${path.join(__dirname, 'files')}`;
const folderCopyName = `${path.join(__dirname, 'files-copy')}`;

fs.promises.mkdir(folderCopyName, { recursive: true }, err => {
  if (err) throw err;
});
fs.readdir(folderCopyName, (err, files) => {
  if (err) throw err;

  for (const file of files) {
    fs.unlink(path.join(folderCopyName, file), err => {
      if (err) throw err;
    });
  }
});

function copyDir() {
  fs.readdir(folderName, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      fs.copyFile(path.join(folderName, file), path.join(folderCopyName, file), err => {
        if (err) throw err;
      }
      );
      console.log(`${file} was copied to folder files-copy`);
    });
  });
}

copyDir();


