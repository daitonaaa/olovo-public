import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { PageLayout } from '../../components/layouts/PageLayout';
import { routes } from '../../routes';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { getPages } from '../../http/endpoints';
import { useQuery } from 'react-query';
import { createSiteUrlByPath, formatISODate } from '../../utils';
import { AnimateWrapper } from '../../components/animate-wrapper';
import { AddCircle, ViewModuleSharp } from '@material-ui/icons';
import React from 'react';
import { MarginWrapper } from '../../theme/wrappers';

const Pages = () => {
  const { data } = useQuery(['get_pages'], getPages);

  return (
    <PageLayout
      title="Страницы"
      headerRightContent={
        <AnimateWrapper delay={350}>
          <Button startIcon={<AddCircle />} color="primary" variant="contained" component={Link} to={routes.createPage}>
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
                <TableCell align="left">Модуль</TableCell>
                <TableCell align="left">Название</TableCell>
                <TableCell align="left">URL</TableCell>
                <TableCell align="left">Статус</TableCell>
                <TableCell align="left">Дата обновления</TableCell>
                <TableCell align="left">Дата создания</TableCell>
                <TableCell align="left">Региональность</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map(page => (
                  <TableRow key={page.id}>
                    <TableCell align="left">{page.isCrud && <ViewModuleSharp fontSize="small" />}</TableCell>
                    <TableCell align="left">{page.name}</TableCell>
                    <TableCell align="left">
                      <a href={createSiteUrlByPath(page.url)} target="_blank" rel="noopener noreferrer">
                        {page.url}
                      </a>
                    </TableCell>
                    <TableCell align="left">{page.isPublished ? 'Опубликован' : 'Неопубликован'}</TableCell>
                    <TableCell align="left">{page.updatedAt ? formatISODate(page.updatedAt) : '-'}</TableCell>
                    <TableCell align="left">{formatISODate(page.dateCreated)}</TableCell>
                    <TableCell align="left">{page.isRegional ? 'Да' : 'Нет'}</TableCell>
                    <TableCell align="right">
                      <Link to={`${routes.detailPage}/${page.id}`} key={page.id}>
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
    </PageLayout>
  );
};

export default Pages;
