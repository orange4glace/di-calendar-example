export declare function deepClone<T>(obj: T): T;
export declare function deepFreeze<T>(obj: T): T;
export declare function cloneAndChange(obj: any, changer: (orig: any) => any): any;
/**
 * Copies all properties of source into destination. The optional parameter "overwrite" allows to control
 * if existing properties on the destination should be overwritten or not. Defaults to true (overwrite).
 */
export declare function mixin(destination: any, source: any, overwrite?: boolean): any;
export declare function assign<T>(destination: T): T;
export declare function assign<T, U>(destination: T, u: U): T & U;
export declare function assign<T, U, V>(destination: T, u: U, v: V): T & U & V;
export declare function assign<T, U, V, W>(destination: T, u: U, v: V, w: W): T & U & V & W;
export declare function equals(one: any, other: any): boolean;
/**
 * Calls JSON.Stringify with a replacer to break apart any circular references.
 * This prevents JSON.stringify from throwing the exception
 *  "Uncaught TypeError: Converting circular structure to JSON"
 */
export declare function safeStringify(obj: any): string;
export declare function getOrDefault<T, R>(obj: T, fn: (obj: T) => R | undefined, defaultValue: R): R;
declare type obj = {
    [key: string]: any;
};
/**
 * Returns an object that has keys for each value that is different in the base object. Keys
 * that do not exist in the target but in the base object are not considered.
 *
 * Note: This is not a deep-diffing method, so the values are strictly taken into the resulting
 * object if they differ.
 *
 * @param base the object to diff against
 * @param obj the object to use for diffing
 */
export declare function distinct(base: obj, target: obj): obj;
export {};
