export function merge<T extends object>(...objects: T[]): T {
  const result = {} as any;

  for (const object of objects) {
    for (const key in object) {
      const value = object[key];

      if (Array.isArray(value)) {
        result[key] ??= [];
        if (Array.isArray(result[key])) {
          result[key].push(...value);
          continue;
        }
      }

      if (typeof value === 'object') {
        result[key] ??= {};
        if (typeof result[key] === 'object') {
          result[key] = merge(result[key], value);
          continue;
        }
      }

      result[key] = value;
    }
  }

  return result;
}
