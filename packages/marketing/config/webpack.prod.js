//webpack merge to merge webpack.common.js and webpack.prod.js files together into one single file.
const {merge} =  require('webpack-merge');
//Module federation Plugin
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
//get common webpack config reference for common refs
const commonConfig = require('./webpack.common');
// get package json reference for shared modules
const packageJson = require('../package.json');

//ENVIRONMENT VARIABLE WE GET THROUGH CI CD PIPELINE
const domain = process.env.PRODUCTION_DOMAIN;//SETUP THIS PRODUCTION_DOMAIN variable in CI,CD pipeline

const prodConfig = {
 // will cause webpack run differently like optmization and more performant(minimizing)
    mode: 'production',
    output: {
        // cache buster naming convention. to avoid cache issues on js file in browser
        filename:'[name].[contenthash].js',
        publicPath:'/marketing/latest/'
    },
    //plugins
    plugins: [
        new ModuleFederationPlugin({
            name:'marketing',
            filename:'remoteEntry.js',
            exposes: {
                './MarketingApp':'./src/bootstrap'
            },
            shared: packageJson.dependencies
        })
    ]
};

module.exports = merge(commonConfig,prodConfig); //devConfig will override commonConfig