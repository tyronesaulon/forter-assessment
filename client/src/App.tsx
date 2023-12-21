import './App.css';
import { ChatRoom } from './pages/ChatRoom/ChatRoom.tsx';
import {
  createTheme,
  MantineProvider,
  TypographyStylesProvider,
} from '@mantine/core';

const theme = createTheme({});

function App() {
  return (
    <MantineProvider theme={theme}>
      <TypographyStylesProvider>
        <ChatRoom />
      </TypographyStylesProvider>
    </MantineProvider>
  );
}

export default App;
