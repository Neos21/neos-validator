export { isUndefined, isNull, isString, isNumber, isBoolean, isFunction, isObject, isArray, isDate, isUndefinedOrNull, isEmpty, isNumeric, isDecimal, isPositiveDecimal, isNegativeDecimal, isInteger, isPositiveInteger, isNegativeInteger, isAlpha, isAlphaNumeric, isTruthy, isFalsy, numberToString, stringToNumber, safeTrim };
declare const _default: {
    isUndefined: typeof isUndefined;
    isNull: typeof isNull;
    isString: typeof isString;
    isNumber: typeof isNumber;
    isBoolean: typeof isBoolean;
    isFunction: typeof isFunction;
    isObject: typeof isObject;
    isArray: typeof isArray;
    isDate: typeof isDate;
    isUndefinedOrNull: typeof isUndefinedOrNull;
    isEmpty: typeof isEmpty;
    isNumeric: typeof isNumeric;
    isDecimal: typeof isDecimal;
    isPositiveDecimal: typeof isPositiveDecimal;
    isNegativeDecimal: typeof isNegativeDecimal;
    isInteger: typeof isInteger;
    isPositiveInteger: typeof isPositiveInteger;
    isNegativeInteger: typeof isNegativeInteger;
    isAlpha: typeof isAlpha;
    isAlphaNumeric: typeof isAlphaNumeric;
    isTruthy: typeof isTruthy;
    isFalsy: typeof isFalsy;
    numberToString: typeof numberToString;
    stringToNumber: typeof stringToNumber;
    safeTrim: typeof safeTrim;
};
export default _default;
declare function isUndefined(value: any): value is undefined;
declare function isNull(value: any): value is null;
declare function isString(value: any): value is string;
declare function isNumber(value: any): value is number;
declare function isBoolean(value: any): value is boolean;
declare function isFunction(value: any): value is Function;
declare function isObject(value: any): value is object;
declare function isArray(value: any): value is Array<any>;
declare function isDate(value: any): value is Date;
declare function isUndefinedOrNull(value: any): value is undefined | null;
declare function isEmpty(value: any, options?: {
    trim: boolean;
}): boolean;
declare function isNumeric(value: any): boolean;
declare function isDecimal(value: any): boolean;
declare function isPositiveDecimal(value: any): boolean;
declare function isNegativeDecimal(value: any): boolean;
declare function isInteger(value: any): boolean;
declare function isPositiveInteger(value: any): boolean;
declare function isNegativeInteger(value: any): boolean;
declare function isAlpha(value: any): boolean;
declare function isAlphaNumeric(value: any): boolean;
declare function isTruthy(value: any): boolean;
declare function isFalsy(value: any): boolean;
declare function numberToString(value: any): string;
declare function stringToNumber(value: any): number;
declare function safeTrim(value: any): string;
