import { PageLayout } from '../../components/layouts/PageLayout';
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useSettings } from '../../http/query-hooks';
import { useParams } from 'react-router';
import { CrudConfig } from '../../http/models/view-models';
import { Button, IconButton } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { routes } from '../../routes';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import EditIcon from '@material-ui/icons/Edit';
import TableContainer from '@material-ui/core/TableContainer';
import { useQuery } from 'react-query';
import { getCrudList } from '../../http/endpoints';
import { AnimateWrapper } from '../../components/animate-wrapper';
import { AddCircle, RemoveRedEye } from '@material-ui/icons';
import { createSiteUrlByPath } from '../../utils';
import { MarginWrapper } from '../../theme/wrappers';
import { DateTime } from 'luxon';

const getDate = (item: any) => {
  const date = item.updatedAt || item.dateCreated;
  if (!date) {
    return '-';
  }

  return DateTime.fromJSDate(new Date(date)).toFormat('dd.MM, HH:mm');
};

const reorder = (list: any, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
  ...draggableStyle,
});

const controlIconWidth = 50;
const dateColumnWith = 150;
const controlsCount = 2;
const tableWidth = 1200;

const CrudList = () => {
  const params = useParams<{ name: string }>();
  const history = useHistory();
  const { data: settings } = useSettings();
  const currentCrud: CrudConfig | undefined = settings?.cruds?.find(i => i.name === params.name);
  const { data: crudData } = useQuery([`${params.name}_get_list`], () => getCrudList(params.name) as any, {
    enabled: !!currentCrud,
  });

  const [rows, setRows] = useState<any>(null);

  useEffect(() => {
    if (crudData) {
      setRows(() => {
        return crudData
          .map((i: any) => {
            return {
              ...i,
              id: `row-${i.id}`,
            };
          })
          .sort((a: any, b: any) => a.order - b.order);
      });
    }
  }, [crudData]);

  if (!currentCrud || !settings?.cruds) {
    return <PageLayout title="" />;
  }

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;
    const newItems = reorder(rows, source.index, destination.index);
    setRows(newItems);
    return;
  };

  const colummnWith =
    (tableWidth - controlIconWidth * controlsCount - dateColumnWith) / currentCrud.tableColumns.length;

  return (
    <PageLayout
      key={params.name}
      title={currentCrud.label}
      headerRightContent={
        <AnimateWrapper delay={400}>
          <Button
            startIcon={<AddCircle />}
            onClick={() => history.push(routes.crudCreateItem.replace(':name', params.name))}
            color="primary"
            variant="contained"
          >
            Создать
          </Button>
        </AnimateWrapper>
      }
    >
      <AnimateWrapper>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Изменено</TableCell>
                {currentCrud.tableColumns.map(fieldName => (
                  <TableCell key={fieldName} align="left">
                    {currentCrud?.formParams[fieldName].label}
                  </TableCell>
                ))}
                <TableCell size="small" align="right" />
                <TableCell size="small" align="right" />
              </TableRow>
            </TableHead>
            {rows?.length > 0 && (
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="board">
                  {provided => (
                    <TableBody ref={provided.innerRef} {...provided.droppableProps}>
                      {rows.map((item: any, index: number) => (
                        <Draggable key={item[currentCrud?.slug.field]} draggableId={item.id} index={index}>
                          {(provided, snapshot) => (
                            <TableRow
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                            >
                              <TableCell style={{ width: `${dateColumnWith}px` }} align="left">
                                {getDate(item)}
                              </TableCell>
                              {currentCrud?.tableColumns?.map(fieldName => (
                                <TableCell style={{ width: `${colummnWith}px` }} key={fieldName} align="left">
                                  {item[fieldName]}
                                </TableCell>
                              ))}
                              <TableCell style={{ width: `${controlIconWidth}px`, padding: 0 }} align="right">
                                <Link
                                  to={`${routes.crudEdit
                                    .replace(':name', currentCrud.name)
                                    .replace(':slug', item[currentCrud?.slug.field])}`}
                                >
                                  <MarginWrapper color="text">
                                    <IconButton color="inherit">
                                      <EditIcon />
                                    </IconButton>
                                  </MarginWrapper>
                                </Link>
                              </TableCell>
                              <TableCell
                                style={{ width: `${controlIconWidth}px`, padding: 0, paddingRight: '15px' }}
                                align="right"
                              >
                                <a
                                  target="_blank"
                                  href={createSiteUrlByPath(`/${currentCrud?.path}/${item[currentCrud?.slug.field]}`)}
                                  rel="noreferrer"
                                >
                                  <MarginWrapper color="text">
                                    <IconButton color="inherit">
                                      <RemoveRedEye />
                                    </IconButton>
                                  </MarginWrapper>
                                </a>
                              </TableCell>
                            </TableRow>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </TableBody>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </Table>
        </TableContainer>
      </AnimateWrapper>
    </PageLayout>
  );
};

export default CrudList;
