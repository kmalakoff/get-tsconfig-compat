import resolve from '@rollup/plugin-node-resolve';
import externals from 'rollup-plugin-node-externals';
import commonjs from '@rollup/plugin-commonjs';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import Module from "module";

const require = Module.createRequire(import.meta.url);
var input = require.resolve('get-tsconfig');

export default {
  input,
  output: {
    file: 'lib/get-tsconfig.js',
    format: 'cjs',
    exports: 'named',
  },
  plugins: [
    externals({ deps: false, builtinsPrefix: 'strip' }),
    resolve(),
    commonjs(),
    getBabelOutputPlugin({
          presets: [['@babel/preset-env', { modules: 'cjs' }]],
    }),
  ],
};
