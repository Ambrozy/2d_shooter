const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.game.config.js');

module.exports = merge(common, {
    entry: path.resolve(__dirname, '../packages/train/index.ts'),
});
