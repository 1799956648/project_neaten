export default function(store) {
	return require('vuex/dist/logger')({

		collapsed: false, // 是否折叠显示提交记录日志

		filter(mutation, stateBefore, stateAfter) {
			/*
				若 mutation 需要被记录，就让它返回 true 即可
				mutation 是个 { type, payload } 对象
			*/
		   
			return true;
		},

		actionFilter(action, state) {
			/*
				若 action 需要被记录，就让它返回 true 即可
				action 的格式是 { type, payload }
			*/

			return true;
		},

		transformer(state) {
			/*
				在开始记录之前转换状态
				返回日志需要记录的数据
			*/

			return state;
		},

		mutationTransformer(mutation) {
			/*
				在开始记录之前转换状态
				mutation 按照 { type, payload } 格式记录
				我们可以按任意方式格式化
			*/

			// 显示提交的同步事件类型
			return mutation.type;
		},

		actionTransformer(action) {
			/*
				在开始记录之前转换状态
				和 mutationTransformer 一样，但是是针对 action 的
			*/

			// 显示提交的异步事件类型
			return action.type;
		},

		logActions: false, // 记录 action 日志

		logMutations: false, // 记录 mutation 日志

		logger: console, // 自定义 console 实现，默认为 console
	});
};
