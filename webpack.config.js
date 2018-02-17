const path = require('path');

// Plugins
const HTMLPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Sources
const PATH_SRC = path.resolve(__dirname, 'src');
const PATH_DIST = path.resolve(__dirname, 'dist');


const extractCSS = new ExtractTextPlugin('[name]');


module.exports = {
    entry: {
        'bundle.js': [
            path.join(PATH_SRC, 'index'),
            'react-hot-loader/patch'
        ],
        'css/app.css': path.join(PATH_SRC, 'styles/app.scss')
    },

    output: {
        filename: '[name]',
        path: PATH_DIST
    },

    module: {
        rules: [
            // JS & Babel
            {
                test: /.js?$/,
                enforce: 'pre',
                include: [
                    PATH_SRC
                ],
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ],
                loader: 'babel-loader'
            },

            // SASS Compiling
            {
                test: /.scss$/,
                loader: extractCSS.extract(['css-loader', 'sass-loader'])
            }
        ]
    },

    resolve: {
        extensions: ['.json', '.js', '.jsx', '.css'],
        alias: {
            'actions': path.join(PATH_SRC, 'actions'),
            'constants': path.join(PATH_SRC, 'constants'),
            'components': path.join(PATH_SRC, 'components'),
            'containers': path.join(PATH_SRC, 'containers'),
            'router': path.join(PATH_SRC, 'router'),
            'reducers': path.join(PATH_SRC, 'reducers'),
            'store': path.join(PATH_SRC, 'store'),
            'lib': path.join(PATH_SRC, 'lib')
        }
    },

    // Dev server
    devtool: 'source-map',
    devServer: {
        contentBase: PATH_DIST,
        publicPath: '/',
        hot: true,
        inline: true
    },

    plugins: [
        // Automatically generate a HTML file with resources
        new HTMLPlugin({
            template: path.join(PATH_SRC, 'index.html')
        }),
        // Copy map data
        new CopyPlugin([
            {from: path.join(__dirname, 'data'), to: 'data'}
        ]),
        extractCSS
    ]
};
