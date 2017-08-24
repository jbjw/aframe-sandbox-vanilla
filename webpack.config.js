const webpack = require('webpack');
const path = require('path');
const src = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'dist');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
	entry: {
		app: './src/main.jsx',
	},
	devtool: 'source-map',
	externals: {
		// require("jquery") is external and available
		//  on the global var jQuery
		"aframe": "AFRAME"
	},
	devServer: {
		inline: true,
		// hot: true,
		contentBase: 'dist/',
		host: '0.0.0.0',
		disableHostCheck: true,
		port: 80,
		// historyApiFallback: true,

		// stats: 'errors-only',
		// noInfo: true,
		// watchOptions: {
		//     aggregateTimeout: 300,
		//     poll: 1000,
		//     ignored: /node_modules/
		// }
	},

	output: {
		path: dist,
		// filename: '[name].bundle.js',
		filename: 'bundle.js',
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				include: [src],
				exclude: /node_modules/,
			},
			{
				test: /\.jsx?$/,
				enforce: 'pre',
				loader: 'eslint-loader',
				options: {
					configFile: './.eslintrc',
				},
				include: [src],
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					'style-loader',
					'css-loader',
				],
			},
		]
	},

	plugins: [
		// new webpack.LoaderOptionsPlugin({
		//   minimize: true,
		//   debug: false,
		//   quiet: true
		// }),

		// new webpack.optimize.CommonsChunkPlugin({
		//   name: 'vendor',
		//   minChunks: 2,
		//   filename: 'vendor.bundle.js'
		// }),

		// new webpack.optimize.UglifyJsPlugin({
		//   compress: {
		//     warnings: false,
		//     screw_ie8: true,
		//     unused: true,
		//     dead_code: true,
		//   },
		//   output: {
		//     comments: false
		//   },
		//   sourceMap: false
		// }),

		new CopyWebpackPlugin([
			{
				from: 'src/index.html',
				to: 'index.html'
			}
		]),

		new OpenBrowserPlugin({
			url: 'http://localhost:80/'
		}),

		new webpack.ProvidePlugin({
			// 'THREE': 'three',
			// 'TWEEN': 'tween.js',
		}),
	]
}
