import { PageMetaType } from '../../http/models/api';
import { PageMetaParamForm, PageNodeForm, PageNodeParamForm } from '../../http/models/view-models';

export class PageNodeFormItem implements PageNodeForm {
  componentId: number;
  id?: number;
  name = '';
  label = '';
  isWrappedContainer = false;
  nodeParam: PageNodeParamForm[] = [];

  constructor(componentId: number) {
    this.componentId = componentId;
  }

  addNodeParam(source: PageNodeParamForm): this {
    this.nodeParam.push(source);
    return this;
  }
}

export class PageMetaFormItem implements PageMetaParamForm {
  id?: number;
  value = '';
  role = PageMetaType.Title;
}
