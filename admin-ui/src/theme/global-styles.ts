import { createGlobalStyle, css } from 'styled-components';

export const createLabelStyle = () => css`
  color: #fff;
  background: ${({ theme }) => theme.palette.primaryDark};
  padding: 3px 7px;
  font-weight: bold;
  border-radius: ${({ theme }) => theme.shape.borderRadius};
  border: 1px solid #cac6c6;
  margin-left: -5px;
`;

export const GlobalStyles = createGlobalStyle`
  html {
    height: 100%;
  }
  
  body {
    font-family: 'Fira Mono', sans-serif !important;
    background: ${({ theme }) => theme.palette.background};
  }

  #root, body {
    min-width: 1200px;
  }

  table, tr, td {
    border: none;
  }

  /**
  * dark theme
  */
  .MuiTableRow-head {
    background: ${({ theme }) => theme.palette.primaryDark};
    height: 50px;
    
    > th {
      font-weight: bold;
      color: #fff;
    }
  }
  
  .MuiTableBody-root {
    > tr {
      background: ${({ theme }) => theme.palette.primaryDark};
    }
    
    .MuiTableCell-body {
      color: #fff;
    }
  }
  
  .MuiTableCell-root {
    border-bottom: 1px solid #343333a3;
  }
  
  .MuiTable-root {
    font-family: 'Fira Mono', sans-serif !important;
  }
  
  .MuiPaper-root {
    background: ${({ theme }) => theme.palette.background};
  }

  .MuiListItem-root.Mui-selected {
    background: ${({ theme }) => theme.palette.accent};
    color: #fff;
  }

  .MuiListItem-root:hover {
    background: ${({ theme }) => theme.palette.background};
    color: ${({ theme }) => theme.palette.accent};
  }
  
  a {
    color: #fff;
  }
  
  .MuiInputBase-root.Mui-disabled {
    background: #31313152;
  }

  .MuiInputBase-input.Mui-disabled {
    background: #31313152;
  }
  
  .MuiTextField-root {
      color: ${({ theme }) => theme.palette.background};
  }
  
  body .MuiFormLabel-root.Mui-disabled {
    border: 1px solid #818181;
    background: #414141;
    color: #747272;
  }

  .MuiPaper-elevation1 {
    box-shadow: ${({ theme }) => theme.shadow.base};
  }

  .MuiTypography-body1 {
    padding: 7px;
    color: #fff;
    font-size: 14px;
  }

  .MuiInputBase-root, .MuiInputBase-input {
      border-radius: ${({ theme }) => theme.shape.borderRadius};
      background: ${({ theme }) => theme.palette.extraLight};
      color: ${({ theme }) => theme.palette.primaryDark};
  }

  .MuiInputLabel-outlined.MuiInputLabel-shrink {
    color: #fff;
    background: ${({ theme }) => theme.palette.primaryDark};
    padding: 3px 7px;
    font-weight: bold;
    border-radius: ${({ theme }) => theme.shape.borderRadius};
    border: 1px solid #cac6c6;
    margin-top: -1px;
    margin-left: -5px;
  }
  
  .MuiFormLabel-root {
    &.Mui-focused {
      color: #fff;
      background: ${({ theme }) => theme.palette.accent};
      font-weight: bold;
      border-radius: ${({ theme }) => theme.shape.borderRadius};
    }
  }
  
  .MuiInputBase-formControl.Mui-focused {
    border-color: ${({ theme }) => theme.palette.accent};
  }

  body label.Mui-focused {
    color: white;
  }
  
  body .Mui-focused {
      border-color: orange;
  }
  
  .MuiAlert-standardError, .MuiAlert-standardSuccess {
      color: ${({ theme }) => theme.palette.extraLight};
      border: 1px solid ${({ theme }) => theme.palette.extraLight};
  }

  .MuiOutlinedInput-root {
    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.palette.accent};
      border-width: 2px;
    }
  }
  
  /**
    * dark theme switch
   */
  .MuiSwitch-colorPrimary.Mui-checked + .MuiSwitch-track {
    background-color: ${({ theme }) => theme.palette.accent};
  }

  .MuiSwitch-colorPrimary.Mui-checked {
    color: ${({ theme }) => theme.palette.accent};
  }
`;
