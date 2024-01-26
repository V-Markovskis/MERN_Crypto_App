import { CryptoContextProvider } from './context/crypto-context.tsx';
import AppLayout from './Components/layout/AppLayout.tsx';

function App() {
  return (
    <CryptoContextProvider>
      <AppLayout />
    </CryptoContextProvider>
  );
}

export default App;
