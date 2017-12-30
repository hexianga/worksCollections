let htmlWebpackPlugin = require("html-webpack-plugin");
let path = require("path");
let webpack = require("webpack");

module.exports={
    entry:[
        "./src/script/app.js",
    ],
    output:{
        path:__dirname+"/dist/",
        filename:"js/[name].js",
        publicPath:"/"
    },
    devServer:{
        historyApiFallback:true,
        hot:true,
        port:8086
    },
    module:{
        rules:[
            {
                test:/\.jsx?$/,
                include:path.resolve(__dirname,"src"),
                exclude:path.resolve(__dirname,"node_modules"),
                use:{
                    loader:"babel-loader",
                    options:{
                        "presets":[
                            "env",
                            "react"
                        ],
                    }
                }
            },
            {
                test:/\.css$/,
                use:[
                    "style-loader",
                    "css-loader",
                    "postcss-loader",
                ]
            },
            {
                test:/\.less$/,
                use:[
                    "style-loader",
                    "css-loader",
                    "postcss-loader",
                    "less-loader"
                ]
            },
            {
                test:/\.html$/,
                use:[
                    "html-loader"
                ]
            },
            {
                test:/\.jpg|png|svg|gif/i,
                use:{
                    loader:"file-loader",
                    options:{
                        name:"image/[name]-[hash:5].[ext]",
                    }
                }
            }
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            filename:"index.html",
            template:"index.html",
            inject:"body"
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
}

