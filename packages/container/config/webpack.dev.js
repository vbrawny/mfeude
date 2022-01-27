const {merge} = require('webpack-merge'); //used to merge different files of webpack dev+common

//const HtmlWebpackPlugin = require('html-webpack-plugin');

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const commonConfig = require('./webpack.common');

//to refer to package json file
const packageJSON = require('../package.json');

const devConfig = {
    mode:'development',
    devServer:{
        port:8080,
        historyApiFallback: {
            index:'index.html'
        }
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: './public/index.html'
        // }),
        //NR
        new ModuleFederationPlugin({
            name:'container',
            remotes:{
                'marketing':'marketing@http://localhost:8081/remoteEntry.js'
            },
            //shared:['react','react-dom']
            //to refer to package json file dependencies and always takes the latest of it
            shared:packageJSON.dependencies,
        })
    ]
};

module.exports = merge(commonConfig,devConfig); //devConfig will override comonConfig