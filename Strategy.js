const Strategy = class {
	constructor(arg) {
		this.strategy = {}; // 存储具体策略
	}

	/**
	 * 对外开放批量扩展新策略的接口
	 * @param {Object} rules 一个或多个策略规则
	 */
	batchAddStrategy(rules) {
		for (let key in rules) this.addStrategy(key, rules[key]);
	}

	/**
	 * 对外开放扩展新策略的接口
	 * @param {String} name 策略名称
	 * @param {Function} fn 策略具体实现
	 */
	addStrategy(name, fn) {
		this.strategy[name] = fn;
	}

	/**
	 * 对外提供查看内部策略的接口 
	 * @param {String} type 存在值返回对应策略，不存在值返回全部策略
     * @return {Object} 对应策略
	 */
	getStrategy(type) {
		if (!this.strategy[type]) throw new Error('没有对应策略');
		return type ? this.strategy[type] : this.strategy;
	}

	/**
	 * 执行策略结果
	 * @param {Array} rulus 策略规则
	 * @return {Object} 约束结果
	 */
	checkStrategy(rulus) {
		// 检查约束
		for (const validator of rulus) {
			let executeResult = validator();
			if (executeResult) {
				return {
					action: executeResult.action,
					errorMsg: executeResult.errorMsg,
					isPass: false
				};
			};
		};

		// 约束都通过
		return {
			errorMsg: '',
			isPass: true
		}
	}
}

export default Strategy;
