

export function appendOption(t) {
    var selectGroup = []
    for (var i in t) {
        var item = <Option value={i} key={i}>{t[i]}</Option>
        selectGroup.push(item);
    }
    return selectGroup;
}

export function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}