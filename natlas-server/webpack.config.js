/* eslint-env node */
const path = require('path');
const WebpackManifestPlugin = require('webpack-yam-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const assetRootPath = path.resolve(__dirname, 'app', 'static');

const config = {
	devtool: 'eval-source-map',
	entry: path.resolve(assetRootPath, 'natlas.js'),
	module: {
		rules: [
			{
				parser: {
					amd: false
				}
			},
			{
				exclude: /node_modules/,
				test: /\.tsx?$/,
				use: 'ts-loader'
			},
			{
				test: /\.(sass|scss|css)$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(svg|eot|woff|woff2|ttf)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					'file-loader?publicPath=/static/dist'
				]
			}
		]
	},
	output: {
		filename: '[name].js',
		path: path.resolve(assetRootPath, 'dist')
	},
	plugins: [
		new MiniCssExtractPlugin(),
		new WebpackManifestPlugin({
			manifestPath: path.resolve(assetRootPath, 'dist', 'webpack_manifest.json'),
			outputRoot: assetRootPath
		})
	],
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
		modules: [
			'static',
			'node_modules'
		]
	},
	watch: true,
	watchOptions: {
		aggregateTimeout: 200,
		ignored: [
			'node_modules/**'
		],
		poll: 1000
	}
};

module.exports = config;
