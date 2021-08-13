/**
 * @description 判断连个对象是否相等
 * @param {Object | Array} obj1 [], {}
 * @param {Object | Array} obj2 [], {}
 * @return {Boolean} 是否相等
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
 * 
 * @param {Object} data 
 * @param {Array} filedList 
 * @param {String} initial 
 * @param {String} separator 
 * @returns 
 */
export const formatStr = function (data, filedList, initial = '', separator = ' ') {
    return (filedList.reduce((initial, filed) => {
        return (initial += (data[filed] || '') + separator, initial);
    }, initial)).trim();
};

// jsonToObject :: String -> Object
export const jsonToObject = function (json) {
    return typeof json === 'object' ? json : JSON.parse(json || '{}');
};

// jsonToString :: Object -> String
export const jsonToString = function (json) {
    return typeof json === 'object' ? JSON.stringify(json || {}) : json;
};

// 统计目标字符串出现的次数
export const computedStrCount = function (matchTarget, target) {
    return matchTarget.split(target).length - 1;
};

// 通过配置的形式创建函数
export const createFunction = function ({
    cacheArgs,
    args,
    functionBody
}) {
    // 参数完整的情况下，不柯里化该函数
    return Object.keys(cacheArgs).length < computedStrCount(functionBody, args) ? R.curry(new Function(args,
        functionBody)) : new Function(args, functionBody);
};

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
    fieldsConfig = fieldsConfig || {};
    dataSource = dataSource || {};
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
 * @param {Object} filedsList 字段配置
 * @param {Object} dataSource 数据源
 * @return {Object} 转换后的对象
 * @example 
 * 	compositeDataByList(['cp_ys_bh', 'cp_ys_id'], { cp_ys_bh: '1', cp_ys_id: 2 })
 * 	{ cp_ys_bh: 1, cp_ys_id: 2}
 */
export const compositeDataByList = function (filedsList, dataSource) {
    filedsList = filedsList || [];
    dataSource = dataSource || {};
    return filedsList.reduce((saveData, key) => (saveData[key] = dataSource[key] || '', saveData), {});
};

/**
 * 根据切割个数切割列表
 * splitListByCount :: (Number, Array) -> Array
 * @param {Object} count 切割个数
 * @param {Array} list 数据源
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
 */
export const getPriorityByConfig = function (config) {
    for (const item of config) {
        const [key, value] = Object.entries(item).flat(Infinity);
        if (value) return key;
    };
    return undefined;
}

/**
 * 位数不够补0
 * zeroCompletion :: [String|Number] -> [String|Number]
 * @param {Number|String} num
 * @return {Number} 补全后的值
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