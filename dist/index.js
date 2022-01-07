"use strict";
// 型判定
// ==========
function isUndefined(value) {
    return value === undefined;
}
function isNull(value) {
    return value === null;
}
function isString(value) {
    return Object.prototype.toString.call(value) === '[object String]'; // typeof だと new String() が object 扱いになってしまうのでコチラを使う
}
function isNumber(value) {
    return Object.prototype.toString.call(value) === '[object Number]';
}
function isBoolean(value) {
    return Object.prototype.toString.call(value) === '[object Boolean]';
}
function isFunction(value) {
    return Object.prototype.toString.call(value) === '[object Function]'; // typeof でも大丈夫そうだけど一応
}
function isObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]'; // typeof value === 'object' && value !== null && !isArray(value);
}
function isArray(value) {
    return Array.isArray(value); // [object Array]
}
function isDate(value) {
    return value instanceof Date; // [object Date]
}
// 空チェック系
// ==========
function isUndefinedOrNull(value) {
    return isUndefined(value) || isNull(value);
}
function isEmpty(value, options = { trim: false }) {
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
// 数字チェック
// ==========
function isNumeric(value) {
    if (isNumber(value))
        return true;
    if (!isString(value))
        throw new Error('Invalid Type');
    return !Number.isNaN(value) && Number.isFinite(value); // Number.isNaN() は Number() コンストラクタ相当の型変換を行っている
}
function isDecimal(value) {
    if (isNumber(value))
        value = String(value);
    if (!isString(value))
        throw new Error('Invalid Type');
    if (isEmpty(value))
        return false; // 空文字は false にする
    return (/^-?\d*(\.\d+)?$/).test(value); // この正規表現は空文字も true になる
}
function isPositiveDecimal(value) {
    if (isNumber(value))
        value = String(value);
    if (!isString(value))
        throw new Error('Invalid Type');
    if (isEmpty(value))
        return false; // 空文字は false にする
    return (/^\d*(\.\d+)?$/).test(value); // この正規表現は空文字も true になる
}
function isNegativeDecimal(value) {
    if (isNumber(value))
        value = String(value);
    if (!isString(value))
        throw new Error('Invalid Type');
    if (isEmpty(value))
        return false; // 空文字は false にする
    if (value === '-')
        return false; // ハイフンのみは false にする
    return (/^-\d*(\.\d+)?$/).test(value); // この正規表現は空文字やハイフンのみも true になる
}
function isInteger(value) {
    if (isNumber(value))
        value = String(value); // 数字のみ文字列に変換して受け付ける
    if (!isString(value))
        throw new Error('Invalid Type'); // 文字列でなければエラーにする
    return (/^-?\d+$/).test(value);
}
function isPositiveInteger(value) {
    if (isNumber(value))
        value = String(value);
    if (!isString(value))
        throw new Error('Invalid Type');
    return (/^\d+$/).test(value);
}
function isNegativeInteger(value) {
    if (isNumber(value))
        value = String(value);
    if (!isString(value))
        throw new Error('Invalid Type');
    return (/^-\d+$/).test(value);
}
// TODO : 電話番号・郵便番号のようにハイフン込みの数字文字列を判定する
// 文字列チェック
// ==========
function isAlpha(value) {
    if (!isString(value))
        throw new Error('Invalid Type');
    return (/^[A-Z]*$/i).test(value);
}
function isAlphaNumeric(value) {
    if (!isString(value))
        throw new Error('Invalid Type');
    return (/^[A-Z0-9]*$/i).test(value);
}
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
function isFalsy(value) {
    return !isTruthy(value);
}
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
function stringToNumber(value) {
    if (isNumber(value))
        return value; // 数字ならそのまま
    if (isUndefinedOrNull(value) || isBoolean(value) || isString(value))
        return Number(value); // undefined は NaN、null は 0、true は 1、false は 0、空文字は 0、変換できなければ NaN になる
    throw new Error('Invalid Type'); // それ以外の型はエラー
}
function safeTrim(value) {
    if (isUndefinedOrNull(value))
        return ''; // 空
    if (isNumber(value))
        value = numberToString(value); // 数字は安全に型変換する
    if (isString(value))
        return value.trim(); // トリムする
    throw new Error('Invalid Type'); // それ以外の型はエラー
}
