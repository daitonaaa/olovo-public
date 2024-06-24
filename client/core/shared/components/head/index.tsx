import React, { useMemo } from 'react'
import NextHead from 'next/head'
import { useRouter } from 'next/router'
import { IStateProps } from './model'
import { getAppConfig } from '../../pipes/config'
import { usePageSettings } from '../../../providers/page-settings'
import parse from 'html-react-parser'
import { useVarsReplacer } from '../../../admin/hooks/useNodeParams'

export const Head: React.FC<IStateProps> = (props) => {
  const { ogImageName } = props
  const { asPath } = useRouter()
  const ogUrl = `${getAppConfig().HOST}${asPath}`
  const { appSettings } = usePageSettings()
  const parsedScripts = parse(appSettings.head || '')
  const replacer = useVarsReplacer()

  const { headTitle, description, ogDescription, ogTitle, title } = useMemo(() => {
    const title = replacer(props.title)
    return {
      headTitle: replacer(`${appSettings.siteName} - ${title}`),
      description: replacer(props.description),
      ogDescription: replacer(props.ogDescription),
      ogTitle: replacer(props.ogTitle),
      title,
    }
  }, [appSettings, props])

  return (
    <NextHead>
      <title>{headTitle}</title>
      <meta name="title" content={headTitle} />
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={`/og/images/${ogImageName}`} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:locale" content="ru" />
      <meta property="og:country-name" content="Россия" />
      <meta
        name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;700;800&display=swap"
        rel="stylesheet"
      />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

      {parsedScripts}
    </NextHead>
  )
}
