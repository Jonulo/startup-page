const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    resolve: {
        extensions: ['.js'],
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCSSExtractPlugin.loader,
                    },
                    'css-loader'
                ]
            },
            {
              test: /\.scss$/,
              use: [
                  {
                      loader: MiniCSSExtractPlugin.loader,
                  },
                  'css-loader',
                  'sass-loader'
              ]
          },
            {
                test: /\.js?$/,
                use: {
                    loader: 'babel-loader',
                },
                exclude: /node_modules/,
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCSSExtractPlugin ({
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].css'
        }),
        new HtmlWebpackPlugin(
            {
                inject: true,
                template: './public/index.html',
                filename: './index.html',
            }
        )
    ]
}