import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import postcss from 'rollup-plugin-postcss';
import {uglify} from 'rollup-plugin-uglify';
const pkg = require("./package.json");


export default {
  input: './src/index.js',
  output: {
    file: './build/bundle.js',
    format: 'umd',
    name: pkg.name,
    sourcemap: true,
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      'prop-types': 'PropTypes'
    },
    targets: [
      {
        dest: './build/bundle.js',
        format: 'umd'
      },
      {
        dest: 'build/bundle.module.js',
        format: 'es'
      }
    ]
  },


  plugins: [
    postcss({
      modules: true
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    resolve(),
    commonjs(),
    uglify()
  ],

  external: ['react', 'react-dom', "prop-types"],
};