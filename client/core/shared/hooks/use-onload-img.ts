import { useEffect, useState } from 'react'

interface ReturnType {
  isLoaded: boolean
}

export const useOnloadImg = (src: string): ReturnType => {
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    if (typeof window !== undefined) {
      const img = new Image()
      img.onload = function () {
        setIsLoaded(true)
      }
      img.src = src
    }
  }, [src])

  return {
    isLoaded,
  }
}
