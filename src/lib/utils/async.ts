export function awaitOr<T, R>(value: PromiseOr<T>, callback: (value: T) => R): PromiseOr<R> {
  if (value instanceof Promise) return value.then(callback);
  return callback(value);
}

/* -= Type Definitions =- */

export type PromiseOr<T> = T | Promise<T>;
