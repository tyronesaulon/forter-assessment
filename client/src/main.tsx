import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './main.module.css';
import '@mantine/core/styles.css';
import {
  createTheme,
  MantineProvider,
  TypographyStylesProvider,
} from '@mantine/core';

const theme = createTheme({});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <TypographyStylesProvider p={0} m={0}>
        <App />
      </TypographyStylesProvider>
    </MantineProvider>
  </React.StrictMode>,
);
