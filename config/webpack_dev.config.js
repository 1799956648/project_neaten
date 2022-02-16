let commonConfig = require('./webpack_common.config.js');

let {
	merge
} = require('webpack-merge');

let devConfig = {
	css: {
		/*
			是否使用css分离插件 ExtractTextPlugin，css.extract 用于控制是否强制分离 vue 组件内的css
				开启css.extract后，打包的结果会多出一个 css 文件夹以及css 文件。并通过被页面通过 link 的形式引入
				没有开启，组件样式以内部样式表的形式加载的
		*/ 
		extract: false, 
		sourceMap: true // 开启 CSS source maps
	},
};

module.exports = merge(devConfig, commonConfig);
