import styled from 'styled-components';

export const Wrapper = styled.div`
  min-height: 250px;
  padding: 12px;
  background: ${({ theme }) => theme.palette.extraLight};
  color: ${({ theme }) => theme.palette.background};
  border-radius: ${({ theme }) => theme.shape.borderRadius};

  .rdw-editor-wrapper {
    min-height: 250px;
    display: flex;
    flex-direction: column;
  }

  .rdw-editor-main {
    flex: 1;
  }

  a {
    color: ${({ theme }) => theme.palette.background};
  }
`;
