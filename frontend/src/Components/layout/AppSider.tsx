import React, { useContext } from 'react';
import CryptoContext from '../../context/crypto-context.tsx';
import { SingleAsset } from '../SingleAsset.tsx';
import { Card, Layout, Typography } from 'antd';

const siderStyle: React.CSSProperties = {
  padding: '1rem',
  backgroundColor: '#0a0b1e',
};

export default function AppSider() {
  const { assets } = useContext(CryptoContext);

  return (
    <>
      <Layout.Sider width="25%" style={siderStyle}>
        <Card>
          <Typography.Title level={2}>My Wallet</Typography.Title>
          {assets.map((asset, key) => (
            <SingleAsset key={key} asset={asset} />
          ))}
        </Card>
      </Layout.Sider>
    </>
  );
}
