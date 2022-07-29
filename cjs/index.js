"use strict";
// Neo's Validator
// ==========
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeTrim = exports.stringToNumber = exports.numberToString = exports.isFalsy = exports.isTruthy = exports.isAlphaNumeric = exports.isAlpha = exports.isNegativeInteger = exports.isPositiveInteger = exports.isInteger = exports.isNegativeDecimal = exports.isPositiveDecimal = exports.isDecimal = exports.isNumeric = exports.isEmpty = exports.isUndefinedOrNull = exports.isDate = exports.isArray = exports.isObject = exports.isFunction = exports.isBoolean = exports.isNumber = exports.isString = exports.isNull = exports.isUndefined = void 0;
// For ESM
exports.default = {
    isUndefined: isUndefined,
    isNull: isNull,
    isString: isString,
    isNumber: isNumber,
    isBoolean: isBoolean,
    isFunction: isFunction,
    isObject: isObject,
    isArray: isArray,
    isDate: isDate,
    isUndefinedOrNull: isUndefinedOrNull,
    isEmpty: isEmpty,
    isNumeric: isNumeric,
    isDecimal: isDecimal,
    isPositiveDecimal: isPositiveDecimal,
    isNegativeDecimal: isNegativeDecimal,
    isInteger: isInteger,
    isPositiveInteger: isPositiveInteger,
    isNegativeInteger: isNegativeInteger,
    isAlpha: isAlpha,
    isAlphaNumeric: isAlphaNumeric,
    isTruthy: isTruthy,
    isFalsy: isFalsy,
    numberToString: numberToString,
    stringToNumber: stringToNumber,
    safeTrim: safeTrim
};
// 型判定
// ==========
function isUndefined(value) {
    return value === undefined;
}
exports.isUndefined = isUndefined;
function isNull(value) {
    return value === null;
}
exports.isNull = isNull;
function isString(value) {
    return Object.prototype.toString.call(value) === '[object String]'; // typeof だと new String() が object 扱いになってしまうのでコチラを使う
}
exports.isString = isString;
function isNumber(value) {
    return Object.prototype.toString.call(value) === '[object Number]' && !Number.isNaN(value); // NaN は数値とみなさない
}
exports.isNumber = isNumber;
function isBoolean(value) {
    return Object.prototype.toString.call(value) === '[object Boolean]';
}
exports.isBoolean = isBoolean;
function isFunction(value) {
    return Object.prototype.toString.call(value) === '[object Function]'; // typeof でも大丈夫そうだけど一応
}
exports.isFunction = isFunction;
function isObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]'; // typeof value === 'object' && value !== null && !isArray(value);
}
exports.isObject = isObject;
function isArray(value) {
    return Array.isArray(value); // [object Array]
}
exports.isArray = isArray;
function isDate(value) {
    return value instanceof Date; // [object Date]
}
exports.isDate = isDate;
// 空チェック系
// ==========
function isUndefinedOrNull(value) {
    return isUndefined(value) || isNull(value);
}
exports.isUndefinedOrNull = isUndefinedOrNull;
function isEmpty(value, options) {
    if (options === void 0) { options = { trim: false }; }
    if (isUndefinedOrNull(value))
        return true;
    if (isString(value)) { // 空文字
        if (options.trim)
            value = value.trim(); // trim する場合
        return value === '';
    }
    if (isArray(value))
        return value.length === 0; // 空配列
    if (isObject(value))
        return Object.keys(value).length === 0; // 空オブジェクト
    return false; // それ以外
}
exports.isEmpty = isEmpty;
// 数字チェック
// ==========
function isNumeric(value) {
    if (isNumber(value))
        return true;
    if (!isString(value))
        throw new Error('Invalid Type');
    return !Number.isNaN(value) && Number.isFinite(value); // Number.isNaN() は Number() コンストラクタ相当の型変換を行っている
}
exports.isNumeric = isNumeric;
function isDecimal(value) {
    if (isNumber(value))
        value = String(value);
    if (!isString(value))
        throw new Error('Invalid Type');
    if (isEmpty(value))
        return false; // 空文字は false にする
    return (/^-?[0-9]*(\.[0-9]+)?$/).test(value); // この正規表現は空文字も true になる
}
exports.isDecimal = isDecimal;
function isPositiveDecimal(value) {
    if (isNumber(value))
        value = String(value);
    if (!isString(value))
        throw new Error('Invalid Type');
    if (isEmpty(value))
        return false; // 空文字は false にする
    return (/^[0-9]*(\.[0-9]+)?$/).test(value); // この正規表現は空文字も true になる
}
exports.isPositiveDecimal = isPositiveDecimal;
function isNegativeDecimal(value) {
    if (isNumber(value))
        value = String(value);
    if (!isString(value))
        throw new Error('Invalid Type');
    if (isEmpty(value))
        return false; // 空文字は false にする
    if (value === '-')
        return false; // ハイフンのみは false にする
    return (/^-[0-9]*(\.[0-9]+)?$/).test(value); // この正規表現は空文字やハイフンのみも true になる
}
exports.isNegativeDecimal = isNegativeDecimal;
function isInteger(value) {
    if (isNumber(value))
        value = String(value); // 数字のみ文字列に変換して受け付ける
    if (!isString(value))
        throw new Error('Invalid Type'); // 文字列でなければエラーにする
    return (/^-?[0-9]+$/).test(value);
}
exports.isInteger = isInteger;
function isPositiveInteger(value) {
    if (isNumber(value))
        value = String(value);
    if (!isString(value))
        throw new Error('Invalid Type');
    return (/^[0-9]+$/).test(value);
}
exports.isPositiveInteger = isPositiveInteger;
function isNegativeInteger(value) {
    if (isNumber(value))
        value = String(value);
    if (!isString(value))
        throw new Error('Invalid Type');
    return (/^-[0-9]+$/).test(value);
}
exports.isNegativeInteger = isNegativeInteger;
// TODO : 電話番号・郵便番号のようにハイフン込みの数字文字列を判定する
// 文字列チェック
// ==========
function isAlpha(value) {
    if (!isString(value))
        throw new Error('Invalid Type');
    return (/^[A-Z]*$/i).test(value);
}
exports.isAlpha = isAlpha;
function isAlphaNumeric(value) {
    if (!isString(value))
        throw new Error('Invalid Type');
    return (/^[A-Z0-9]*$/i).test(value);
}
exports.isAlphaNumeric = isAlphaNumeric;
// TODO : メールアドレス : 簡易チェック
// Truthy・Falsy
// ==========
function isTruthy(value) {
    if (isBoolean(value))
        return value;
    if (!isString(value))
        return Boolean(value); // Number (NaN 含む) やその他、String 以外 (undefined・null は false)
    // 文字列はその内容で判定する
    if ((/^(true|yes)$/i).test(value))
        return true;
    if ((/^(false|no|0)$/i).test(value))
        return false;
    return Boolean(value); // その他の文字列 (空文字は false)
}
exports.isTruthy = isTruthy;
function isFalsy(value) {
    return !isTruthy(value);
}
exports.isFalsy = isFalsy;
// 型変換
// ==========
function numberToString(value) {
    if (isString(value))
        return value; // 文字列ならそのまま
    if (isUndefinedOrNull(value))
        return ''; // 空
    if (isNumber(value))
        return String(value);
    throw new Error('Invalid Type'); // それ以外の型はエラー
}
exports.numberToString = numberToString;
function stringToNumber(value) {
    if (isNumber(value))
        return value; // 数字ならそのまま
    if (isUndefinedOrNull(value) || isBoolean(value) || isString(value)) {
        var num = Number(value); // undefined は NaN、null は 0、true は 1、false は 0、空文字は 0、変換できなければ NaN になる
        if (Number.isNaN(num))
            throw new Error('The Value Is NaN'); // NaN は弾く
        return num;
    }
    throw new Error('Invalid Type'); // それ以外の型はエラー
}
exports.stringToNumber = stringToNumber;
function safeTrim(value) {
    if (isUndefinedOrNull(value))
        return ''; // 空
    if (isNumber(value))
        value = numberToString(value); // 数字は安全に型変換する
    if (isString(value))
        return value.trim(); // トリムする
    throw new Error('Invalid Type'); // それ以外の型はエラー
}
exports.safeTrim = safeTrim;
