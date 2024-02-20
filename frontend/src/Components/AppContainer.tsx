import { ConfigProvider, theme } from 'antd';
import AuthProvider from '../context/auth-context.tsx';
import { CryptoContextProvider } from '../context/crypto-context.tsx';
import AppLayout from './layout/AppLayout.tsx';
import DarkThemeProvider, { useDarkTheme } from '../context/dark-theme-context.tsx';

export function AppContainer() {
  return (
    <>
      <DarkThemeProvider>
        <AuthProvider>
          <CryptoContextProvider>
            <AppLayout />
          </CryptoContextProvider>
        </AuthProvider>
      </DarkThemeProvider>
    </>
  );
}
