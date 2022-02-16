const config = {
	development: { // 开发环境
		path: './config/webpack_dev.config.js',
	},
	production: { // 生产环境
		path: './config/webpack_prod.config.js',
	},
	default: { // 默认环境
		path: './config/webpack_common.config.js',
	},
};

const TerserPlugin = require('terser-webpack-plugin');

// 读取对应环境webpack配置
const getWebpackConfig = function() {
	let nowEnv = process.env.NODE_ENV;

	return Reflect.has(config, nowEnv) ? require(config[nowEnv].path) : require(config.default.path);
};

module.exports = getWebpackConfig();
