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
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
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
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './public/index.html' }),
        new ESLintPlugin({
            context: path.resolve(__dirname, 'src'),
            extensions: ['js', 'ts'],
        }),
        new ForkTsCheckerWebpackPlugin(),
    ],
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js', 'scss'],
    },
};
