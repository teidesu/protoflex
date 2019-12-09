/**
 * Similar to lodash's keyBy function, but creates array for each key
 *
 * @param arr  Input array
 * @param key  Indexation key
 */
export function keyByMultiple (arr: any[], key: string): { [key: string]: any }

/**
 * Converts JavaScript string to array of UTF8 bytes
 *
 * @param str  String to be converted
 */
export function toByteArray (str: string): number[]

/**
 * Converts array of UTF8 bytes to JavaScript string
 * Can optionally convert only part of array: [start, end)
 *
 * @param bytes  Array of UTF8 bytes to be converted
 * @param start  Optionally index of first byte to convert, inclusive
 * @param end  Optionally index of last byte to convert, exclusive
 */
export function fromByteArray (bytes: number[] | Buffer | Uint8Array, start?: number, end?: number): string

/**
 * Converts array of bytes or string to hex.
 * If string is provided, [[fromByteArray]] is implicitly used
 *
 * @param bytes  Bytes or string to convert
 * @returns Hexadecimal string
 */
export function toHex (bytes: number[] | Buffer | Uint8Array | string): string

/**
 * Converts hexadecimal string to array of bytes.
 *
 * @param str  Hexadecimal string to convert
 * @returns Array of bytes
 */
export function fromHex (str: string): number[]

