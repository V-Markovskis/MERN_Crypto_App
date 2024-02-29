import { Card, Layout, Typography } from 'antd';
import React from 'react';
import { useCrypto } from '../../context/crypto-context.tsx';
import PortfolioChart from '../PortfolioChart.tsx';
import AssetsTable from '../AssetsTable.tsx';
import { ShoppingOutlined } from '@ant-design/icons';
import BestProfitCoin from '../BestProfitCoin.tsx';

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 60px)',
  color: '#fff',
  backgroundColor: '#0a0b1e',
  padding: '1rem',
};
export default function AppContent() {
  const { crypto, assets } = useCrypto();

  return (
    <Layout.Content style={contentStyle}>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {/*level - h2, h3, etc. analogy*/}
          <Card
            title="Total Asset Value"
            bordered={true}
            style={{ maxWidth: 300, maxHeight: 135, backgroundColor: '#292952' }}
          >
            <Typography.Title level={3} style={{ textAlign: 'center', color: '#fff' }}>
              <ShoppingOutlined />{' '}
              {assets
                .map((asset) => {
                  const coin = crypto.find((c) => c.id === asset.name);
                  return asset.amount * coin!.price;
                })
                .reduce((acc, v) => (acc += v), 0)
                .toFixed(2)}
              $
            </Typography.Title>
          </Card>
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
