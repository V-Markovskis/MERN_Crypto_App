import { ConfigProvider, theme } from 'antd';
import { useState } from 'react';
import AuthProvider from '../context/auth-context.tsx';
import { CryptoContextProvider } from '../context/crypto-context.tsx';
import AppLayout from './layout/AppLayout.tsx';

export function AppContainer() {
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
            <AppLayout isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme} />
          </CryptoContextProvider>
        </AuthProvider>
      </ConfigProvider>
    </>
  );
}
