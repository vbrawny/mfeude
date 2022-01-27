module.exports = {
    module :{
        rules :[
            //loaders
            {
                test: /\.m?js$/, //check for mjs or js files
                exclude: /node_modules/, //exclude node_modules folder
                use: {
                    loader:'babel-loader',
                    options:{
                        //babel 
                        //@babel/preset-react - will process react code
                        //@babel/preset-env - will use to convert high version of js to the base version es5 likely.
                        presets: ['@babel/preset-react','@babel/preset-env'],
                        //@babel/plugin-transform-runtime - is like a runtime similar to java / .net runtime.async/await
                        plugins:['@babel/plugin-transform-runtime']
                    }
                }
            }
        ]
    }
}