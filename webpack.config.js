
"use strict";

const path = require("path");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: './main.js',
    output: {
        path: path.resolve(__dirname, 'build'),
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'build')
    },
    devtool: 'source-map',
    resolve: {
        extensions: [".ts", ".js"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: false
        }),
        new CopyWebpackPlugin({
            patterns: [
                "**/*.css",
                "**/*.svg",
                "**/*.png",
                "directives/*.html",
                "serviceworker.js",
                "electron-*.js",
                "../package.json",
                "manifest.json",
                "manifest.webapp",
                "webapp.manifest.json"
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.(j|t)s$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            }
        ]
    }
};