import { AvailableComponentTypes, NodeParam } from '../types'
import { useCallback, useMemo } from 'react'
import { usePageSettings } from '../../providers/page-settings'
import { useRouter } from 'next/router'
import _ from 'lodash'

type Getter = <T>(componentType: AvailableComponentTypes, defaultValue?: T) => string | T

const getParam = <T>(
  params: NodeParam[],
  componentType: AvailableComponentTypes,
  replacer: (str: string) => string,
  defaultValue?: T
) => {
  const rawValue = params.find((n) => n.componentType === componentType)?.value || defaultValue
  if (typeof rawValue === 'string') {
    return replacer(rawValue)
  }
  return rawValue
}

export const replaceDynamicVars = <T extends object>(toReplace: T, extraVars?: object): T => {
  const vars: [RegExp, any][] = [
    [/(%YYYY%)/g, new Date().getFullYear()],
    [/(%n%)/g, '\xA0'],
  ]

  if (extraVars) {
    Object.keys(extraVars).forEach((key) => {
      vars.push([new RegExp(key), extraVars[key]])
    })
  }

  const copy = { ...toReplace }
  Object.keys(copy).forEach((key) => {
    if (!copy[key] || typeof copy[key] !== 'string') {
      return
    }

    vars.forEach(([regExp, valOrReplacer]) => {
      if (regExp.test(copy[key])) {
        copy[key] = copy[key].replace(regExp, valOrReplacer)
      }
    })
  })

  return copy
}

export const useVarsReplacer = (): ((raw: string) => string) => {
  const { appSettings, pageSettings } = usePageSettings()
  const router = useRouter()
  const extraVars: { [key: string]: string } = useMemo(() => {
    const results = {}

    /**
     * Make variables for crud single page
     */
    if (appSettings.cruds) {
      const [, path, slug] = router.asPath.split('/')
      if (path && slug) {
        const crudConfig = appSettings?.cruds.find((crud) => crud.path === path)
        if (crudConfig) {
          const crudData = _.get(
            pageSettings,
            `admin.crudSingleData.${crudConfig.name}_Single.${slug}`
          )
          if (crudData) {
            results['%crud_entityLabelField%'] = crudData[crudConfig.entityLabelField]
            for (const field of crudConfig.viewModelFields) {
              results[`%crud_instance_field_${field}%`] = crudData[field]
            }
          }
        }
      }
    }

    return results
  }, [appSettings, pageSettings])

  const replacer = useCallback((raw: string) => {
    return replaceDynamicVars({ value: raw }, extraVars).value
  }, [])

  return replacer
}

export const useNodeParams = (params: NodeParam[]): { get: Getter } => {
  const replacer = useVarsReplacer()
  const getter: Getter = useCallback(
    (componentType, defaultValue) => {
      return getParam(params, componentType, replacer, defaultValue)
    },
    [params]
  )

  return {
    get: getter,
  }
}

export const useNodeParamsGetterCreator = (): { createGetter(params: NodeParam[]): Getter } => {
  const replacer = useVarsReplacer()

  const createGetter = useCallback(
    (params: NodeParam[]): Getter => {
      return (componentType, defaultValue) =>
        getParam(params, componentType, replacer, defaultValue)
    },
    [replacer]
  )

  return {
    createGetter,
  }
}
