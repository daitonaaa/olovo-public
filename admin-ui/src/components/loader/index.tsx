import React from 'react';
import { Wrapper } from './styled';

export const WaveLoader = () => {
  return (
    <Wrapper progress={100}>
      <div className="spinner">
        <div className="container">
          <div className="wave"></div>
          <div className="wave"></div>
        </div>
      </div>
    </Wrapper>
  );
};
