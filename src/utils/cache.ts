import type { PCache, TCacheType } from "./models";

function Storage(type: TCacheType = "SESSION"): Storage {
  return type === "SESSION" ? sessionStorage : localStorage;
}

export function CacheSet<T = any>(props: PCache & { value: T }) {
  const { key, value, type = "SESSION" } = props;
  const storage = Storage(type);
  storage.setItem(key, JSON.stringify(value));
}

export function CacheGet<T>(props: PCache): T | null {
  const { key, type = "SESSION" } = props;
  const storage = Storage(type);
  const value = storage.getItem(key);
  const temp: T | null = value ? JSON.parse(value) : null;
  return temp;
}

export function CacheRemove(props: PCache) {
  const { key, type = "SESSION" } = props;
  const storage = Storage(type);
  storage.removeItem(key);
}

export function ClearStorage(type: TCacheType = "SESSION") {
  const storage = Storage(type);
  storage.clear();
}
