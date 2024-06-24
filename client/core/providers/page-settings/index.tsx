import React, { useMemo, PropsWithChildren } from 'react'
import { PageSettings } from '@/core/admin/api-models/page-settings'
import { Settings } from '@/core/admin/api-models/settings'

interface ContextProps {
  pageSettings?: PageSettings
  appSettings?: SettingView
}

const Context = React.createContext<ContextProps | undefined>(undefined)

interface SettingView extends Settings {
  publicEmailsParsed: string[]
  phoneNumbersParsed: string[]
}

interface Props extends PropsWithChildren {
  pageSettings?: PageSettings
  appSettings?: Settings
}

/**
 * Данный провайдер собирает в себе все серверные настройки страниц
 * которые были сформированы в объекте `pageSettings` на серверной стороне
 * приложения.
 *
 * На перспективу будет использоваться с CMS.
 * @param children
 * @param pageSettings
 * @param appSettings
 * @constructor
 */
export const PageSettingsProvider: React.FC<Props> = ({ children, pageSettings, appSettings }) => {
  const value = useMemo((): ContextProps => {
    return (
      {
        pageSettings,
        appSettings: {
          ...appSettings,
          phoneNumbersParsed: appSettings?.phoneNumber?.split(',') || [''],
          publicEmailsParsed: appSettings?.publicEmail?.split(',') || [''],
        },
      } || {}
    )
  }, [appSettings, pageSettings])
  return <Context.Provider value={value}>{children}</Context.Provider>
}

export const usePageSettings = () => React.useContext(Context) as ContextProps
