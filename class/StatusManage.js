/**
 * 状态管理
 */
const StatusManage = class {
	constructor() {}
	execute(statusTask, ajaxData){
		const curExe = ajaxData.status; // 当前状态
		
		// 不存在执行默认
		if (!(Reflect.has(statusTask, curExe))) {
			statusTask.default?.(ajaxData);
			return;
		};
		
		// 存在执行对应状态码
		statusTask[curExe]?.(ajaxData);
	}
};


export default StatusManage;