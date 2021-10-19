const { merge } = require('webpack-merge');
const common = require('./webpack.game.config.js');

module.exports = merge(common, {
    mode: 'production',
});
