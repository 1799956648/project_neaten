let commonConfig = require('./webpack_common.config.js');

let {
	merge
} = require('webpack-merge');

let prodConfig = {
	chainWebpack: config => {
		config.optimization.minimizer('terser').tap(options => {
			options[0].terserOptions.compress.drop_console = true;
			return options;
		})
	},

	// optimization: {
	// 	// https://webpack.docschina.org/configuration/optimization/#optimization-minimizer
	// 	minimizer: [
	// 		new TerserPlugin({
	// 			terserOptions: {
	// 				// https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
	// 				compress: {
	// 					// warnings: false,
	// 					drop_console: true,
	// 					// drop_debugger: true,
	// 					// pure_funcs: ['console.log'],
	// 				},
	// 			}
	// 		})
	// 	],
	// },

	/*
		生产环境是否生成 sourceMap 文件
		source map的作用就是定位。source map定位的时浏览器控制台输出语句在项目文件的位置。
		default: true
	*/
	productionSourceMap: false,
};

module.exports = merge(prodConfig, commonConfig);
