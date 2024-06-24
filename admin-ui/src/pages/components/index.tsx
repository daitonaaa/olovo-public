import React from 'react';
import { PageLayout } from '../../components/layouts/PageLayout';
import { useQuery } from 'react-query';
import { getComponents } from '../../http/endpoints';
import { CircularProgress, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import EditIcon from '@material-ui/icons/Edit';
import TableContainer from '@material-ui/core/TableContainer';
import { formatISODate } from '../../utils';
import { isGreedyComponent } from '../../components/page-form';
import { routes } from '../../routes';
import Button from '@material-ui/core/Button';
import { AnimateWrapper } from '../../components/animate-wrapper';
import { AddCircle } from '@material-ui/icons';
import { MarginWrapper } from '../../theme/wrappers';

const Components = () => {
  const { data: components } = useQuery(['get_components'], getComponents);

  return (
    <PageLayout
      title="Компоненты"
      headerRightContent={
        <AnimateWrapper delay={350}>
          <Button
            startIcon={<AddCircle />}
            color="primary"
            variant="contained"
            component={Link}
            to={routes.createComponent}
          >
            Создать
          </Button>
        </AnimateWrapper>
      }
    >
      {!components ? (
        <CircularProgress />
      ) : (
        <AnimateWrapper>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Название</TableCell>
                  <TableCell align="left">Системное имя</TableCell>
                  <TableCell align="left">Дата создания</TableCell>
                  <TableCell align="left">Композитный</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {components.map(component => (
                  <TableRow key={component.id} selected={isGreedyComponent(component.name)}>
                    <TableCell align="left">{component.label}</TableCell>
                    <TableCell align="left">{component.name}</TableCell>
                    <TableCell align="left">{formatISODate(component.dateCreated)}</TableCell>
                    <TableCell align="left">{isGreedyComponent(component.name) ? 'Да' : ''}</TableCell>
                    <TableCell align="right">
                      <Link to={routes.editComponent.replace(':id', String(component.id))}>
                        <MarginWrapper color="text">
                          <IconButton color="inherit">
                            <EditIcon />
                          </IconButton>
                        </MarginWrapper>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AnimateWrapper>
      )}
    </PageLayout>
  );
};

export default Components;
