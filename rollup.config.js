// source: https://github.com/rollup/rollup-starter-app

import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import {terser} from 'rollup-plugin-terser';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default [
    {
        input: 'src/content_script/main.js',
        output: {
            file: 'dist/content_script/main.js',
            format: 'iife', // immediately-invoked function expression — suitable for <script> tags
            sourcemap: false
        },
        plugins: [
            production && terser() // minify, but only in production
        ]
    },
    {
        input: 'src/background/main.js',
        output: {
            file: 'dist/background/main.js',
            format: 'iife', // immediately-invoked function expression — suitable for <script> tags
            sourcemap: false
        },
        plugins: [
            production && terser() // minify, but only in production
        ]
    }
];