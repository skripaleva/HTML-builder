const path = require('path');
const fs = require('fs');
const folderProject = `${path.join(__dirname, 'project-dist')}`;
const projectIndex = `${path.join(folderProject, 'index.html')}`;
const folderComponents = `${path.join(__dirname, 'components')}`;

fs.mkdir(folderProject, { recursive: true }, err => {
  if (err) throw err;
});

const template = fs.createReadStream(path.join(__dirname, 'template.html'),'utf-8');

const index = fs.createWriteStream(path.join(projectIndex));

template.on('data', async (data) => {
  const res = await replace();
  index.write(res);

  async function replace() {
    let distHtml = data.toString();
    const regComp = distHtml.match(/{{(.*)}}/gi);

    for (let i of regComp) {
      const compName = i.replace(/[{|}]/g, '');
      const component = await fs.promises.readFile(
        path.join(folderComponents, `${compName}.html`)
      );
      distHtml = distHtml.replace(i, component.toString());
    }
    return distHtml;
  }
});

const projectStyles = `${path.join(folderProject, 'style.css')}`;
const folderStyles = `${path.join(__dirname, 'styles')}`;
const output = fs.createWriteStream(projectStyles);

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

const folderName = `${path.join(__dirname, 'assets')}`;
const folderCopyName = `${path.join(folderProject, 'assets')}`;

fs.promises.mkdir(folderCopyName, { recursive: true }, err => {
  if (err) throw err;
});

function unlink(argPath) {
  fs.readdir(argPath, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      fs.stat(path.join(argPath, file), (err, stats) => {
        if (err) throw err;
        if (stats.isDirectory()) {
          let newPath = path.join(argPath, file);
          unlink(newPath);
        } else {
          fs.unlink(path.join(argPath, file), err => {
            if (err) throw err;
          });
        }
      });
    }
  });
}

unlink(folderCopyName);

function copyDir(argPath, copy) {
  fs.readdir(argPath, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      fs.stat(path.join(argPath, file), (err, stats) => {
        if (err) throw err;
        if (stats.isDirectory()) {
          fs.promises.mkdir(path.join(copy, file), { recursive: true }, err => {
            if (err) throw err;
          });
          let innerPath = path.join(argPath, file);
          let innerCopy =  path.join(copy, file);
          copyDir(innerPath, innerCopy);
        }
        else {
          fs.copyFile(path.join(argPath, file), path.join(copy, file), err => {
            if (err) throw err;
          }
          );
        }
      });
    });
  });
}

copyDir(folderName, folderCopyName);

console.log('build page complete');