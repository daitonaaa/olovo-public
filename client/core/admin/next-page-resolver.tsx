import React from 'react';
import { GetServerSideProps } from 'next';
import { NextPageFC } from '../shared/models/next-fc';
import { getCrudList, getCrudSingleBySlug, getMenu, getPageConfigByUrl, getSettings } from './http';
import { PageSettings } from './api-models/page-settings';
import { AdminRootPage } from './components/RootPage';
import { AdminNotFoundPage } from './errors';
import { AvailableComponentTypes, PageConfig, PageMetaType } from './types';
import templateSettings from '@/currentTemplate/settings';
import { getMenuDataFromApi, safeParseJsonValue } from './utils';
import { DefaultNotFound } from '@/core/shared/components/defaultNotFound';
import { MenuResponseApiModel } from '@/core/admin/api-models/menu';

interface ResolverProps {
  pageSettings?: PageSettings;
  isApiOffline?: boolean;
  axiosFailedConfig?: string;
}

const Resolver: NextPageFC<ResolverProps> = ({ pageSettings, isApiOffline, axiosFailedConfig }) => {
  if (pageSettings?.admin?.page) {
    return <AdminRootPage pageSettings={pageSettings} />;
  }

  return (
    <>
      <div>{isApiOffline ? <b>[API] Connect error</b> : <DefaultNotFound />}</div>
      {axiosFailedConfig && <pre>{axiosFailedConfig}</pre>}
    </>
  );
};

Resolver.layout = templateSettings.defaultLayout;

Resolver.headProps = (props) => {
  if (props.pageSettings?.admin?.page) {
    const getMeta = (type: PageMetaType) =>
      props.pageSettings.admin.page.pageMeta.find((m) => m.role === type)?.value;
    return {
      title: getMeta(PageMetaType.Title),
      description: getMeta(PageMetaType.Description),
      ogDescription: getMeta(PageMetaType.OgDesc),
      ogImageName: getMeta(PageMetaType.OgImageSource),
      ogTitle: getMeta(PageMetaType.OgTitle),
    };
  }

  return {
    title: 'Страница не найдена',
  };
};

export const getServerSideProps: GetServerSideProps<ResolverProps, { rest: string[] }> = async (
  context
) => {
  try {
    const path = (() => {
      if (context.req.url === '/') {
        return '/';
      }

      const joined = context.params?.rest.join('/');
      if (!joined) {
        return '/';
      }
      return `/${joined}`;
    })();

    const requestList: [Promise<PageConfig>, Promise<MenuResponseApiModel>] = [
      getPageConfigByUrl(path),
      getMenu(),
    ];

    const [pageConfig, menuData] = await Promise.all(requestList);

    if (!pageConfig.isPublished) {
      throw new AdminNotFoundPage();
    }

    // ------- Integrate Crud List ---------
    const crudListData: any = {};
    const listCandidates = [];
    for (const pageNode of pageConfig.pageNode) {
      const listReg = /__crud_(.+)_ShortList/gim;
      const isTested = listReg.test(pageNode.name);
      if (isTested) {
        listCandidates.push(pageNode);
      }
    }

    // ------- Integrate Crud Single ---------
    // TODO расширять функционал здесь
    // @ts-ignore
    const list: any = [...new Set(listCandidates.map((n) => n.name))];
    for (const listItem of list) {
      const crudName = listItem.replace('_ShortList', '');
      crudListData[listItem] = await getCrudList(crudName);
    }

    const crudSingleData: any = {};
    const singleReg = /__crud_(\w+)_Single/g;
    const singleCandidates = pageConfig.pageNode.filter((n) => singleReg.test(n.name));

    for (const singleCandidate of singleCandidates) {
      const crudName = singleCandidate.name.replace('_Single', '');
      const metaParam = singleCandidate.nodeParam.find(
        (param) => param.componentType === AvailableComponentTypes.Meta
      );
      const slug = safeParseJsonValue<any>(metaParam?.value, {}).slug;
      if (!slug) {
        continue;
      }
      crudSingleData[singleCandidate.name] = {
        ...crudSingleData[singleCandidate.name],
        [slug]: await getCrudSingleBySlug(crudName, slug),
      };
    }

    return {
      props: {
        pageSettings: {
          admin: {
            crudListData,
            crudSingleData,
            page: pageConfig,
            menu: getMenuDataFromApi(menuData),
          },
        },
      },
    };
  } catch (err) {
    const apiErrorSomeCases = [
      err instanceof AdminNotFoundPage,
      err.isAxiosError && err.response?.status === 404,
    ];
    if (apiErrorSomeCases.some(Boolean)) {
      context.res.statusCode = 404;
      if (err?.code === 'ECONNREFUSED') {
        return {
          props: {
            isApiOffline: true,
            axiosFailedConfig: `${err.address}, Config: ${JSON.stringify(err.config, null, 2)}`,
          },
        } as any;
      }

      return { props: {} } as any;
    }

    return { props: {} } as any;
  }
};

export default Resolver;
