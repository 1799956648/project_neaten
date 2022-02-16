import {
	CHANGE_SYS_CONFIG,
	CHANGE_AUTHORITY,
	CHANGE_YRAN_CONFIG_UNIT,
} from './mutations_type.js';

import Vue from 'vue';

let vueInstance = new Vue();

export default {
	// 更新系统设置
	[CHANGE_SYS_CONFIG](state, {
		sysConfig
	}) {
		state.sysConfig = sysConfig;
		vueInstance.$setItem('config_info', sysConfig);
	},

	// 更新权限列表（对象形式）
	[CHANGE_AUTHORITY](state, authority) {
		state.authority = authority.reduce((auth, authItem) => {
			auth[authItem.name] = authItem;
			return auth;
		}, {});
	},

	[CHANGE_YRAN_CONFIG_UNIT](state, {
		sxSysConfigUnit
	}) {
		state.sxSysConfigUnit = sxSysConfigUnit;
	}
}
