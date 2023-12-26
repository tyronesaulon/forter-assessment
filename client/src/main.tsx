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
  // Note: Remove StrictMode to avoid double rendering in effects, introduced in React 18
  // <React.StrictMode>
  <MantineProvider theme={theme} forceColorScheme="dark">
    <TypographyStylesProvider p={0} m={0}>
      <App />
    </TypographyStylesProvider>
  </MantineProvider>,
  // </React.StrictMode>,
);
