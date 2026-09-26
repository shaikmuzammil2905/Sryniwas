const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });
  return arrayOfFiles;
}

const allFiles = getAllFiles(srcDir).filter(f => f.endsWith('.jsx') || f.endsWith('.css') || f.endsWith('.js'));

const replacements = [
  // old blue/green RGBs -> new blue/green RGBs
  { regex: /rgba\(\s*59\s*,\s*130\s*,\s*246\s*/g, replace: 'rgba(103, 199, 242' },
  { regex: /rgba\(\s*22\s*,\s*163\s*,\s*74\s*/g, replace: 'rgba(32, 185, 107' },
  { regex: /rgba\(\s*37\s*,\s*211\s*,\s*102\s*/g, replace: 'rgba(32, 185, 107' },

  // any remaining `#3b82f6` or `#22c55e` etc.
  { regex: /#3b82f6/gi, replace: 'var(--color-primary)' },
  { regex: /#2563eb/gi, replace: 'var(--color-primary-light)' },
  { regex: /#dbeafe/gi, replace: 'var(--color-secondary)' },
  { regex: /#10b981/gi, replace: 'var(--color-accent)' },
  { regex: /#059669/gi, replace: 'var(--color-accent-hover)' },
  { regex: /#25D366/gi, replace: 'var(--color-whatsapp)' },
  { regex: /#1eb355/gi, replace: 'var(--color-whatsapp-hover)' },
  { regex: /#bfdbfe/gi, replace: 'var(--color-border)' },
];

for (const file of allFiles) {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content;
  
  for (const rep of replacements) {
    if (rep.fn) {
       newContent = newContent.replace(rep.regex, rep.fn);
    } else {
       newContent = newContent.replace(rep.regex, rep.replace);
    }
  }

  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log("Updated", file);
  }
}
