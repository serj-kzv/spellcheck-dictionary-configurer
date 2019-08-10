const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

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
    watchOptions: {
        ignored: ['node_modules', 'opt-app/**/*.*'],
        poll: 500
    }
};

module.exports = (env, argv) => {
    let backgroundPlugins = [...plugins];

    if (argv.mode === 'production') {
        backgroundPlugins.unshift(new CleanWebpackPlugin());
        cfg.optimization = {
            // https://github.com/webpack-contrib/terser-webpack-plugin
            minimizer: [new TerserPlugin({
                sourceMap: false,
                parallel: true,
                cache: true,
                // https://github.com/terser-js/terser#minify-options
                terserOptions: {
                    ecma: 8,
                    compress: {
                        drop_console: true,
                        drop_debugger: true // TODO: find out why it does not work
                    }
                }
            })]
        };
    }

    return [
        {
            entry: './src/background/main.js',
            output: {
                path: distDir,
                filename: 'background/main.js'
            },
            plugins: backgroundPlugins,
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
};