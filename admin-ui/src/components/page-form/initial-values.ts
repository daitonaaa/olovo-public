import { PageForm } from '../../http/models/view-models';

export const INITIAL_VALUES: PageForm = {
  settings: {
    name: '',
    url: '',
    isRegional: false,
    isPublished: false,
    isCrud: false,
    meta: {
      title: {
        value: '',
      },
      desc: {
        value: '',
      },
      ogDescription: {
        value: '',
      },
      ogTitle: {
        value: '',
      },
      ogImageSource: {
        value: '',
      },
    },
  },
  nodes: [],
};
