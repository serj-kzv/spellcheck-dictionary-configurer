const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const distDir = path.resolve(__dirname, 'dist');
const srcDir = path.resolve(__dirname, 'src');
const plugins = [
    new CopyWebpackPlugin(
        [
            {
                from: '**/!(*.js)',
                to: distDir,
                context: srcDir,
                ignore: ['opt-app/**']
            }
        ],
        {
            copyUnmodified: false
        }
    )
];
const cfg = {
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },
    node: {fs: 'empty'},
    // devtool: options.devtool,
    target: 'web', // Make web variables accessible to webpack, e.g. window
    // performance: options.performance || {},
    // optimization: {
    //     minimize: false
    // }
};

module.exports = (env, argv) => [
    {
        entry: './src/background/main.js',
        output: {
            path: distDir,
            filename: 'background/main.js'
        },
        plugins: [new CleanWebpackPlugin(), ...plugins],
        ...cfg
    },
    {
        entry: './src/content/main.js',
        output: {
            path: distDir,
            filename: 'content/main.js'
        },
        plugins,
        ...cfg
    }
];