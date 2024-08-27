export const binaryToBase64 = (binaryData) => {
  return new Promise((resolve, reject) => {
    const blob = new Blob([binaryData], { type: 'image/png' }) // Adjust MIME type as needed
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result.split(',')[1])
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

export const debounce = (func, wait) => {
  let timeout
  return function (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}

export const zoomInImg = (id, minWidthZoom, maxWidthZoom, zoomin) => {
  let img = document.getElementById(id)

  img.width = img.width + 300
  if (img.width >= 2000) {
    maxWidthZoom.value = true
    minWidthZoom.value = false
  } else {
    zoomin.value = true
    maxWidthZoom.value = false
    minWidthZoom.value = false
  }
}

export const zoomOutImg = (id, minWidthZoom, maxWidthZoom, zoomin, originalSizeImg) => {
  let img = document.getElementById(id)

  img.width = img.width - 300
  if (img.width <= originalSizeImg.value) {
    minWidthZoom.value = true
    maxWidthZoom.value = false
    zoomin.value = false
  } else {
    zoomin.value = true
    minWidthZoom.value = false
    maxWidthZoom.value = false
  }
}

export const filterNonEmptyValues = (obj) => {
  return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== null && value !== ''))
}
