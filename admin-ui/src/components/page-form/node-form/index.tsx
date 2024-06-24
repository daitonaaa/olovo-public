import { Chip, IconButton, Typography } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useMemo } from 'react';
import { BlockFormWrapper, Chips, Header, TitleWrapper, Controls } from './styled';
import { useFormikContext } from 'formik';
import { PageForm, PageNodeForm } from '../../../http/models/view-models';
import { NodeFormField } from './field';
import { FormikSwitch } from '../../fields/switch';
import { FieldType } from '../../../http/models/api';
import { safeParseJsonValue } from '../../../utils';

interface Props {
  index: number;
  isFirst: boolean;
  isLast: boolean;

  onRemoveBlock(blockIndex: number): void;

  onMoveBlock(index: number, direction: 'up' | 'down'): void;

  getLabels?(index: number): string[] | undefined;
}

export const FormNode: React.FC<Props> = ({ index, isFirst, isLast, onRemoveBlock, onMoveBlock, getLabels }) => {
  const getBlockFieldByIndex = (fieldName: string) => `nodes[${index}].${fieldName}`;

  const formikContext = useFormikContext<PageForm>();
  const { value: node } = formikContext.getFieldMeta<PageNodeForm>(`nodes[${index}]`);

  const labels: string[] = useMemo(() => {
    return getLabels ? getLabels(index) || [] : [];
  }, [getLabels]);

  const isDeleteDisabled = useMemo(() => {
    const metaNodeParam = (node.nodeParam || []).find(p => p.componentType === FieldType.Meta);
    if (metaNodeParam?.value) {
      return !!safeParseJsonValue<any>(metaNodeParam.value, {}).readonly;
    }
    return false;
  }, [node]);

  return (
    <BlockFormWrapper>
      <Header>
        <TitleWrapper>
          <Typography variant="h5">{node.label}</Typography>
          <Chips>
            {labels.map(label => (
              <Chip label={label} variant="outlined" color="primary" key={label} />
            ))}
          </Chips>
        </TitleWrapper>
        <Controls>
          <IconButton onClick={() => onMoveBlock(index, 'up')} disabled={isFirst}>
            <ArrowUpwardIcon color="inherit" />
          </IconButton>

          <IconButton onClick={() => onMoveBlock(index, 'down')} disabled={isLast}>
            <ArrowDownwardIcon color="inherit" />
          </IconButton>

          {!isDeleteDisabled && (
            <IconButton onClick={() => onRemoveBlock(index)}>
              <DeleteIcon color="inherit" />
            </IconButton>
          )}
        </Controls>
      </Header>
      {(node.nodeParam || []).map((node, i) => (
        <NodeFormField key={node.id} node={node} name={getBlockFieldByIndex(`nodeParam[${i}].value`)} />
      ))}
      <div>
        <FormikSwitch size="small" name={`${getBlockFieldByIndex('isWrappedContainer')}`} label="Применить обвертку" />
      </div>
    </BlockFormWrapper>
  );
};
