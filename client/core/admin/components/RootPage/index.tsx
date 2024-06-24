import { PageSettings } from '../../api-models/page-settings'
import React, { useMemo } from 'react'
import { AvailableComponentTypes, PageNodeViewModel } from '../../types'
import { getRangeArr } from '../../utils'
import { useNodeParamsGetterCreator } from '../../hooks/useNodeParams'
import { AdminPageNode } from './node'

export const AdminRootPage = ({ pageSettings }: { pageSettings: PageSettings }) => {
  const { admin } = pageSettings
  const nodeParamsGetter = useNodeParamsGetterCreator()
  const sortedNodes = useMemo(
    () => [...admin.page.pageNode].sort((a, b) => a.order - b.order),
    [admin.page.pageNode]
  )

  const nodeViewModels = useMemo(() => {
    const arr: PageNodeViewModel[] = []
    for (let cursor = 0; cursor < sortedNodes.length; cursor++) {
      const node = sortedNodes[cursor]
      if (['tabs', 'faq'].every((name) => name !== node.name)) {
        arr.push({ value: node })
        continue
      }

      const getter = nodeParamsGetter.createGetter(node.nodeParam)
      const tabsLen = getter(AvailableComponentTypes.stringArray, '').split('\n').length
      const range = getRangeArr(cursor, cursor + tabsLen).slice(1)
      const childs = range.map((i) => sortedNodes[i])
      arr.push({
        value: node,
        children: childs.map((child) => {
          if (child) {
            return {
              value: child,
            }
          }

          return null
        }),
      })
      cursor = range[range.length - 1]
    }

    return arr
  }, [sortedNodes])

  return (
    <>
      {nodeViewModels.map((node) => {
        if (node.value?.isWrappedContainer) {
          return (
            <div key={node.value.id}>
              <AdminPageNode pageSettings={pageSettings} nodeViewModel={node} />
            </div>
          )
        }
        return (
          <AdminPageNode pageSettings={pageSettings} key={node.value.id} nodeViewModel={node} />
        )
      })}
    </>
  )
}
