import { useState } from 'react';
import { Drawer, Typography } from '@material-ui/core';
import { HelpOutline } from '@material-ui/icons';
import { Button, Var, ListItem, Wrapper } from './styled';

const availableVariables = [
  ['%YYYY%', 'Текущий год'],
  ['%n%', 'Неразыврый пробел'],
  ['%crud_instance_entityLabelField%', 'Лейбл текущей детальной странице crud сущности'],
  ['%crud_instance_field_{fielName}%', 'Поле из текущего истанса crud сущности'],
];

export const Help = () => {
  const [isOpen, setVisibleStatus] = useState(false);

  const toggle = () => setVisibleStatus(flag => !flag);

  return (
    <>
      <Button onClick={toggle}>
        <HelpOutline />
      </Button>
      <Drawer anchor="right" onClose={toggle} open={isOpen}>
        <Wrapper>
          <Typography variant="h5">Доступные переменные</Typography>
          {availableVariables.map(([variable, verbose]) => (
            <ListItem key={variable}>
              <Var>{variable}</Var>
              <div>{verbose}</div>
            </ListItem>
          ))}
        </Wrapper>
      </Drawer>
    </>
  );
};
