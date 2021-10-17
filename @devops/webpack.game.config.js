const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');

const postCss = {
    loader: 'postcss-loader',
    options: {
        postcssOptions: {
            plugins: ['postcss-nested', 'autoprefixer'],
        },
    },
};

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, '../packages/game/index.ts'),
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: 'index.bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader', postCss],
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    // disable type checker - we will use it in fork plugin
                    transpileOnly: true,
                },
            },
            {
                test: /\.(gif|jpg|png|svg)$/,
                type: 'asset/resource',
            },
            {
                test: /\.(shader|glsl)$/,
                type: 'asset/source',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
        }),
        new ESLintPlugin({
            context: path.resolve(__dirname, '../packages'),
            extensions: ['js', 'ts'],
        }),
        new ForkTsCheckerWebpackPlugin(),
    ],
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js', 'scss'],
        alias: {
            '@ambrozy/game': path.resolve(__dirname, '../packages/game'),
            '@ambrozy/train': path.resolve(__dirname, '../packages/train'),
        },
    },
};
