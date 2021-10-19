const path = require('path');
const { merge } = require('webpack-merge');
const common = require('../../@devops/webpack.lib.config');

module.exports = merge(common, {
    entry: path.resolve(__dirname, './src/export.ts'),
    output: {
        path: path.resolve(__dirname, './lib'),
        filename: 'export.js',
        library: {
            name: '@ambrozy/game',
            type: 'umd',
        },
    },
});
