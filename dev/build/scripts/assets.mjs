import esbuild from 'esbuild';
import { es5Plugin } from 'esbuild-plugin-es5';
import fs from 'fs';
import path from 'path';
import url from 'url';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
const src = path.join(__dirname, '..', 'get-tsconfig', 'src', 'index.ts');
const dest = path.join(__dirname, '..', '..', '..', 'assets', 'get-tsconfig.cjs');

const _res = await esbuild.build({
  entryPoints: [src],
  bundle: true,
  platform: 'node',
  outfile: dest,
  plugins: [es5Plugin()], // # 1. Use esbuild-plugin-es5
  target: ['es5'], // # 2. Set the target to es5
});

let contents = fs.readFileSync(dest, 'utf8');

contents = contents.split('// Annotate the CommonJS export names for ESM import in node');
contents = contents.slice(0, -1)[0];
contents += `
// Annotate the CommonJS export names for ESM import in 
0 && (module.exports = {
  createFilesMatcher: createFilesMatcher,
  createPathsMatcher: createFilesMatcher,
  getTsconfig: getTsconfig,
  parseTsconfig: parseTsconfig
});
`;
contents = contents.replaceAll('node:', '');
fs.writeFileSync(dest, contents, 'utf8');
