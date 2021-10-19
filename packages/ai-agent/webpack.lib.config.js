const path = require('path');
const { merge } = require('webpack-merge');
const common = require('../../@devops/webpack.lib.config');

module.exports = merge(common, {
    entry: path.resolve(__dirname, './src/index.ts'),
    output: {
        path: path.resolve(__dirname, './lib'),
        filename: 'index.js',
        library: {
            name: '@ambrozy/ai-agent',
            type: 'umd',
        },
    },
});
