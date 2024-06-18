
export function setStorageItem(key: string, object: unknown) {
  localStorage.setItem(`kokopelli::${key}`, JSON.stringify(object))
}

export function getStorageItem<T>(key: string): T | null {
  const item = localStorage.getItem(`kokopelli::${key}`)

  if (!item) return null

  return JSON.parse(item) as T
}