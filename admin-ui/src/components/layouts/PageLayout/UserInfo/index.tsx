import React from 'react';
import { useUser } from '../../../../http/query-hooks';
import { Wrapper } from './styled';
import { logout } from '../../../../http/service';

export const UserInfo = () => {
  const { data } = useUser();

  const handleLogout = () => {
    logout();
  };

  if (!data) {
    return null;
  }

  return (
    <Wrapper>
      {data.email}{' '}
      <a style={{ marginLeft: 8 }} href="#" onClick={handleLogout}>
        Выйти
      </a>
    </Wrapper>
  );
};
