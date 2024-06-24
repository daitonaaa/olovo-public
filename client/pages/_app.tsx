import type { AppProps } from 'next/app'
import { NextPageContext } from 'next'
import { useUserAgent } from 'next-useragent'
import { UserAgentProvider } from '../core/providers/user-agent'
import { PageSettingsProvider } from '../core/providers/page-settings'
import { PageSettings } from '../core/admin/api-models/page-settings'
import { NextPageFC } from '../core/shared/models/next-fc'
import React, { PropsWithChildren, useMemo } from 'react'
import { Head } from '../core/shared/components/head'
import { ThemeProvider } from '../core/theme-utils/provider'
import { getSettings } from '../core/admin/http'
import { Settings } from '../core/admin/api-models/settings'
import { CityProvider } from '@/core/providers/city-provider'

interface PageProps extends AppProps<{ pageSettings?: PageSettings }> {
  Component: NextPageFC<any, any>
  userAgent: any
  settings: Settings
  err: any
}

const DefaultLayout: React.FC<PropsWithChildren> = ({ children }) => <>{children}</>

const createLayout = (
  ComponentConfig: NextPageFC<any, any>,
  pageProps: any
): [React.FC<PropsWithChildren>, Record<any, any>] => {
  if (ComponentConfig.layout) {
    return [ComponentConfig.layout, { ...ComponentConfig.layoutProps, pageProps }]
  }

  return [DefaultLayout, ComponentConfig.layoutProps || {}]
}

function MyApp({ Component, pageProps, err, userAgent, settings }: PageProps) {
  const headProps =
    typeof Component.headProps === 'function' ? Component.headProps(pageProps) : Component.headProps
  // https://adamwathan.me/2019/10/17/persistent-layout-patterns-in-nextjs/
  const [Layout, layoutProps] = useMemo(
    () => createLayout(Component, pageProps),
    [Component, pageProps]
  )

  return (
    <PageSettingsProvider pageSettings={pageProps?.pageSettings} appSettings={settings}>
      <UserAgentProvider userAgent={userAgent}>
        <CityProvider>
          <ThemeProvider>
          <Head {...headProps} />
          <Layout {...layoutProps}>
            <Component {...pageProps} err={err} />
          </Layout>
        </ThemeProvider>
        </CityProvider>
      </UserAgentProvider>
    </PageSettingsProvider>
  )
}

MyApp.getInitialProps = async ({ ctx }: { ctx: NextPageContext }) => {
  const userAgentHeaders = ctx.req && ctx.req.headers && ctx.req.headers['user-agent']
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const userAgent = userAgentHeaders ? useUserAgent(userAgentHeaders) : undefined

  let settings: Settings
  try {
    settings = await getSettings()
  } catch {
    // silence
  }

  return {
    userAgent,
    settings,
  }
}

export default MyApp
