import { AvailableComponentTypes, PageNode, PageNodeViewModel } from '../../types';
import { useNodeParams } from '../../hooks/useNodeParams';
import React, { useMemo } from 'react';
import sections from '@/currentTemplate/sections/index';

import { PageSettings } from '../../api-models/page-settings';
import { safeParseJsonValue } from '../../utils';
import { usePageSettings } from '../../../providers/page-settings';
import { requireNotNull } from '../../../shared/pipes/config';

interface SectionProps {
  node: PageNode | null;
  pageSettings: PageSettings;
}

/**
 * __crud_EntityName_Single => __crud_EntityName
 * __crud_EntityName_ShortList => __crud_EntityName
 */
const getCrudNameBySectionName = (name: string): string => {
  return name.replace(/(__crud_\w+)_(Single|ShortList)/g, (_, match) => match);
};

const isCrud = (name: string): boolean => {
  return /__crud_\w+(Single|ShortList)/g.test(name);
};

const SectionComponent: React.FC<SectionProps> = ({ node, pageSettings }) => {
  const nodeParams = useNodeParams(node?.nodeParam);
  const sectionName = node?.name;
  const globalSettings = usePageSettings();

  const Component: any = useMemo(() => {
    try {
      const sectionExist = sectionName in sections;
      if (sectionExist) {
        return sections[sectionName];
      }

      throw new Error(`${sectionName} not exist in client side`);
    } catch (err) {
      return () => <div>render error - {sectionName}</div>;
    }
  }, [sectionName]);

  const crudProps = useMemo(() => {
    const results: any = {};
    const isCrudSection = isCrud(sectionName);

    const meta = node.nodeParam.find((p) => p.componentType === AvailableComponentTypes.Meta);
    const parsedMeta = safeParseJsonValue<any>(meta?.value as any, {});

    results.all = parsedMeta.all;
    results.items = pageSettings?.admin?.crudListData[sectionName];

    const getCrudConfig = () => {
      const crudConfigName = getCrudNameBySectionName(sectionName);
      return requireNotNull(
        globalSettings.appSettings.cruds.find((crud) => crud.name === crudConfigName),
        'Crud config not exist'
      );
    };

    const getCrudListPageLink = () => {
      const crudConfig = getCrudConfig();
      return `/${crudConfig.path}`;
    };

    results.getCrudListPageLink = !isCrudSection ? undefined : getCrudListPageLink;

    results.getCrudItemPageLink = !isCrudSection
      ? undefined
      : (instance: any) => {
          const crudConfig = getCrudConfig();
          return `${getCrudListPageLink()}/${instance[crudConfig.slug.field]}`;
        };

    if (/__crud_(\w+)_Single/g.test(sectionName)) {
      const singleData = pageSettings?.admin?.crudSingleData[sectionName];
      if (singleData) {
        results.item = singleData[parsedMeta.slug];
      }
    }

    return results;
  }, [pageSettings, sectionName, node, globalSettings]);

  return <Component node={node} nodeParams={nodeParams} {...crudProps} />;
};

interface AdminPageNodeProps {
  nodeViewModel: PageNodeViewModel | null;
  pageSettings: PageSettings;
}

export const AdminPageNode = ({ nodeViewModel, pageSettings }: AdminPageNodeProps) => {
  const node = nodeViewModel?.value || ({} as any);

  return <SectionComponent pageSettings={pageSettings} node={node} />;
};
