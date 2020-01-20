const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		main: './src/index.js',
	},
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'bundles/[name][contenthash].js'
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
						plugins: ['@babel/plugin-syntax-dynamic-import', 'inline-react-svg']
					}
				}
			},
			{
			test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../'
						}
					},
					'css-loader',
				],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../'
						}
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					},
					'resolve-url-loader',
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					},
				],
			},
			{
				test: /\.(png|svg|jpe?g|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'images/[name].[ext]'
						}
					},
				],
			},
			{
			test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'fonts/[name].[ext]'
						}
					},
				],
			},
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'bundles/main[contenthash].css'
		}),
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			filename: "index.html"
		})
	],
};