import DefaultResolver from './core/admin/next-page-resolver'
import { getServerSideProps as defaultGetServerSideProps } from './core/admin/next-page-resolver'
import { GetServerSideProps } from 'next'
import { NextPageFC } from './core/shared/models/next-fc'
import React, { useMemo } from 'react'
import templatePages from '@/currentTemplate/pages/index'
import { Nullable, TemplatePageConfig } from './core/shared/types'

interface ResolverProps {
  templatePage?: string
}

const getTemplatePageConfigByName = (candidate: string): Nullable<TemplatePageConfig> => {
  return templatePages.find((t) => t.match(candidate)) || null
}

const checkExistPageInTemplate = (pageName: string) => {
  return Boolean(getTemplatePageConfigByName(pageName))
}

const getTemplatePageConfig = <C extends TemplatePageConfig, P extends keyof C>(
  pageName: string,
  key: P
): C[P] => {
  const pageConfig = getTemplatePageConfigByName(pageName)
  if (!pageConfig) {
    return null
  }

  return (pageConfig as any)[key]
}

const PageResolver: NextPageFC<ResolverProps> = (props) => {
  const { templatePage } = props
  const DynamicComponent = useMemo(() => {
    if (checkExistPageInTemplate(templatePage)) {
      return getTemplatePageConfig(templatePage, 'dynamic')
    }
    return null
  }, [templatePage])

  return DynamicComponent ? <DynamicComponent /> : <DefaultResolver {...(props as any)} />
}

const getOrCall = (item: any, extra: any): any => {
  if (typeof item === 'function') {
    return item(extra)
  }

  return item
}

PageResolver.headProps = (props) => {
  if (checkExistPageInTemplate(props.templatePage)) {
    return getOrCall(getTemplatePageConfig(props.templatePage, 'headProps'), props)
  }
  return getOrCall(DefaultResolver.headProps, props)
}

PageResolver.layout = (props) => {
  if (checkExistPageInTemplate(props.pageProps.templatePage)) {
    return getTemplatePageConfig(props.pageProps.templatePage, 'layout')(props)
  }
  return DefaultResolver.layout(props as any)
}

const getPageServerSideProps: GetServerSideProps<unknown, { rest: string[] }> = async (ctx) => {
  const params = ctx.params?.rest

  if (!params) {
    if (checkExistPageInTemplate('index')) {
      return {
        props: {
          templatePage: 'index',
        },
      }
    }
  } else {
    const joined = params.join('/')
    if (checkExistPageInTemplate(joined)) {
      return {
        props: {
          templatePage: joined,
        },
      }
    }
  }

  return defaultGetServerSideProps(ctx as any)
}

export const getServerSideProps = getPageServerSideProps
export default PageResolver
