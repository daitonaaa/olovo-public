import getConfig from 'next/config'

const {
  publicRuntimeConfig: { WebAppConfig },
} = getConfig()

export const getAppConfig = () => WebAppConfig

export const isProduction = getConfig().mode === 'production'

export function requireNotNull<T>(value: T | undefined | null, message?: string): T {
  if (value === undefined || value === null) {
    throw new TypeError(message ?? 'Required value is not defined')
  }
  return value
}

export const isClient = typeof window !== 'undefined'
