import { useWindowWidth } from '@react-hook/window-size'
import { useEffect, useState } from 'react'

import { useTheme } from 'styled-components'
import { useUserAgent } from '../../providers/user-agent'

export interface ScreenSizeReturn {
  isLargeDesktop: boolean
  isDesktop: boolean
  isTablet: boolean
  isMobile: boolean
}

const check = (
  windowWidth: number,
  minLargeDesktop: number,
  minDesktop: number,
  minTablet: number
): ScreenSizeReturn => ({
  isLargeDesktop: windowWidth >= minLargeDesktop,
  isDesktop: windowWidth >= minDesktop,
  isTablet: windowWidth >= minTablet && windowWidth < minDesktop,
  isMobile: windowWidth < minTablet,
})

const isClient = typeof window !== 'undefined'

export const useScreenSize = (): ScreenSizeReturn => {
  const windowWidth = useWindowWidth()
  const theme = useTheme()

  const userAgent = useUserAgent()

  const [result, setResult] = useState<ScreenSizeReturn>({
    isMobile: userAgent?.isMobile || true,
    isTablet: userAgent?.isTablet || false,
    isDesktop: userAgent?.isDesktop || false,
    isLargeDesktop: false,
  })

  useEffect(() => {
    setResult(
      check(
        windowWidth,
        theme.screenSizes.minLargeDesktop,
        theme.screenSizes.minDesktop,
        theme.screenSizes.minTablet
      )
    )
  }, [windowWidth, theme])

  if (!isClient) {
    return {
      isMobile: userAgent?.isMobile || true,
      isTablet: userAgent?.isTablet || false,
      isDesktop: userAgent?.isDesktop || false,
      isLargeDesktop: false,
    }
  }

  return result
}
