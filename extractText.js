// extractStrings.js
const fs = require('fs');
const path = require('path');
const babelParser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const rootDir = path.resolve('src'); // ajustalo si tus archivos están en otra carpeta
const collectedStrings = new Set();

// Lista de atributos que NO deben considerarse texto traducible
const ignoredJSXAttributes = new Set([
  'className',
  'id',
  'key',
  'src',
  'href',
  'alt',
  'title',
  'type',
  'rel',
  'style',
  'data-testid',
]);

function extractStringsFromFile(filePath) {
  const code = fs.readFileSync(filePath, 'utf-8');
  let ast;
  try {
    ast = babelParser.parse(code, {
      sourceType: 'module',
      plugins: [
        'typescript',
        'jsx',
        'classProperties',
        'optionalChaining',
        'nullishCoalescingOperator',
      ],
    });
  } catch (e) {
    console.error(`Error parsing ${filePath}: ${e.message}`);
    return;
  }

  traverse(ast, {
    // Extraer texto plano dentro de JSX: <p>Hola</p>
    JSXText(path) {
      const text = path.node.value.trim();
      if (text && text.length > 1 && /\w/.test(text)) {
        collectedStrings.add(text);
      }
    },

    // Extraer string literals normales, pero ignorar los usados en atributos no traducibles
    StringLiteral(path) {
      const { node, parent } = path;

      // Ignorar si es parte de un import/export
      if (
        parent.type === 'ImportDeclaration' ||
        parent.type === 'ExportNamedDeclaration' ||
        parent.type === 'ExportAllDeclaration'
      ) return;

      // Ignorar si es un atributo JSX del tipo className="..."
      if (
        parent.type === 'JSXAttribute' &&
        parent.name &&
        ignoredJSXAttributes.has(parent.name.name)
      ) return;

      const value = node.value.trim();
      if (value && value.length > 1 && /\w/.test(value)) {
        collectedStrings.add(value);
      }
    },
  });
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (extensions.includes(path.extname(file))) {
      extractStringsFromFile(fullPath);
    }
  });
}

walkDir(rootDir);

// Guardar resultado
const outputFile = path.resolve('extracted_strings.txt');
fs.writeFileSync(outputFile, Array.from(collectedStrings).sort().join('\n'), 'utf8');
console.log(`✅ Strings extraídos guardados en: ${outputFile}`);
