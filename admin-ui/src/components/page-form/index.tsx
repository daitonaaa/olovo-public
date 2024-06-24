import { Box, Button, Drawer, IconButton, ListItem, ListItemText, Typography } from '@material-ui/core';
import { Form, FormikProvider, useFormik } from 'formik';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { PageForm } from '../../http/models/view-models';
import { TextField } from '../fields/text-field';
import { BoxWrapper, ComponentPickerWrapper, PlusButtonWrapper } from '../styled';
import { INITIAL_VALUES } from './initial-values';
import { FormNode } from './node-form';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { deletePageNode, getComponents } from '../../http/endpoints';
import { PageNodeFormItem } from './factory';
import { getRangeArr, requireNotNull, rusTextToLat } from '../../utils';
import { FormikSwitch } from '../fields/switch';
import { FieldType } from '../../http/models/api';
import {
  FormWrapper,
  ControlsWrapper,
  StatusWrapper,
  AutoStretchWrapper,
  AutoStretchMirror,
  EmptyFallback,
} from './styled';
import { Help } from './help';
import { useConfirmDialog } from '../../providers/confirm-dialog';
import { ExtractKeys, Nullable } from '../../types';
import { MarginWrapper } from '../../theme/wrappers';
import { DateTime } from 'luxon';
import { PAGE_LAYOUT_BOTTOM_OFFSET } from '../layouts/PageLayout/styled';
import { BrandingWatermark } from '@material-ui/icons';
import { AnimateWrapper } from '../animate-wrapper';

interface Props {
  disabledFields?: ExtractKeys<Omit<PageForm, 'nodes'>>[];

  initialValues?: PageForm;

  onCopy?(value: PageForm): void;

  onDelete?(id: number): void;

  onSubmit(values: PageForm): Promise<void>;
}

interface ComponentPickerProps {
  items: { id: number; label: string }[];

  onSelect(id: number): void;
}

export const ComponentPicker = ({ items, onSelect }: ComponentPickerProps) => {
  return (
    <ComponentPickerWrapper>
      {items.map(item => (
        <ListItem key={item.id} style={{ cursor: 'pointer' }} onClick={() => onSelect(item.id)}>
          <ListItemText>{item.label}</ListItemText>
        </ListItem>
      ))}
    </ComponentPickerWrapper>
  );
};

const GREEDY_COMPONENTS_NAMES = {
  tabs: {
    childPrefix: 'Таб',
  },
  faq: {
    childPrefix: 'Faq',
  },
};

export const isGreedyComponent = (candidate: string) => !!(GREEDY_COMPONENTS_NAMES as any)[candidate];

const getOffsetTop = (element: any): any => {
  if (!element) return 0;
  return getOffsetTop(element.offsetParent) + element.offsetTop;
};

const AutoStretchBottom: React.FC = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mirrorRef = useRef<HTMLDivElement>(null);
  const [freezeWidth, setFreezeWidth] = useState<Nullable<number>>(null);
  const [freezePosition, setFreezePosition] = useState<'top' | 'bottom'>('top');
  const [componentHeight, setComponentHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (ref.current) {
      setComponentHeight(ref.current.getBoundingClientRect().height);
    }
  }, []);

  const isFreezeMode = (rect: DOMRect) => {
    const offsetBottom = Math.abs(rect.top) + rect.bottom;
    return offsetBottom === rect.height;
  };

  const toFixed = (num: number) => +num.toFixed(0);

  useEffect(() => {
    const handler = () => {
      const nodeEl = ref.current;
      const mirror = requireNotNull(mirrorRef.current);
      if (nodeEl) {
        const rect = nodeEl.getBoundingClientRect();
        const mirrorRect = mirror.getBoundingClientRect();
        const bodyRect = document.body.getBoundingClientRect();

        const isDisabled =
          toFixed(bodyRect.height) <= toFixed(getOffsetTop(nodeEl) + rect.height + PAGE_LAYOUT_BOTTOM_OFFSET);

        if (!isDisabled) {
          if (isFreezeMode(rect) && !freezeWidth) {
            const isLargeScreen = window.innerHeight > rect.height;
            setFreezePosition(isLargeScreen ? 'top' : 'bottom');
            setFreezeWidth(rect.width);
          } else if (freezeWidth && !isFreezeMode(mirrorRect)) {
            setFreezeWidth(null);
          }
        }
      }
    };

    document.addEventListener('scroll', handler);
    return () => document.removeEventListener('scroll', handler);
  }, [freezeWidth, componentHeight]);

  return (
    <>
      <AutoStretchMirror style={{ height: componentHeight }} ref={mirrorRef} />
      <AutoStretchWrapper style={{ [freezePosition]: freezeWidth && '15px' }} fixedWidth={freezeWidth} ref={ref}>
        {children}
      </AutoStretchWrapper>
    </>
  );
};

export const PageFormComponent: React.FC<Props> = props => {
  const initialValues = props.initialValues || INITIAL_VALUES;
  const [isOpenComponentPicker, setComponentPickerVisible] = useState(false);
  const { data: components } = useQuery(['get_components'], getComponents);
  const confirmDialog = useConfirmDialog();

  const form = useFormik<PageForm>({
    initialValues,
    validateOnBlur: false,
    enableReinitialize: true,
    async onSubmit(values: PageForm) {
      await props.onSubmit(values);
    },
  });

  const labelsMap = useMemo(() => {
    const results = new Map<number, string[]>();
    form.values.nodes.forEach((node, nodeIndex) => {
      if (Object.keys(GREEDY_COMPONENTS_NAMES).includes(node.name)) {
        const stringArray = node.nodeParam.find(param => param.componentType === FieldType.StringArray)?.value || '';
        const sectionNames: string[] = stringArray.split('\n');

        const rangeStart = nodeIndex + 1;
        const rangeArr = getRangeArr(rangeStart, rangeStart + sectionNames.length - 1);

        rangeArr.forEach((rangeIndex, i) => {
          if (sectionNames[i]) {
            const prefix = requireNotNull((GREEDY_COMPONENTS_NAMES as any)[node.name]).childPrefix;
            results.set(rangeIndex, [`${prefix} (${i + 1} из ${rangeArr.length}): ${sectionNames[i]}`]);
          }
        });
      }
    });

    return results;
  }, [form.values]);

  const handleCopy = () => {
    if (props.onCopy) {
      props.onCopy(form.values);
    }
  };

  const handleDelete = () => {
    if (props.onDelete) {
      props.onDelete(form.values.settings.id!);
    }
  };

  const toggleVisibleComponentPicker = () => {
    setComponentPickerVisible(state => !state);
  };

  const handleAddBlock = (componentId: number) => {
    toggleVisibleComponentPicker();
    const component = requireNotNull(
      components?.find(c => c.id === componentId),
      'Page not exist'
    );
    const node = new PageNodeFormItem(componentId);
    node.name = component.name;
    node.label = component.label;

    component.componentTemplate.forEach(template => {
      node.addNodeParam({
        componentType: template.componentType,
        value: '',
      });
    });

    form.setValues({
      ...form.values,
      nodes: [...form.values.nodes, node],
    });
  };

  const handlRemoveBlock = (blockIndex: number, id?: number) => {
    confirmDialog.show({
      dialogText: 'Вы уверенны что хотите удалить блок? Данное действие не возможно отменить',
      onApply: () => {
        if (id) deletePageNode(id);
        form.setValues({
          ...form.values,
          nodes: form.values.nodes.filter((_, i) => i !== blockIndex),
        });
      },
    });
  };

  const handleMoveBlock = (index: number, direction: 'up' | 'down') => {
    const { nodes } = form.values;

    const currentBlock = nodes[index];
    const prevBlock = nodes[index - 1];
    const nextBlock = nodes[index + 1];

    const updatedNodes = nodes.slice();

    if (direction === 'up') {
      updatedNodes[index - 1] = currentBlock;
      updatedNodes[index] = prevBlock;
    } else {
      updatedNodes[index + 1] = currentBlock;
      updatedNodes[index] = nextBlock;
    }

    form.setValues({
      ...form.values,
      nodes: updatedNodes,
    });
  };

  const handleBlurUrl = () => {
    if (form.values.settings.name && !form.values.settings.url) {
      form.setFieldValue('settings.url', `/${rusTextToLat(form.values.settings.name)}`);
    }
  };

  const checkFieldDisabled = (fieldName: ExtractKeys<Omit<PageForm, 'nodes'>>) => {
    if (!props.disabledFields) {
      return false;
    }

    return props.disabledFields.includes(fieldName);
  };

  const lastChangedDate = useMemo(() => {
    const candidate = initialValues?.settings.lastChangedDate;
    if (candidate) {
      return DateTime.fromJSDate(new Date(candidate)).toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS);
    }
    return null;
  }, [initialValues?.settings.lastChangedDate]);

  const hasNodes = form.values.nodes.length > 0;

  return (
    <FormikProvider value={form}>
      <Form>
        <FormWrapper>
          <div>
            <AnimateWrapper delay={300}>
              {!hasNodes && (
                <EmptyFallback>
                  <BrandingWatermark fontSize="large" />
                  <div>Вы еще не добавляли компонентов, нажмите на + для выбора</div>
                </EmptyFallback>
              )}
              {form.values.nodes.map((node, index) => (
                <AnimateWrapper key={`${node.name}_${index}`} delay={100 * index}>
                  <FormNode
                    index={index}
                    onRemoveBlock={() => handlRemoveBlock(index, node.id)}
                    onMoveBlock={handleMoveBlock}
                    isFirst={!index}
                    getLabels={index => labelsMap.get(index)}
                    isLast={index === form.values.nodes.length - 1}
                  />
                </AnimateWrapper>
              ))}
              <AnimateWrapper delay={hasNodes ? 100 * form.values.nodes.length + 150 : 0}>
                <Box textAlign={'center'} marginY={2}>
                  <PlusButtonWrapper>
                    <IconButton onClick={toggleVisibleComponentPicker}>
                      <AddCircleOutlineIcon color="primary" />
                    </IconButton>
                  </PlusButtonWrapper>
                </Box>
              </AnimateWrapper>
            </AnimateWrapper>
          </div>
          <div style={{ position: 'relative' }}>
            <AutoStretchBottom>
              <AnimateWrapper>
                <BoxWrapper>
                  <StatusWrapper>
                    <FormikSwitch
                      name="settings.isPublished"
                      label={form.values.settings.isPublished ? 'Опубликована' : 'Опубликовать'}
                    />
                    {lastChangedDate && (
                      <MarginWrapper style={{ opacity: 0.6 }}>
                        Дата обновления: <br />
                        {lastChangedDate}
                      </MarginWrapper>
                    )}
                  </StatusWrapper>
                </BoxWrapper>
              </AnimateWrapper>
              <MarginWrapper marginTop="l" />
              <AnimateWrapper delay={100}>
                <BoxWrapper>
                  <Typography variant="h5">Основные настройки</Typography>
                  <br />
                  <TextField onBlur={handleBlurUrl} name="settings.name" label="Название страницы" fullWidth required />
                  <br />
                  <TextField
                    name="settings.url"
                    label="URL"
                    fullWidth
                    required
                    disabled={checkFieldDisabled('settings.url')}
                  />
                  <br />
                  <TextField name="settings.meta.title.value" label="Заголовок страницы" fullWidth />
                  <br />
                  <TextField
                    name="settings.meta.desc.value"
                    label="Описание страницы"
                    fullWidth
                    multiline
                    maxRows={4}
                  />
                  <br />
                  <TextField name="settings.meta.ogTitle.value" label="OG Заголовок" fullWidth />
                  <br />
                  <TextField name="settings.meta.ogDescription.value" label="OG Описание" fullWidth />
                  <br />
                  <TextField name="settings.meta.ogImageSource.value" label="OG Картинка" fullWidth />
                  <br />
                  <br />
                  <ControlsWrapper>
                    <div>
                      <Button color="primary" variant="contained" type="submit">
                        Сохранить
                      </Button>
                    </div>
                    <div>
                      <Button variant="outlined">Отменить</Button>
                    </div>
                    {props.onCopy && (
                      <div>
                        <Button variant="outlined" onClick={handleCopy}>
                          Скопировать
                        </Button>
                      </div>
                    )}
                    {form.values.settings.id && props.onDelete && (
                      <div>
                        <Button onClick={handleDelete} variant="outlined">
                          Удалить
                        </Button>
                      </div>
                    )}
                  </ControlsWrapper>
                </BoxWrapper>
              </AnimateWrapper>
            </AutoStretchBottom>
          </div>
        </FormWrapper>
      </Form>
      <Drawer onClose={toggleVisibleComponentPicker} open={isOpenComponentPicker}>
        <ComponentPicker
          items={
            components
              ? components
                  .filter(c => !c.name.includes('_Single'))
                  .map(component => ({
                    label: component.label,
                    id: component.id,
                  }))
              : []
          }
          onSelect={handleAddBlock}
        />
      </Drawer>
      <Help />
    </FormikProvider>
  );
};
