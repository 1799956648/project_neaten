import commonFun from 'common/js/common_fun.js';

let {
	$showToast
} = commonFun;

/**
 * @description AOP工厂，通过 动态添加职责，解耦业务逻辑
 */
const AopFactory = class {
    constructor() {
        this.target = null; // 代理对象
        this.beforeFn = null; // before增强方法
        this.afterFn = null; // after增强方法
    }

    /**
     * @description 设置代理对象
     * @param {Function} target 代理对象
     * @returns {Object} 实例对象
     */
    setProxyTarget(target) {
        this.target = target;
        return this;
    }

    /**
     * @description 增强方法 before
     * @param {Function} beforeFn 动态到代理函数之前的函数
     * @returns {Object} 实例对象
     */
    before(beforeFn) {
        this.beforeFn = beforeFn;
        const beforeResult = beforeFn();

        if (beforeResult.isPass) {
            this.target();
        } else {
            if (beforeResult.errorMsg) {
                $showToast(beforeResult.errorMsg);
            };
            beforeResult.action();
        };
        return this;
    }

    /**
     * @description 增强方法 after
     * @param {Function} afterFn 动态到代理函数之后的函数
     * @returns {Object} 实例对象
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

        this.afterFn = afterFn;

        this.target();

        afterFn();

        return this;
    }
};

export default AopFactory;