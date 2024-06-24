import styled from 'styled-components'

export const Text = styled.h2`
  font-size: 78px;
  color: ${({ theme }) => theme.palette.main.blueGray};
`

export const Wrapper = styled.div`
  min-height: 350px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 18px;

  button {
    margin-top: ${({ theme }) => theme.spaces.xs};
    display: block;
    padding: 14px;
    min-width: 200px;
    border: 1px solid #a2a2a2;
    color: #a2a2a2;

    &:hover {
      cursor: pointer;
      border: 1px solid #000;
      color: #000;
    }
  }
`
