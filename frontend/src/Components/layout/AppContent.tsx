import { Card, Layout } from 'antd';
import React from 'react';
import PortfolioChart from '../PortfolioChart.tsx';
import AssetsTable from '../AssetsTable.tsx';
import BestProfitCoin from '../BestProfitCoin.tsx';
import { AccountBalance } from '../AccountBalance.tsx';

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 60px)',
  color: '#fff',
  backgroundColor: '#0a0b1e',
  padding: '1rem',
};

export default function AppContent() {
  return (
    <Layout.Content style={contentStyle}>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <AccountBalance />
          </div>
          <div>
            <BestProfitCoin />
          </div>
          <PortfolioChart />
        </div>
        <div style={{ paddingTop: 50 }}>
          <AssetsTable />
        </div>
      </Card>
    </Layout.Content>
  );
}
