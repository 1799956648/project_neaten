import {
    decimalSub,
} from './operation.js';

/**
 * 此方法返回一个date对象，为了兼容苹果
 */
export const getDate = function (date, is_time) {
    is_time = is_time || false;
    let date_arr = date.split(/[- : .\/]/);
    if (is_time) {
        return new Date(date_arr[0], date_arr[1] - 1, date_arr[2], date_arr[3], date_arr[4], date_arr[5]);
    } else {
        return new Date(date_arr[0], date_arr[1] - 1, date_arr[2]);
    }
};

/**
 * 获取指定时间格式
 */
export const dateFormat = function (fmt, timestamp) {
    timestamp = timestamp || new Date().getTime();
    fmt = fmt || "yyyy-MM-dd hh:mm:ss";
    let self = new Date(timestamp);
    let o = {
        "M+": self.getMonth() + 1, //月份
        "d+": self.getDate(), //日
        "h+": self.getHours(), //小时
        "m+": self.getMinutes(), //分
        "s+": self.getSeconds(), //秒
        "q+": Math.floor((self.getMonth() + 3) / 3), //季度
        "S": self.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (self.getFullYear() + "").substr(4 - RegExp.$1.length))
    };
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        };
    };
    return fmt;
};


// 获取一年的天数
export const getDay = function (year) {
    // 闰年
    if (((year % 4 == 0) && (year % 100 !== 0)) || (year % 400 == 0)) {
        return 366;
    } else {
        return 365;
    }
};

// 获取一个月有多少天(根据月份算出该月份时间)
export const getMonthDay = function (year, month) {
    return new Date(year, month, 0).getDate();
};

// 获取几天的时间戳
export const getDateTimestamp = function (num) {
    return (num || 1) * (24 * 60 * 60 * 1000);
};

/**
 * 获取最近时间段
 * @param { Number } num 获取最近几天的时间 (开始时间和结束时间)
 * @param { Boolean } bool (true为 yyyy-mm-dd，false为 yyyy.mm.dd)
 */
export const getLatelyTime = function (params) {
    let {
        num, // 以 endDate 为标准获取最近几天的时间
        format, // 日期格式化格式
        startDate, // 开始时间
        endDate, // 结束时间
    } = Object.assign({
        num: 30,
        format: 'yyyy-MM-dd',
        startDate: new Date().getTime(),
        endDate: new Date().getTime(),
    }, params);

    let apart = (24 * 60 * 60 * 1000) * (num - 1); // 最近几天
    let startTimestamp = new Date(dateFormat('yyyy/MM/dd', startDate)).getTime(); // 开始时间戳
    let start = decimalSub(startTimestamp, apart); // 开始时间

    return {
        startDate: dateFormat(format, start),
        endDate: dateFormat(format, endDate),
    }
},
