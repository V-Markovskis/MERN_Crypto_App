import AppHeader from './AppHeader.tsx';
import { Layout, Spin } from 'antd';
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
    <Layout>
      <AppHeader />
      <Layout>
        <AppSider />
        <AppContent />
      </Layout>
    </Layout>
  );
}
