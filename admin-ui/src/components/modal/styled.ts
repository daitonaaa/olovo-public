import styled from 'styled-components';

export const ModalContainer = styled.div<{ show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #ffffff10;
  display: ${props => (props.show ? 'block' : 'none')};
  z-index: 999;
`;

export const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  padding: 20px;
  background: #525151;

  form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;
