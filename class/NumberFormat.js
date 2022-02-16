/**
 * @class
 * @classdesc 针对字符串格式化成目标字符
 */
const NumberFormat = class {
    constructor() {
        // this.formatMatch = {
        //     0: 'unrestraint', // 无限制
        //     1: 'pnFloat', // 正负浮点数
        //     2: 'pnInteger', // 正负整数
        //     3: 'positiveInteger', // 正整数
        //     4: 'negativeInteger', // 负整数
        //     5: 'pnFloat', // 正负浮点数
        //     6: 'positiveFloat', // 正浮点数
        //     7: 'negativeFloat', // 负浮点数
        // };
    }

    /**
     * @desc 不做任何限制
     * @param {String} value 输入值
     * @returns {String} 返回输入值
     */
    unrestraint(value) {
        return value;
    }

    /**
     * @desc 限制为正负整数
     * @param {String} value 输入值
     * @returns {String} 格式化后的值
     */
    pnInteger(value) {
        return this.formatMinus(this.excludeDecimalPoint(value));
    }

    /**
     * @desc 限制为正整数
     * @param {String} value 输入值
     * @returns {String} 格式化后的值
     */
    positiveInteger(value) {
        return this.excludeMinusSymbol(this.excludeDecimalPoint(value));
    }

    /**
     * @desc 限制为负整数
     * @todo 未做限制只允许输入负数的情况
     * @param {String} value 输入值
     * @returns {String} 格式化后的值
     */
    negativeInteger(value) {
        return this.formatMinus(this.excludeDecimalPoint(value));
    }

    /**
     * @desc 限制为正负浮点数
     * @param {String} value 输入值
     * @param {String} decimalPlaces 保留小数位数
     * @returns {String} 格式化后的值
     */
    pnFloat(value, decimalPlaces) {
        return this.limitDecimalPlaces(this.formatMinus(this.decimalPointPad(value)), decimalPlaces);
    }

    /**
     * @desc 限制为正浮点数
     * @param {String} value 输入值
     * @param {String} decimalPlaces 保留小数位数
     * @returns {String} 格式化后的值
     */
    positiveFloat(value, decimalPlaces) {
        return this.limitDecimalPlaces(this.excludeMinusSymbol(this.decimalPointPad(value)), decimalPlaces);
    }

    /**
     * @desc 限制为负浮点数
     * @todo 未做限制只允许输入负数的情况
     * @param {String} value 输入值
     * @param {String} decimalPlaces 保留小数位数
     * @returns {String} 格式化后的值
     */
    negativeFloat(value, decimalPlaces) {
        return this.limitDecimalPlaces(this.formatMinus(this.decimalPointPad(value)), decimalPlaces);
    }

    /**
     * @desc 排除小数点
     * @param {String} value 输入值
     * @returns {String} 格式化后的值
     */
    excludeDecimalPoint(value) {
        return value.replace(/\.+/g, '');
    }

    /**
     * @desc 排除-号
     * @param {String} value 输入值
     * @returns {String} 格式化后的值
     */
    excludeMinusSymbol(value) {
        return value.replace(/-*/g, '');
    }

    /**
     * @desc 小数点补全输入
     * @param {String} value 输入值
     * @returns {String} 格式化后的值
     */
    decimalPointPad(value) {
        return value
            .replace(/^\.{2,}/g, '.') // ..返回.
            .replace(/^(-?)(\.{1})(\d+)/, `$10$2$3`) // (-).xxx 返回 (-)0.xxx
            .replace(/^(-?)(\.+)/, `$10.`) // (-). 返回 (-)0.
            .replace(/(^-?\d+)\.{2,}/, `$1.`) // (-)xxx.. 返回 (-)xxx.
            .replace(/(-*\d+\.{1}\d+)\.+/g, `$1`); // (-)x.x. 返回 (-)x.x
    }

    /**
     * @desc 限制只能输入的字符、排除空格
     * @param {String} value 输入值
     * @returns {String} 格式化后的值
     */
    filterExtraStr(value) {
        return value
            .replace(/\s+/g, '')
            .replace(/[^-\.0-9]/g, '');
    }

    /**
     * @desc 过滤减号（-）
     * @param {String} value 输入值
     * @returns {String} 格式化后的值
     */
    formatMinus(value) {
        const firstStr = value[0];
        const replaceStr = this.excludeMinusSymbol(value);
        return firstStr === '-' ? firstStr + replaceStr : replaceStr;
    }

    /**
     * @desc 保留小数位
     * @param {String} value 输入值
     * @param {String} decimalPlaces 保留小数位数
     * @returns {String} 格式化后的值
     */
    limitDecimalPlaces(value, decimalPlaces) {
        return value.replace(/(\d*)(\.{1})(.*)/, function (matchAll, $1, $2, $3) {
            return $1 + $2 + ($3.slice(0, decimalPlaces));
        });
    }

    /**
     * @desc 格式化数字
     * @param {Object} 输入配置
     * @param {String} Object.numberType 格式化类型
     * @param {String} Object.value 输入值
     * @param {String|Number} Object.decimalPlaces 保留小数位数
     * @returns {String} 格式化后的值
     */
    formatNumber({
        numberType,
        value,
        decimalPlaces,
    }) {
        // 不做任何限制
        if (numberType === 'unrestraint') return value;
        return this[numberType]?.(this.filterExtraStr(value), decimalPlaces);
    }
};

export default NumberFormat;