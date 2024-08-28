// utils.ts

export const binaryToBase64 = (binaryData: ArrayBuffer | Uint8Array | Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const blob = new Blob([binaryData], { type: 'image/png' }) // Adjust MIME type as needed
    const reader = new FileReader()
    reader.onloadend = () => {
      const result = reader.result as string | null
      if (result) {
        resolve(result.split(',')[1])
      } else {
        reject(new Error('Failed to convert binary data to base64'))
      }
    }
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

export const debounce = <T extends (...args: never[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>
  return function (this: unknown, ...args: Parameters<T>) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}

export const filterNonEmptyValues = <T extends Record<string, never>>(obj: T): Partial<T> => {
  return Object.fromEntries(Object.entries(obj).filter(([, value]) => value !== null && value !== '')) as Partial<T>
}
