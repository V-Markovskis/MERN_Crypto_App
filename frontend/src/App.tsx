import { CryptoContextProvider } from './context/crypto-context.tsx';
import AppLayout from './Components/layout/AppLayout.tsx';
import './App.css';
import { ConfigProvider, theme } from 'antd';
import { useState } from 'react';

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: isDarkTheme ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}
      >
        <CryptoContextProvider>
          <AppLayout isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme} />
        </CryptoContextProvider>
      </ConfigProvider>
    </>
  );
}

export default App;
