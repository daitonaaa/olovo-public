import { PageNodeViewModel } from '../types'
import { useNodeParams } from '../hooks/useNodeParams'

export interface EditableSectionProps {
  node: PageNodeViewModel
  nodeParams: ReturnType<typeof useNodeParams>
}
