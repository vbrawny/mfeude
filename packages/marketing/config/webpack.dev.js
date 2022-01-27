const {merge} = require('webpack-merge'); //used to merge different files of webpack dev+common

const HtmlWebpackPlugin = require('html-webpack-plugin');

//module federation plugin to integrate the marketing app with container app
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

//reference to common config file to get it integrated.
const commonConfig = require('./webpack.common');

const packageJSON = require('../package.json');

const devConfig = {
    mode:'development',
    devServer:{
        port:8081,
        historyApiFallback: {
            index:'index.html'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        //NFE
        new ModuleFederationPlugin({
            name:'marketing',
            filename:'remoteEntry.js',
            exposes: {
                './MarketingApp':'./src/bootstrap'
            },
            // shared:{
               
            // }
            //shared:['react','react-dom']
            shared:packageJSON.dependencies
        })

    ]
};

module.exports = merge(commonConfig,devConfig); //devConfig will override comonConfig