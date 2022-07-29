const fs   = require('fs');
const path = require('path');

// Build For GitHub Pages
console.log(new Date().toISOString(), 'Build For GitHub Pages : Start');

const docsDirectoryPath = path.resolve(__dirname, '../docs');
if(fs.existsSync(docsDirectoryPath)) fs.rmdirSync(docsDirectoryPath, { recursive: true });
fs.mkdirSync(docsDirectoryPath);

// ESM
fs.copyFileSync(path.resolve(__dirname, '../esm/index.js'), path.resolve(__dirname, '../docs/esm.js'));
// ESM HTML
const esmHtml = fs.readFileSync(path.resolve(__dirname, '../tests/esm.html'), 'utf-8');
const esmScriptLine = 'import NeosValidator from \'../esm/index.js\';  // Import Neo\'s Validator ESM';
if(!esmHtml.match(esmScriptLine)) throw new Error('The ESM Script Line Not Found');
const esmReplacedHtml = esmHtml.replace(esmScriptLine, 'import NeosValidator from \'./esm.js\';');
fs.writeFileSync(path.resolve(__dirname, '../docs/index.html'), esmReplacedHtml, 'utf-8');

// UMD
fs.copyFileSync(path.resolve(__dirname, '../umd/index.js'), path.resolve(__dirname, '../docs/umd.js'));
// UMD HTML
const umdHtml = fs.readFileSync(path.resolve(__dirname, '../tests/umd.html'), 'utf-8');
const umdScriptLine = '<script src="../umd/index.js"></script>  <!-- Import Neo\'s Validator UMD -->';
if(!umdHtml.match(umdScriptLine)) throw new Error('The UMD Script Line Not Found');
const umdEsmLinkLine = '<a href="./esm.html">';
if(!umdHtml.match(umdEsmLinkLine)) throw new Error('The ESM Link Line Not Found');
const umdReplacedHtml = umdHtml
  .replace(umdScriptLine , '<script src="./umd.js"></script>')
  .replace(umdEsmLinkLine, '<a href="./index.html">');
fs.writeFileSync(path.resolve(__dirname, '../docs/umd.html'), umdReplacedHtml, 'utf-8');

console.log(new Date().toISOString(), 'Build For GitHub Pages : Finished');
