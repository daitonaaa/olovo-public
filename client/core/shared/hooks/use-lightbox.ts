export const useLightbox = (images: any, index: number) => {
  const isArray = Array.isArray(images)
  if (isArray && images.length >= 2) {
    const current = images[index]
    const slicedStart = images.slice(0, images.indexOf(current))
    const slicedEnd = images.slice(images.indexOf(current), images.length)
    const group = [...slicedEnd, ...slicedStart]
    return group
  }
  return images
}
