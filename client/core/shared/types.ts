import React from 'react'
import { NextPageFC } from './models/next-fc'

export type ExtractKeys<T> = keyof {
  [K in keyof T & string as `${K}.${keyof T[K] & string}`]: T[K]
}

export type Nullable<T> = T | null

export interface TemplatePageConfig {
  dynamic: React.ComponentType
  headProps: NextPageFC['headProps']
  layout: NextPageFC['layout']
  match(candidate: string): boolean
}

export interface TemplateSettings {
  defaultLayout: React.FC<any>
}
