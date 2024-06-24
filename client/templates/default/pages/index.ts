import dynamic from 'next/dynamic'
import { TemplatePageConfig } from '../../../core/shared/types'

import AboutThemePage from './about-theme'
const AboutThemePageDynamic = dynamic(() => import('./about-theme'), { ssr: true })

const pagesConfig: TemplatePageConfig[] = [
  {
    dynamic: AboutThemePageDynamic,
    layout: AboutThemePage.layout,
    headProps: AboutThemePage.headProps,
    match(candidate: string): boolean {
      return candidate === 'about-theme'
    },
  },
]

export default pagesConfig
