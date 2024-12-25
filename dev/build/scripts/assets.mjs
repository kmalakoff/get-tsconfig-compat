#!/usr/bin/env node

import path from 'path';
import url from 'url';
import spawn from 'cross-spawn-cb';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
const cwd = path.join(__dirname, '..', 'get-tsconfig');
const src = path.join(__dirname, '..', 'get-tsconfig', 'src', 'index.ts');
const dest = path.join(__dirname, '..', '..', '..', 'assets', 'get-tsconfig.js');

function build(callback) {
  const config = path.resolve(__dirname, 'rollup.config.mjs');
  const args = ['rollup', '--config', config, '--input', src, '--file', dest];
  spawn(args[0], args.slice(1), { cwd: cwd, stdio: 'inherit' }, callback);
}

build((err) => {
  !err || console.error(err);
});