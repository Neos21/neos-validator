// Neo's Validator
// ==========

// For CJS・UMD
export {
  isUndefined,
  isNull,
  isString,
  isNumber,
  isBoolean,
  isFunction,
  isObject,
  isArray,
  isDate,
  
  isUndefinedOrNull,
  isEmpty,
  
  isNumeric,
  isDecimal,
  isPositiveDecimal,
  isNegativeDecimal,
  isInteger,
  isPositiveInteger,
  isNegativeInteger,
  isAlpha,
  isAlphaNumeric,
  
  isTruthy,
  isFalsy,
  
  numberToString,
  stringToNumber,
  safeTrim
};

// For ESM
export default {
  isUndefined,
  isNull,
  isString,
  isNumber,
  isBoolean,
  isFunction,
  isObject,
  isArray,
  isDate,
  
  isUndefinedOrNull,
  isEmpty,
  
  isNumeric,
  isDecimal,
  isPositiveDecimal,
  isNegativeDecimal,
  isInteger,
  isPositiveInteger,
  isNegativeInteger,
  isAlpha,
  isAlphaNumeric,
  
  isTruthy,
  isFalsy,
  
  numberToString,
  stringToNumber,
  safeTrim
};


// 型判定
// ==========

function isUndefined(value: any): value is undefined {
  return value === undefined;
}
function isNull(value: any): value is null {
  return value === null;
}
function isString(value: any): value is string {
  return Object.prototype.toString.call(value) === '[object String]';  // typeof だと new String() が object 扱いになってしまうのでコチラを使う
}
function isNumber(value: any): value is number {
  return Object.prototype.toString.call(value) === '[object Number]' && !Number.isNaN(value);  // NaN は数値とみなさない
}
function isBoolean(value: any): value is boolean {
  return Object.prototype.toString.call(value) === '[object Boolean]';
}
function isFunction(value: any): value is Function {
  return Object.prototype.toString.call(value) === '[object Function]';  // typeof でも大丈夫そうだけど一応
}
function isObject(value: any): value is object {
  return Object.prototype.toString.call(value) === '[object Object]';  // typeof value === 'object' && value !== null && !isArray(value);
}
function isArray(value: any): value is Array<any> {
  return Array.isArray(value);  // [object Array]
}
function isDate(value: any): value is Date {
  return value instanceof Date;  // [object Date]
}


// 空チェック系
// ==========

function isUndefinedOrNull(value: any): value is undefined | null {
  return isUndefined(value) || isNull(value);
}
function isEmpty(value: any, options = { trim: false }): boolean {
  if(isUndefinedOrNull(value)) return true;
  if(isString(value)) {  // 空文字
    if(options.trim) value = value.trim();  // trim する場合
    return value === '';
  }
  if(isArray(value)) return value.length === 0;  // 空配列
  if(isObject(value)) return Object.keys(value).length === 0;  // 空オブジェクト
  return false;  // それ以外
}


// 数字チェック
// ==========

function isNumeric(value: any): boolean {  // とりあえず数字とみなせれば true (8進数・16進数も true 扱い。NaN になる値と Infinity を数字とみなさない)
  if(isNumber(value)) return true;
  if(!isString(value)) throw new Error('Invalid Type');
  return !Number.isNaN(value) && Number.isFinite(value);  // Number.isNaN() は Number() コンストラクタ相当の型変換を行っている
}
function isDecimal(value: any): boolean {  // 正でも負でも数字なら true (空文字、カンマは false。小数ピリオド以降に数字がないと false)
  if(isNumber(value)) value = String(value);
  if(!isString(value)) throw new Error('Invalid Type');
  if(isEmpty(value)) return false;  // 空文字は false にする
  return (/^-?[0-9]*(\.[0-9]+)?$/).test(value);  // この正規表現は空文字も true になる
}
function isPositiveDecimal(value: any): boolean {  // 正の数字なら true (空文字、カンマは false。小数ピリオド以降に数字がないと false)
  if(isNumber(value)) value = String(value);
  if(!isString(value)) throw new Error('Invalid Type');
  if(isEmpty(value)) return false;  // 空文字は false にする
  return (/^[0-9]*(\.[0-9]+)?$/).test(value);  // この正規表現は空文字も true になる
}
function isNegativeDecimal(value: any): boolean {  // 負の数字なら true (空文字、カンマは false。小数ピリオド以降に数字がないと false)
  if(isNumber(value)) value = String(value);
  if(!isString(value)) throw new Error('Invalid Type');
  if(isEmpty(value)) return false;  // 空文字は false にする
  if(value === '-') return false;  // ハイフンのみは false にする
  return (/^-[0-9]*(\.[0-9]+)?$/).test(value);  // この正規表現は空文字やハイフンのみも true になる
}
function isInteger(value: any): boolean {  // 正でも負でも整数は true (空文字、カンマ、小数ピリオドなどが含まれていると false)
  if(isNumber(value)) value = String(value);  // 数字のみ文字列に変換して受け付ける
  if(!isString(value)) throw new Error('Invalid Type');  // 文字列でなければエラーにする
  return (/^-?[0-9]+$/).test(value);
}
function isPositiveInteger(value: any): boolean {  // 正の整数は true (空文字、カンマ、小数ピリオド、負数ハイフンなどが含まれていると false)
  if(isNumber(value)) value = String(value);
  if(!isString(value)) throw new Error('Invalid Type');
  return (/^[0-9]+$/).test(value);
}
function isNegativeInteger(value: any): boolean {  // 負の整数 (先頭に半角ピリオド) は true (空文字、カンマ、小数ピリオドなどが含まれていると false)
  if(isNumber(value)) value = String(value);
  if(!isString(value)) throw new Error('Invalid Type');
  return (/^-[0-9]+$/).test(value);
}
// TODO : 電話番号・郵便番号のようにハイフン込みの数字文字列を判定する


// 文字列チェック
// ==========

function isAlpha(value: any): boolean {  // アルファベット大文字・小文字のみ (空文字は true)
  if(!isString(value)) throw new Error('Invalid Type');
  return (/^[A-Z]*$/i).test(value);
}
function isAlphaNumeric(value: any): boolean {  // アルファベット大文字・小文字・数字のみ。Number 型は「1.0」が「'1'」になるので受け付けない、先に String にしてもらう
  if(!isString(value)) throw new Error('Invalid Type');
  return (/^[A-Z0-9]*$/i).test(value);
}
// TODO : メールアドレス : 簡易チェック


// Truthy・Falsy
// ==========

function isTruthy(value: any): boolean {
  if(isBoolean(value)) return value;
  if(!isString(value)) return Boolean(value);  // Number (NaN 含む) やその他、String 以外 (undefined・null は false)
  // 文字列はその内容で判定する
  if((/^(true|yes)$/i).test(value)) return true;
  if((/^(false|no|0)$/i).test(value)) return false;
  return Boolean(value);  // その他の文字列 (空文字は false)
}
function isFalsy(value: any): boolean {
  return !isTruthy(value);
}


// 型変換
// ==========

function numberToString(value: any): string {
  if(isString(value)) return value;  // 文字列ならそのまま
  if(isUndefinedOrNull(value)) return '';  // 空
  if(isNumber(value)) return String(value);
  throw new Error('Invalid Type');  // それ以外の型はエラー
}
function stringToNumber(value: any): number {
  if(isNumber(value)) return value;  // 数字ならそのまま
  if(isUndefinedOrNull(value) || isBoolean(value) || isString(value)) {
    const num = Number(value);  // undefined は NaN、null は 0、true は 1、false は 0、空文字は 0、変換できなければ NaN になる
    if(Number.isNaN(num)) throw new Error('The Value Is NaN');  // NaN は弾く
    return num;
  }
  throw new Error('Invalid Type');  // それ以外の型はエラー
}
function safeTrim(value: any): string {
  if(isUndefinedOrNull(value)) return '';  // 空
  if(isNumber(value)) value = numberToString(value);  // 数字は安全に型変換する
  if(isString(value)) return value.trim(); // トリムする
  throw new Error('Invalid Type');  // それ以外の型はエラー
}
