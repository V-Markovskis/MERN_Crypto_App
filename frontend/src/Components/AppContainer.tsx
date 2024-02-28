import AuthProvider from '../context/auth-context.tsx';
import { CryptoContextProvider } from '../context/crypto-context.tsx';
import AppLayout from './layout/AppLayout.tsx';

export function AppContainer() {
  return (
    <>
      <AuthProvider>
        <CryptoContextProvider>
          <AppLayout />
        </CryptoContextProvider>
      </AuthProvider>
    </>
  );
}
