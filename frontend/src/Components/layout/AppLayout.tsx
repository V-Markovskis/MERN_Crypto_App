import AppHeader from './AppHeader.tsx';
import { ConfigProvider, Layout, Spin } from 'antd';
import AppSider from './AppSider.tsx';
import AppContent from './AppContent.tsx';
import { useContext } from 'react';
import CryptoContext from '../../context/crypto-context.tsx';

export default function AppLayout() {
  const { loading } = useContext(CryptoContext);

  if (loading) {
    return <Spin fullscreen />;
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: '#1b1b3a',
          colorPrimary: '#573ab2',
        },
      }}
    >
      <Layout>
        <AppHeader />
        <Layout>
          <AppSider />
          <AppContent />
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
