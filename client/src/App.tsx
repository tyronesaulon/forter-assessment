import './App.css';
import { ChatRoom } from './pages/ChatRoom/ChatRoom.tsx';
import { UserContextProvider } from './contexts/UserContext/UserContextProvider.tsx';
import { ApolloProvider } from '@apollo/client';
import { apollo } from './clients/apollo.client.ts';

function App() {
  return (
    <ApolloProvider client={apollo}>
      <UserContextProvider>
        <ChatRoom />
      </UserContextProvider>
    </ApolloProvider>
  );
}

export default App;
