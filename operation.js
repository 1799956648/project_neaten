/**
 * 乘法运算
 * @param {Number} arg1
 * @param {Number} arg2
 * @return {Number} 相乘结果
 */
export const decimalMul = function (arg1, arg2) {
    let m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString();
    try {
        m += s1.split('.')[1].length;
    } catch (e) { }
    try {
        m += s2.split('.')[1].length;
    } catch (e) { }
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
};

/**
 * 加法运算
 * @param {Number} arg1
 * @param {Number} arg2
 * @return {Number} 相加结果
 */
export const decimalAdd = function (arg1, arg2) {
    arg1 = Number(arg1 || 0) || 0;
    arg2 = Number(arg2 || 0) || 0;
    var r1, r2, m;
    try {
        r1 = arg1.toString().split('.')[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split('.')[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (decimalMul(arg1, m) + decimalMul(arg2, m)) / m;
};

/**
 * 减法运算
 * @param {Number} arg1
 * @param {Number} arg2
 * @return {Number} 相减结果
 */
export const decimalSub = function (arg1, arg2) {
    arg1 = Number(arg1 || 0) || 0;
    arg2 = Number(arg2 || 0) || 0;
    let r1, r2, m, n;
    try {
        r1 = arg1.toString().split('.')[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split('.')[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    n = (r1 >= r2) ? r1 : r2;
    return Number(((decimalMul(arg1, m) - decimalMul(arg2, m)) / m).toFixed(n));
};

/**
 * 除法运算
 * @param {Number} arg1
 * @param {Number} arg2
 * @return {Number} 相除结果
 */
export const decimalDiv = function (arg1, arg2) {
    var t1 = 0,
        t2 = 0,
        r1, r2;
    try {
        t1 = arg1.toString().split('.')[1].length;
    } catch (e) { }
    try {
        t2 = arg2.toString().split('.')[1].length;
    } catch (e) { };

    r1 = Number(arg1.toString().replace('.', ''));
    r2 = Number(arg2.toString().replace('.', ''));
    return decimalMul((r1 / r2), Math.pow(10, t2 - t1));
};