import 'styled-components'
import { StyleTheme } from './core/theme-utils/types'

declare module 'styled-components' {
  export interface DefaultTheme extends StyleTheme {}
}

declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'

declare module '*.svg' {
  const content: any
  export default content
}
