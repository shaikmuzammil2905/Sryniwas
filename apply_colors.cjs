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
  // Hex colors to remove
  { regex: /#[0-9a-fA-F]{6}/g, fn: (match) => {
      const lower = match.toLowerCase();
      // Purples, Violets, Golds, Navy, etc.
      if (['#3b1d52', '#522a73', '#d4af37', '#1a0b2e', '#e9d5ff', '#a855f7', '#7e22ce', '#fef3c7', '#f59e0b', '#b45309'].includes(lower)) {
         return 'var(--color-light-blue)';
      }
      return match;
  }},
  
  // Replace btn-gold with btn-primary
  { regex: /btn-gold/g, replace: 'btn-primary' },
  { regex: /text-gold/g, replace: 'text-primary' },
  { regex: /text-purple/g, replace: 'text-primary' },

  // Replace specific RGBA for purple/gold
  { regex: /rgba\(\s*59\s*,\s*29\s*,\s*82\s*,\s*0\.95\s*\)/g, replace: 'rgba(103, 199, 242, 0.90)' }, // Purple overlay -> Light blue overlay
  { regex: /rgba\(\s*59\s*,\s*29\s*,\s*82\s*,\s*0\.4\s*\)/g, replace: 'rgba(255, 255, 255, 0.7)' }, // Purple overlay -> White soft
  { regex: /rgba\(\s*59\s*,\s*29\s*,\s*82\s*/g, replace: 'rgba(103, 199, 242' }, 
  { regex: /rgba\(\s*212\s*,\s*175\s*,\s*55\s*/g, replace: 'rgba(103, 199, 242' }, // Gold to light blue
  { regex: /rgba\(\s*82\s*,\s*42\s*,\s*115\s*/g, replace: 'rgba(103, 199, 242' }, // Soft purple to light blue
  { regex: /rgba\(\s*26\s*,\s*11\s*,\s*46\s*/g, replace: 'rgba(103, 199, 242' },
  
  // If there's any background or border styles that use explicit colors
  { regex: /background-color:\s*rgba\([^)]+\)/g, fn: (match) => {
      if (match.includes('212, 175, 55') || match.includes('59, 29, 82')) {
          return 'background-color: var(--color-light-blue)';
      }
      return match;
  }}
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

  // Inject CSS Variables in index.css
  if (file.endsWith('index.css')) {
      newContent = newContent.replace(
        /:root\s*{[^}]*}/, 
        `:root {
  /* Colors */
  --color-white: #FFFFFF;
  --color-light-blue: #67C7F2;
  --color-light-blue-soft: #EAF8FF;
  --color-light-blue-medium: #BDEAFF;
  --color-green: #20B96B;
  --color-green-soft: #E9FAF1;

  --color-primary: var(--color-light-blue);
  --color-primary-light: var(--color-light-blue-medium);
  --color-secondary: var(--color-light-blue-soft);
  --color-accent: var(--color-green);
  --color-accent-hover: #1aa05a;
  --color-whatsapp: var(--color-green);
  --color-whatsapp-hover: #1aa05a;
  --color-bg-main: var(--color-white);
  --color-bg-secondary: var(--color-white);
  --color-text-dark: #333333; /* Dark text for readability */
  --color-text-light: var(--color-white);
  --color-text-muted: #555555;
  --color-border: var(--color-light-blue);

  /* Typography */
  --font-heading: 'Playfair Display', serif;
  --font-body: 'Inter', sans-serif;
  
  /* Layout */
  --container-max-width: 1280px;
  --header-height: 80px;
  --mobile-header-height: 64px;
  
  /* Animations */
  --transition-fast: 0.2s ease;
  --transition-normal: 0.3s ease;
  --transition-slow: 0.5s ease-out;
  
  /* Shadows */
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 12px rgba(103, 199, 242, 0.15);
  --shadow-lg: 0 12px 24px rgba(103, 199, 242, 0.2);
  --shadow-accent: 0 4px 12px rgba(32, 185, 107, 0.2);
}`
      );
  }

  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log("Updated", file);
  }
}
