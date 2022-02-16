/**
 * @description 通过 生成配置形式的对象，消除业务中的条件判断语句，提高可扩展可维护性
 */
const Strategy = class {
	constructor() {
		this.strategy = {}; // 存储具体策略
	}

	/**
	 * @description 对外开放批量扩展新策略的接口
	 * @param {Object} rules 一个或多个策略规则
     * @example
     * const rules = {
            userIsEmpty: (value, errorMsg, action) => { // 用户为空
                if (!value) return { errorMsg, action };
            },
            passwordIsEmpty: (value, errorMsg, action) => { // 密码为空
                if (!value) return { errorMsg, action };
            },
        };
         strategy.batchAddStrategy(rules);
	 */
	batchAddStrategy(rules) {
		for (let key in rules) this.addStrategy(key, rules[key]);
	}

	/**
	 * @description 对外开放扩展新策略的接口
	 * @param {String} name 策略名称
	 * @param {Function} fn 策略具体实现
     * @example
     * strategy.addStrategy('userIsEmpty', (value, errorMsg, action) => { // 用户为空
            if (!value) return { errorMsg, action };
       })
	 */
	addStrategy(name, fn) {
		this.strategy[name] = fn;
	}

	/**
	 * @description 对外提供查看内部策略的接口
	 * @param {String} type 存在值返回对应策略，不存在值返回全部策略
     * @return {Object} 对应策略
     * @example
     * strategy.getStrategy('userIsEmpty')
	 */
	getStrategy(type) {
		if (!(Object.keys(this.strategy).length) && !this.strategy[type]) throw new Error('没有对应策略');
		return type ? this.strategy[type] : this.strategy;
	}

	/**
	 * @description 执行策略结果
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

module.exports = Strategy;

// export default Strategy;
