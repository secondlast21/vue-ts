export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const setupEndpoint = (str: string) => {
  return str.replace('/v1', '')
}

export const documentType = (endpoint: string) => {
  return endpoint.slice(-3)
}

export const formatLabel = (item: string) => {
  return item.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}
