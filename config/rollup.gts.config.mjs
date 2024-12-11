import path from 'path';
import url from 'url';
import resolve from '@rollup/plugin-node-resolve';
import externals from 'rollup-plugin-node-externals';
import commonjs from '@rollup/plugin-commonjs';
import { swc } from 'ts-swc-rollup-plugin';
// import { getBabelOutputPlugin } from '@rollup/plugin-babel';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

export default {
  input: path.resolve(__dirname, '..', 'src', 'index.ts'),
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    exports: 'named',
  },
  plugins: [
    externals({ deps: false, builtinsPrefix: 'strip' }),
    resolve(),
    commonjs(),
    swc({ cwd: __dirname })
    // getBabelOutputPlugin({
    //   presets: [['@babel/preset-env', { modules: 'cjs' }]],
    // }),
  ],
};
