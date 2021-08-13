// Context，负责接收用户的请求，并委托给 strategy 对象
const Validator = class {
	constructor() {
		this.strategies = null; // 具体策略类
		this.rulusCache = []; // 所有检验规则
	}

	/**
	 * 设置策略
	 * @param {Object} strategy 策略对象
	 */
	setStrategy(strategy) {
		this.strategies = strategy;
	}

	/**
	 * 添加对应添加策略
	 * @param {*} value 检验对象
	 * @param {Array} rules 检验规则
	 */
	add(value, rules) {
		for (const {
				strategy, // 具体规则
				errorMsg, // 具体提示语
				action, // 不通过规则，有无提示语且执行的动作
			} of rules) {
			this.rulusCache.push(() => {
				return this.strategies.getStrategy(strategy)(value, errorMsg, action);
			});
		}
	}

	/**
	 * 批量添加对应添加策略
	 * @param {Object} matchConfig 多个检验配置对象
	 * @param {*} matchConfig.value 检验对象
	 * @param {Array} matchConfig.rules 检验规则
	 */
	batchAdd(matchConfig) {
		for (let match in matchConfig) this.add(match, matchConfig[match]);
	}

	/**
	 * 执行检测
     * @return {Object} 检测结果
	 */
	check() {
		return this.strategies.checkStrategy(this.rulusCache);
	}
};

export default Validator;
