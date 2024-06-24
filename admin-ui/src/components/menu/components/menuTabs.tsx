import React, { useState } from 'react';
import { Button, Buttons, Container } from '../styled';
import { FLexBlock } from '../../styled';
import { useMenuContextData } from '../context/menuContextProvider';
import { AddSpaceNameModal } from './addSpaceNameModal';

export const MenuTabs: React.FC = () => {
  const { state, dispatch, activeTabIndex, setActiveTabIndex } = useMenuContextData();

  const tabsList = state.map(({ name }) => name);
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <Container>
      <Buttons>
        <FLexBlock style={{ justifyContent: 'space-between', width: '100%' }}>
          <FLexBlock>
            {tabsList.map((title, index) => (
              <Button key={index} active={activeTabIndex === index} onClick={() => setActiveTabIndex(index)}>
                {title}
              </Button>
            ))}
          </FLexBlock>
          <Button active={false} onClick={() => setShowAddModal(true)}>
            Добавить секцию
          </Button>
        </FLexBlock>
      </Buttons>
      <AddSpaceNameModal
        isShown={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={values => dispatch({ type: 'ADD_NAME_SPACE', payload: { nameSpace: values.name } })}
      />
    </Container>
  );
};
