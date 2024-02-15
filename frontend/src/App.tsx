import { CryptoContextProvider } from './context/crypto-context.tsx';
import AppLayout from './Components/layout/AppLayout.tsx';
import './App.css';
import { ConfigProvider, theme } from 'antd';
import { useState } from 'react';
import AuthProvider from './context/auth-context.tsx';

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: isDarkTheme ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}
      >
        <AuthProvider>
          <CryptoContextProvider>
            {/*<SupabaseAuth />*/}
            <AppLayout isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme} />
          </CryptoContextProvider>
        </AuthProvider>
      </ConfigProvider>
    </>
  );
}

export default App;
