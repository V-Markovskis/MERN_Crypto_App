import AppHeader from './AppHeader.tsx';
import { ConfigProvider, Layout, Spin, theme } from 'antd';
import AppSider from './AppSider.tsx';
import AppContent from './AppContent.tsx';
import { useContext } from 'react';
import CryptoContext from '../../context/crypto-context.tsx';
import { useDarkTheme } from '../../context/dark-theme-context.tsx';

export default function AppLayout() {
  const { isDarkTheme } = useDarkTheme();
  const { loading } = useContext(CryptoContext);

  if (loading) {
    return <Spin fullscreen />;
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkTheme ? theme.darkAlgorithm : theme.defaultAlgorithm,
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
