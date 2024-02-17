import AppHeader from './AppHeader.tsx';
import { Layout, Spin } from 'antd';
import AppSider from './AppSider.tsx';
import AppContent from './AppContent.tsx';
import { useContext } from 'react';
import CryptoContext from '../../context/crypto-context.tsx';

type AppLayoutProps = {
  isDarkTheme?: boolean;
  setIsDarkTheme?: (isDarkTheme: boolean) => void;
};

export default function AppLayout({ isDarkTheme, setIsDarkTheme }: AppLayoutProps) {
  const { loading } = useContext(CryptoContext);

  if (loading) {
    return <Spin fullscreen />;
  }

  return (
    <Layout>
      {isDarkTheme && setIsDarkTheme && <AppHeader isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme} />}
      <Layout>
        <AppSider />
        <AppContent />
      </Layout>
    </Layout>
  );
}
