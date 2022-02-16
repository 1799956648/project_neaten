/**
 * @desc 判断两个对象是否相等（数据结构相同即返回true）
 * @desc isObjEquals :: (Object|Array) -> Boolean
 * @param {Object | Array} obj1 - [], {} 比较目标
 * @param {Object | Array} obj2 - [], {} 比较目标
 * @returns {Boolean} 是否相等
 * @example 
 * isObjEquals({a: 1}, {a: 1}) -> true
 */
export function isObjEquals(obj1, obj2) {
    if (typeof obj1 === 'undefined' || typeof obj2 === 'undefined') {
        return (obj1 == obj2) ? true : false;
    }
    if (typeof obj1 === 'string' || typeof obj2 === 'string') {
        return (obj1 == obj2) ? true : false;
    }
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
        return false;
    }

    if (Array.isArray(obj1) && Array.isArray(obj2) && obj1.length !== obj2.length) {
        return false;
    }

    function jsonCompare(json1, json2) {
        if (typeof json1 !== 'object' || typeof json2 !== 'object') {
            return false;
        }
        for (let i in json1) {
            if (Array.isArray(json1[i]) || typeof json1[i] === 'object') {
                if (!isObjEquals(json1[i], json2[i])) {
                    return false;
                }
            } else {
                if (json1[i] !== json2[i]) {
                    return false;
                }
            }
        }
        return true;
    }

    if (jsonCompare(obj1, obj2) && jsonCompare(obj2, obj1)) {
        return true;
    } else {
        return false;
    }
};

/**
 * @desc 当前是否是函数
 * @param {*} target - 检测对象
 * @returns {Boolean} 是否是函数
 * @example
 * isFunction(() => {}) -> true
 * isFunction(1) -> false
 */
export const isFunction = target => typeof target === 'function';

 /**
  * @desc 当前是否是对象
  * @param {*} target - 检测对象
  * @returns {Boolean} 是否是对象
  * @example
  * isObject({}) -> true
  * isObject([]) -> false
  */
export const isObject = values => (values && typeof values === 'object');

/**
 * @desc 根据分隔符拼接多个字段的值
 * @desc formatStr :: (Object, Array, String, String) -> String
 * @param {Object} data - 数据源
 * @param {Array} filedList - 需要拼接的字段
 * @param {String} initial - 初始值
 * @param {String} separator - 拼接字符
 * @returns {String} 拼接后的字符串
 * @example
 * formatStr({a: 1}, {b: 2}, ['a', 'b'], '', ' ') -> '1 2'
 */
export const formatStr = function (data, filedList, initial = '', separator = ' ') {
    return (filedList.reduce((initial, filed) => {
        return (initial += (data[filed] || '') + separator, initial);
    }, initial)).trim();
};

/**
 * @desc JSON字符串对象 转换为 JSON 对象
 * @desc jsonToObject :: String -> Object
 * @param {Object|String} json 
 * @returns {Object}
 * @example
 * jsonToObject('{}') -> {}
 */
export const jsonToObject = function (json) {
    return typeof json === 'object' ? json : JSON.parse(json);
};

/**
 * @desc JSON对象 转换为 JSON字符串对象
 * @desc jsonToString :: Object -> String
 * @param {Object|String} json 
 * @returns {String}
 * @example
 * jsonToString({}) -> '{}'
 */
export const jsonToString = function (json) {
    return typeof json === 'object' ? JSON.stringify(json) : json;
};

/**
 * 统计目标字符串出现的次数
 * computedStrCount :: (String, String) -> Number
 * @param {String} matchTarget - 数据对象
 * @param {String} target 匹配目标
 * @returns {Number} 目标字符串出现次数
 * 
 * @example
 * computedStrCount('asda', 'a') -> 2
 */
export const computedStrCount = function (matchTarget, target) {
    return matchTarget.split(target).length - 1;
};

/**
 * @desc 通过配置的形式创建函数
 * @desc createFunction :: () -> Function
 * @param {Object} object 数据对象
 * @param {String} target 匹配目标
 * @returns {Function} 目标字符串出现次数
 */
export const createFunction = (function () {
    const R = require('ramda').default;
    return function ({
        cacheArgs,
        args,
        functionBody
    }) {
        // 参数完整的情况下，不柯里化该函数
        return Object.keys(cacheArgs).length < computedStrCount(functionBody, args)
            ?
            R.curry(new Function(args, functionBody))
            : new Function(args, functionBody);
    };
})();

/**
 * 根据字段配置对象合成数据（兼容字段不对等的情况）
 * compositeDataByObject :: (Object, Object) -> Object
 * @param {Object} fieldsConfig 字段配置
 * @param {Object} dataSource 数据源
 * @return {Object} 转换后的对象
 * @example 
 * 	compositeDataByObject({ cp_ys_id: 'id' }, { id: 3 })
 * 	{ cp_ys_id: 3}
 */
export const compositeDataByObject = function (fieldsConfig, dataSource) {
    return Object
        .entries(fieldsConfig)
        .reduce((data, [clinetKey, interfaceKey]) => {
            data[clinetKey] = dataSource[interfaceKey];
            return data;
        }, {});
};

/**
 * 根据字段配置列表合成数据（两个接口字段对等）
 * compositeDataByList :: (Array, Object) -> Object
 * @param {Array} filedsList 字段配置
 * @param {Object} dataSource 数据源
 * @return {Object} 转换后的对象
 * @example 
 * 	compositeDataByList(['cp_ys_bh', 'cp_ys_id'], { cp_ys_bh: '1', cp_ys_id: 2 })
 * 	{ cp_ys_bh: 1, cp_ys_id: 2}
 */
export const compositeDataByList = function (filedsList, dataSource) {
    return filedsList.reduce((saveData, key) => (saveData[key] = dataSource[key] || '', saveData), {});
};

/**
 * 切割对应列表数据，修改原数组，返回切割的列表
 * splitListByCount :: (Number, Array) -> Array
 * @param {Number} count 切割个数
 * @param {Array} list 数据源
 * 
 * @example
 * splitListByCount([1,2,3,4], 2) -> [1,2]（原数组 list = [3, 4]）
 */
export const splitListByCount = function (count = 8, list) {
    return list.splice(0, count);
};

/**
 * 往列表添加数据
 * pushDataFromList :: (Array, Array) -> Array
 * @param {Object} data 添加的数据
 * @param {Object} list 要添加的列表
 */
export const pushDataFromList = function (data, list) {
    list.push(...data);
};

/**
 * 根据配置返回最先通过的选项（优先级）
 * getPriorityByConfig :: Array -> (String | Undefined)
 * @param {Object} config
 * @returns {String|Undefined} 找到返回匹配项，反之返回 undefined
 */
export const getPriorityByConfig = function (config) {
    for (const item of config) {
        const [key, value] = Object.entries(item).flat(Infinity);
        if (value) return key;
    };
    return undefined;
};

/**
 * 位数不够补0
 * zeroCompletion :: [String|Number] -> [String|Number]
 * @param {Number|String} num
 * @return {Number} 补全后的值
 * @example
 * zeroCompletion(2) -> 02
 */
export const zeroCompletion = function (num) {
    num = Number(num);
    if (String(num).length === 1 && num !== 0) {
        return '0' + num;
    }
    return num;
};

// 是否为真
export const $isTrue = function (value) {
    if (Object.is(value, NaN)) return false;
    if (value === true || (typeof value === 'number' && value != 0)) {
        return true;
    } else if (value === '' || Number(value) === 0 || (Object.prototype.toString.call(value) == '[object Array]' &&
        !
        value.length) || JSON.stringify(value) == '{}' || typeof value === 'undefined' || value ===
        'undefined' || value ===
        'null' || value === null) {
        return false;
    }
    return true;
};


// 判断是否为假:  '0',0,false,null,undefined,'',{},[]
export const $isEmpty = function (value) {
    if (Object.is(value, NaN)) return true;
    if (value === true || (typeof value === 'number' && value != 0)) {
        return false;
    } else if (value === '' || Number(value) === 0 || (Object.prototype.toString.call(value) == '[object Array]' &&
        !
        value.length) || JSON.stringify(value) == '{}' || typeof value === 'undefined' || value ==
        'undefined' || value ==
        'null' || value == null) {
        return true;
    }
    return false;
};

/**
 * @description 值不存在则返回空
 * @param {*} params 判断参数
 * @param {*} default_value 默认值
 * @return {*} 返回处理结果
 */
export const $isValue = function (params, default_value) {
    if ((params === 0) || (params === '0')) {
        return 0;
    } else if (!params) {
        return ((default_value !== undefined) ? default_value : "");
    }
    return params;
};

/**
 * @desc 小数位数保留
 * @desc fun.numberToFixed :: (Number, Number) -> Number
 * @param {Number} num - 值
 * @param {Number} fixed - 固定位数
 * @return {Number} 固定后的值
 * @example
 * numberToFixed(10.1234, 2) -> 10.12
 */
export const numberToFixed = (num, fixed) => Number.parseFloat((Number(num) || 0).toFixed(fixed));

/**
 * @desc 查找文件
 * @desc findFile :: (Object, Object) => Object
 * @param {Object} requireContext - 上下文对象
 * @param {Object} filter - 过滤匹配文件规则
 * @returns {Object} 匹配目录下的文件（键值对形式）
 * @example
 * findFile(require.context('store/modules', true, /\.js$/), /([a-zA-Z_]+\.js$)/ig)
 */
export const findFile = function (requireContext, filter) {
    const modules = {};

    for (const fileName of requireContext.keys()) {
        modules[fileName.match(filter).join('').split('.')[0]] = requireContext(fileName).default;
    };

    return modules;
};

/**
 * @desc 睡眠函数
 * @desc sleep :: (String|Number) -> Object
 * @param {String|Number} ms - 毫秒值
 * @returns {Object} 暂停的 promise 对象
 * @example 
 * sleep(1000)
 */
export const sleep = function (ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
};

/**
 * @desc 修改目标对象，源对象的自身属性对应的值 覆盖 目标对象的自身属性对应的值，返回目标对象
 * @desc mergeRight :: (Object, Object) -> Object
 * @param {Object} - target 
 * @param {Object} - sources
 * @returns {Object} 目标对象
 * @example
 * mergeRight(
 * 	{ a: '新的值a1', c: { d: 5 }, e: [{ a: 2 }], h: [1, 2, 3] },
 * 	{ a: 1, c: { d: 4 }, e: [{ a: 1 }], h: [4, 5, 6] }
 * )
 * -> { a: '新的值a1', c: { d: 5 }, e: [{ a: 2 }], h: [1, 2, 3] } === target (true)
 */
export const mergeRight = function (target, sources) {
    const isObject = values => (values && typeof values === 'object');

    (function loop(target, sources) {
        if (isObject(sources)) { // 复杂数据类型才可遍历

            // 只针对父结构为对象的情况
            for (const key in sources) {
                const sourcesValues = sources[key];
                const targetValue = target[key];

                // 当前结构为复杂数据类型
                if (isObject(sourcesValues)) {
                    if (Array.isArray(sourcesValues)) {
                        // 当前为数组，检测子项是否为对象或基本数据类型，做对应逻辑（不处理子结构为数组的情况）
                        sourcesValues.map((sourcesValuesItem, sourcesValuesItemIdx) => {
                            if (isObject(sourcesValuesItem)) {
                                loop(targetValue[sourcesValuesItemIdx], sourcesValuesItem);
                            } else {
                                targetValue[sourcesValuesItemIdx] = sourcesValuesItem;
                            };
                        });

                    } else {
                        // 当前为对象，递归向左修改
                        loop(targetValue, sourcesValues);
                    }
                } else {
                    // 当前为基本数据类型，直接向左修改
                    target[key] = sourcesValues;
                };
            };

        };
    })(target, sources);

    return target;
};

/**
 * @desc 根据 键值获取 需要的 字段值
 * @desc getValByKey :: (Array, (String|Number), String, String) -> (String|Number)
 * @param {Array} arr - 一个或多个对象组成的循环列表
 * @param {String|Number} value - 匹配的值
 * @param {String} searchKey - 需要与当前值匹配的 循环子项的 key 名
 * @param {String} defaultKey - 匹配成功需要返回对应 循环子项的 key 名 
 * @returns {String|Number} 匹配成功返回对应 循环子项的 value
 * @example
 * getValByKey([{a: 1, b: 2}], 2, 'a', 'a') -> 1
 * getValByKey([{a: 1, b: 2}], 2, 'a', 'b') -> 2
 */
export const getValByKey = function (arr, value, searchKey, defaultKey) {
    if (value) {
        for (let values of arr) {
            if (values[searchKey] === value) {
                return values[defaultKey] || '';
            };
        };
    };
    return '';
};

/**
 * @desc 滚动到指定位置
 * @todo 待补充 函数签名 scrollToTop :: (String, String) -> 
 * @param {String} matchSelector - 当前匹配目标选择器
 * @param {String} matchParentSelector - 当前匹配目标父级选择器
 * @example  
 * scrollToTop('.match', '.parents')
 */
export const scrollToTop = function (matchSelector, matchParentSelector) {
    /* 
        延迟到DOM更新完成才开始查询布局信息
     */
    this.$nextTick(async () => {
        const matchArgs = await this.$getRect(matchSelector);
        const matchParentArgs = await this.$getRect(matchParentSelector);

        uni.pageScrollTo({
            duration: 0,

            // 滚动的实际距离是元素距离顶部的距离 减去 最外层盒子的滚动距离
            scrollTop: Math.abs(matchParentArgs.top - matchArgs.top),
        });
    });
};

/**
 * @desc 根据列表循环设置对应key值
 * @desc eachSetDataByList :: (Array, Object, Object) -> Object
 * @param {Array} keys - 目前对象和数据源共有的 key 值
 * @param {Object} target - 目前对象
 * @param {Object} sources - 数据源
 * @returns {Object} 目前对象
 * @example
 * eachSetDataByList(['zps', 'zsl'], {zps: 1, zsl: 1, name: 'target'}, {zps: 2, zsl: 3}) -> {zps: 2, zsl: 3, name: 'target'} === target (true)
 */
export const eachSetDataByList = (keys, target, sources) => {
    keys.forEach(key => target[key] = sources[key]);
    return target;
};

/**
 * @desc 高阶记忆函数
 * @desc memorizer :: (Function) -> Function
 * @param {Object} fn - 执行结果
 * @returns {Function} 装饰后的函数
 * @example
 * const decoratorFn = memorizer(f);
 * decoratorFn(5);
 * decoratorFn(5); 缓存该结果，直接返回
 */
export const memorizer = function (fn) {
    const cache = {};
    return function (...args) {
        const key = args.join(',');
        if (Reflect.has(cache, key)) {
            return cache[key];
        } else {
            return cache[key] = fn(this, args);
        };
    };
};

/**
 * @desc 获取最先匹配成功的key值
 * @param {Array} data 多个对象组成成的数组
 * @param {Function} f - 匹配条件
 * @returns {String} 匹配成功返回对应key，反之返回空字符串
 * @example
 * getActiveByCondition([{key: 'a', checked: true}], item => (
        { 
            condition: item.checked, 
            key: item.key
        }
    ))
    -> 'a'
 */
export const getActiveByCondition = function (data, f) {
    for (let i = 0, len = data.length; i < len; i++) {
        const {
            condition,
            key
        } = f(data[i]);
        if (condition) return key;
    };
    return '';
};

/**
 * @desc 获取随机范围值
 * @desc getRandomNum :: (Number, Number, Number) -> Number
 * @param {Number} x - 最小范围
 * @param {Number} y - 最大范围
 * @param {Number} self - 随机到的值不能等于当前值
 * @returns {Number} 随机值
 * @example
 * getRandomNum(1, 10, 6) -> 1 ~ 10（不包含6）
 */
export const getRandomNum = function (x, y, self) {
    x = Number.parseFloat(x);
    y = Number.parseFloat(y);
    return (function f() {
        const randomNum = Number(Math.floor(Math.random() * (y - x + 1) + x));

        if (typeof self !== 'undefined') {
            if (Number.parseFloat(self) === randomNum) { // 随机值相同，再随机一次
                return f();
            };
        };

        // 否则直接返回结果
        return randomNum;
    })();
};

/**
 * @desc 函数防抖：触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间
 * @desc 前置: 触发事件后函数会立即执行，然后 n 秒内不触发事件才能继续执行下一个事件
 * @desc 后置: 触发事件后函数不会立即执行，而是在 n 秒后执行，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。
 * @desc debounceDecorator :: (Function, Number, String) -> Function
 * @param {Function} func - 函数
 * @param {Number} wait - 延迟执行毫秒数
 * @param {String} type - front 表立即执行（前置），back 表非立即执行（后置）
 * @returns {Function} 返回装饰后的防抖函数
 * @example
 * const debounceFn = debounceDecorator(() => {});
 * debounceFn();
 */
export const debounceDecorator = function (func, wait, type) {
    let timeout;
    return function (...rest) {
        if (timeout) clearTimeout(timeout);

        if (type === 'front') { // 立即执行
            const callNow = !timeout;

            timeout = setTimeout(() => {
                timeout = null;
            }, wait);

            if (callNow) func.call(this, rest);

        } else if (type === 'back') { // 非立即执行
            timeout = setTimeout(() => {
                func.call(this, rest)
            }, wait);
        };
    };
};

/**
 * @desc 函数节流: 指连续触发事件但是在 n 秒中只执行一次函数。 节流会稀释函数的执行频率
 * @desc 时间戳版: 时间戳版的函数触发是在时间段内开始的时候
 * @desc 定时器版: 定时器版的函数触发是在时间段内结束的时候。
 * @param {Function} func - 函数
 * @param {Number} wait - 延迟执行毫秒数
 * @param {String} type - date 表时间戳版，timer 表定时器版
 * @returns {Function} 返回装饰后的节流函数
 * @example
 * const throttle = throttleDecorator(() => {});
 * throttle();
 */
export const throttleDecorator = function (func, wait, type) {

    let previous = 0; // date
    let timeout; // timer

    return function (...rest) {
        if (type === 'date') { // 时间戳版本
            const now = Date.now();

            if (now - previous > wait) {
                func.call(this, ...rest);
                previous = now;
            }
        } else if (type === 'timer') { // 定时器版本
            if (!timeout) {
                timeout = setTimeout(() => {
                    timeout = null;
                    func.call(this, ...rest);
                }, wait)
            }
        }
    }
};

/**
 * @desc 阿拉伯数字转中文数字
 * @desc numberToChinese :: (String) -> String
 * @param {String} num - 需要转换的字符串数字
 * @returns {String} num 中文数字
 * @example
 * numberToChinese('12') -> '十二'
 */
export const numberToChinese = function (num) {
    num = String(num).trim();

    // 非数字不转换
    if (!/^\d*(\.\d*)?$/.test(num)) {
        return "Number is wrong!";
    };

    const AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九");
    const BB = new Array("", "十", "百", "千", "万", "亿", "点", "");

    let a = ("" + num).split("."),
        k = 0,
        re = "";

    for (let i = a[0].length - 1; i >= 0; i--) {
        switch (k) {
            case 0:
                re = BB[7] + re;
                break;
            case 4:
                if (!new RegExp("0{4}\\d{" + (a[0].length - i - 1) + "}$").test(a[0]))
                    re = BB[4] + re;
                break;
            case 8:
                re = BB[5] + re;
                BB[7] = BB[5];
                k = 0;
                break;
        }
        if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0) re = AA[0] + re;
        if (a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re;
        k++;
    };

    // 加上小数部分(如果有小数部分) 
    if (a.length > 1) {
        // 0.1 返回 零点一
        if (/^0$/.test(a[0])) {
            re = '零' + re;
        };

        re += BB[6];
        for (var i = 0; i < a[1].length; i++) re += AA[a[1].charAt(i)];
    };

    // 一十一 返回 十一
    return re
        .replace(/^一十/, '十');
};