import commonFun from 'common/js/common_fun.js';

let {
	$showToast
} = commonFun;

/**
 * AOP工厂
 */
const AopFactory = class {
	constructor() {
		// 代理对象
		this.target = null;
		this.beforeFn = null; // before增强方法
		this.afterFn = null; // after增强方法
	}

	setProxyTarget(target) { // 设置代理对象
		this.target = target;
		return this;
	}

	/**
	 * 增强方法 before
	 */
	before(beforeFn) {
		this.beforeFn = beforeFn;
		let beforeResult = beforeFn();

		if (beforeResult.isPass) {
			this.target?.();
		} else {
			if (beforeResult.errorMsg) {
				$showToast(beforeResult.errorMsg);
			} else {
				beforeResult.action?.();
			}
		};
		return this;
	}

	/**
	 * 增强方法 after
	 */
	after(afterFn) {
		/* 
			两种执行方法
				1. 
					before
					target
					after
				2. 
					target
					after
		 */
		
		// 没有代理对象
		if (!this.target) return this;
		
		this.target();
		console.log('target执行了');
		
		this.afterFn = afterFn;
		afterFn();
		console.log('after执行了');
		return this;
	}
};

export default AopFactory;
