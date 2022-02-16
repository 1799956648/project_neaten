import {
	CHANGE_SYS_CONFIG,
	CHANGE_YRAN_CONFIG_UNIT,
} from './mutations_type.js';

import {
	UPDATE_SYS_CONFIG,
} from './actions_type.js';

import ArchiveApi from 'api/ArchiveApi.js';

export default {
	// 更新系统设置
	async [UPDATE_SYS_CONFIG]({
		commit
	}) {
		let sysConfig = await ArchiveApi.sysConfig().catch();
		let configData = sysConfig?.data?.config ?? {};
		
		commit(CHANGE_SYS_CONFIG, { // 提交更新系统设置同步事件
			sysConfig: configData,
		});
		commit(CHANGE_YRAN_CONFIG_UNIT, { // 提交更新系统设置纱线单位同步事件
			sxSysConfigUnit: configData.sxdw || '粒',
		})
	},
}
