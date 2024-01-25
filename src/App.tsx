import './index.css';
import { Layout } from 'antd';

import AppHeader from './Components/layout/AppHeader.tsx';
import AppSider from './Components/layout/AppSider.tsx';
import AppContent from './Components/layout/AppContent.tsx';

function App() {
  return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppSider />
        <AppSider />
        <AppContent />
      </Layout>
    </Layout>
  );
}

export default App;
