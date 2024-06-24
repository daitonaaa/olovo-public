import { componentTypeMeta } from '../../../../http/models/componentTypeMeta';
import React from 'react';
import { PageNodeParamForm } from '../../../../http/models/view-models';
import { FormikFieldResolver } from '../../../formik-field-resolver';

interface Props {
  node: PageNodeParamForm;
  name: string;
}

export const NodeFormField = ({ node, name }: Props) => {
  return (
    <FormikFieldResolver
      name={name}
      label={componentTypeMeta[node.componentType].title}
      fieldType={node.componentType}
    />
  );
};
