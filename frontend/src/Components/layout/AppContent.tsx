import { Layout, Typography } from 'antd';
import React from 'react';
import { useCrypto } from '../../context/crypto-context.tsx';
import PortfolioChart from '../PortfolioChart.tsx';
import AssetsTable from '../AssetsTable.tsx';

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 60px)',
  color: '#fff',
  backgroundColor: '#0958d9',
  padding: '1rem',
};
export default function AppContent() {
  const { crypto, assets } = useCrypto();

  // const cryptoPriceMap = crypto.reduce((acc:Record<string, number>, c) => {
  //   acc[c.id] = c.price;
  //   return acc;
  // }, {});

  return (
    <Layout.Content style={contentStyle}>
      {/*level - h2, h3, etc. analogy*/}
      <Typography.Title level={3} style={{ textAlign: 'left', color: '#fff' }}>
        Portfolio:{' '}
        {assets
          .map((asset) => {
            const coin = crypto.find((c) => c.id === asset.name);
            return asset.amount * coin!.price;
          })
          .reduce((acc, v) => (acc += v), 0)
          .toFixed(2)}
        $
      </Typography.Title>
      <PortfolioChart />
      <AssetsTable />
    </Layout.Content>
  );
}