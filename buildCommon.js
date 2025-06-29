// buildCommon.js
const fs = require('fs');
const path = require('path');

const lines = fs.readFileSync('extracted_strings.txt', 'utf-8')
  .split('\n')
  .filter(line => {
    line = line.trim();
    // filtrá líneas irrelevantes: variables, urls, clases, keys, etc.
    if (!line) return false;
    if (line.match(/^[@#/%*0-9A-Za-z_-]+$/)) return false;
    if (line.includes('http') || line.includes('bg-') || line.includes('className') || line.includes('ID') || line.startsWith('use') || line.startsWith('Icon')) return false;
    return true;
  });

const obj = {};
lines.forEach(line => obj[line] = line);

fs.writeFileSync(
  path.resolve('src/locales/en/common.json'),
  JSON.stringify(obj, null, 2),
  'utf-8'
);

console.log(`✅ common.json generado con ${lines.length} claves.`);
