import { func } from 'prop-types';
import { Select } from 'antd';

const Option = Select.Option;

export function dateFormat(format, date) {
    var args = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),  //quarter
        "S": date.getMilliseconds()
    };
    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var i in args) {
        var n = args[i];
        if (new RegExp("(" + i + ")").test(format))
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
    }
    return format;
}

export function appendOption(t) {
    var selectGroup = []
    for (var i in t) {
        var item = <Option value={t[i].name} key={i}>{t[i].desc ? t[i].desc : t[i].name}</Option>
        selectGroup.push(item);
    }
    return selectGroup;
}
//长日期转短日期
export function FormatShortDate(Ldate){
        var shortDate;
        var dateStr = new Date(Ldate)
        var date = new Date(dateStr.getTime())
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
        shortDate = Y + M + D;
        return shortDate;
    }