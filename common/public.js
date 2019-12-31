import * as API from './index';
// 获取图片地址
export function getSrc(data, fullSrc = false) {
    if (!data)
        return '';
    if (fullSrc)
        return data;
    let id = 0;
    if (data.src == 'null')
        return '';
    if (data.cover && typeof(data.cover) == 'string') {
        id = JSON.parse(data.cover).id;
    } else if (data.cover) {
        id = data.cover.id;
    } else if (data.collectionCover && typeof(data.collectionCover) == 'string') {
        id = JSON.parse(data.collectionCover).id;
    } else if (data.collectionCover) {
        id = data.collectionCover.id;
    } else if (data.image && data.image.fileId) {
        id = data.image.fileId;
    } else if (data.image) {
        id = data.image.id;
    } else if (data.fileId) {
        id = data.fileId;
    } else if (data.md5Code) {
        id = data.id;
    } else if (data.src && typeof(data.src) == 'string') {
        id = JSON.parse(data.src).id;
    } else if (data.src) {
        id = data.src.id;
    }
    return API.PHOTO + getValue(id, 0) + '?w=600';
}

// data: 数据源， defValue: 默认值，items: 获取对象数据源的属性值，hasZero： 0是否可使用值
// 例子 getValue(item, 80, ['satisfaction','pre'], false)
// 获取 item.satisfaction.pre 的值， 如果该值不存在或者等于0，则返回80
export function getValue(data, defValue, items = [], hasZero = true) {
    var result;
    switch (typeof(data)) {
        case 'string':
            if (data === '') {
                result = defValue ? defValue : '';
            } else {
                result = data;
            }
            break;
        case 'boolean':
            result = data;
            break;
        case 'number':
            result = data;
            break;
        case 'object':
            if (isEmptyObject(data)) {
                result = defValue ? defValue : {};
            } else {
                for (let item of items) {
                    if (!isNull(data[item])) {
                        data = data[item];
                    } else {
                        return defValue;
                    }
                }
                result = isNull(data, hasZero) ? defValue : data;
            }
            break;
        case 'undefined':
            result = defValue ? defValue : '';
            break;
        case 'function':
            if (!data)
                result = defValue ? defValue : function() {};
            break;
    }
    return result === undefined ? defValue : result;
}
// 判空
function isNull(data, hasZero = true) {
    var flag = false;
    if (data === undefined || data === '' || data === null) {
        flag = true;
    }
    if (data instanceof Array && data.length == 0) {
        flag = true;
    }
    if (typeof(data) === 'object') {
        flag = isEmptyObject(data);
    }
    if (typeof(data) === 'string' && data.trim() === '') {
        flag = true;
    }
    if (!hasZero && data === 0) {
        flag = true;
    }
    return flag;
}

function isEmptyObject(obj) {
    for (var key in obj) {
        return false; //返回false，不为空对象
    }
    return true; //返回true，为空对象
}
export function getSrc2(banner) {
    var path = API.PHOTO + banner['content']['fileId'] + '?key=' + banner['content']['accessKey'];
    return path
}