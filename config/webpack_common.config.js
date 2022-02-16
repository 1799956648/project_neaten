const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	configureWebpack: config => ({
		resolve: {
			alias: { // 路径别名
				'common': '@/common', // 公用方法
				'components': '@/components', // 组件
				'config': '@/config', // 配置文件
				'pages': '@/pages', // 页面文件
				'static': '@/static', // 静态资源
				'mixins': '@/common/mixins', // 公用混入
				'api': '@/common/api', // api别名
				'store': '@/store', // vuex目录别名
				// 'router': '@/router', // 路由
				// 'plugins': '@/plugins', // 插件配置
			}
		},
	}),
};
