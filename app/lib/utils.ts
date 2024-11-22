export function omit<T>(data: T, keys: Array<keyof T>) {
  const shallowClone = { ...data };
  for (const key of keys) {
    delete shallowClone[key];
  }
  return shallowClone;
}
