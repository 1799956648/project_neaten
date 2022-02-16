import Vue from 'vue';
import Vuex from 'vuex';
import state from 'store/state';
import getters from 'store/getters';
import mutations from 'store/mutations';
import actions from 'store/actions';
import {
	findFile,
} from 'common/js/utils.js';

Vue.use(Vuex); // 使用 vuex

// 非生产环境
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
	state,

	getters,

	mutations,

	actions,

	// 注册插件
	plugins: debug ? Object
		.values(findFile(require.context('store/plugins', true, /\.js$/), /([a-zA-Z_]+\.js$)/ig))
		.map(fn => fn()) : [],

	// 开启严格模式，使 Vuex store 进入严格模式，在严格模式下，任何 mutation 处理函数以外修改 Vuex state 都会抛出错误。
	// strict: debug,

	// 读取 store/modules 下所有后缀名为js的文件，无视文件嵌套层级
	modules: findFile(require.context('store/modules', true, /\.js$/), /([a-zA-Z_]+\.js$)/ig),
});
