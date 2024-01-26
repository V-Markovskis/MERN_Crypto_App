import './index.css';
import { Layout } from 'antd';

import AppHeader from './Components/layout/AppHeader.tsx';
import AppSider from './Components/layout/AppSider.tsx';
import AppContent from './Components/layout/AppContent.tsx';
import { CryptoContextProvider } from './context/crypto-context.tsx';

function App() {
  return (
    <CryptoContextProvider>
      <Layout>
        <AppHeader />
        <Layout>
          <AppSider />
          <AppContent />
        </Layout>
      </Layout>
    </CryptoContextProvider>
  );
}

export default App;
