import React, { useEffect, useState } from 'react';
import { Card, Layout, List, Spin, Statistic, Typography } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { fetchAssets, fetchCrypto } from '../../api.ts';
import { CryptoResult } from '../../DataTypes/Crypto/CryptoResult.ts';
import { CryptoAsset } from '../../DataTypes/Assets/CryptoAsset.ts';
import { percentDifference } from '../../utils';

const siderStyle: React.CSSProperties = {
  padding: '1rem',
};

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

export default function AppSider() {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState<CryptoResult[]>([]);
  const [assests, setAssets] = useState<CryptoAsset[]>([]);

  useEffect(() => {
    setLoading(true);
    async function preload() {
      const { result } = await fetchCrypto();
      const assets = await fetchAssets();

      setCrypto(result);
      setAssets(
        assets.map((asset) => {
          const coin = result.find((coin) => coin.id === asset.id);
          return {
            //asset.price = price when crypto coin bought
            //coin.price = current coin price
            grow: asset.price < coin!.price,
            growPercent: percentDifference(asset.price, coin!.price),
            totalAmount: asset.amount * coin!.price,
            totalProfit: asset.amount * coin!.price - asset.amount * asset.price,
            ...asset,
          };
        }),
      );
      setLoading(false);
    }
    preload();
  }, []);

  if (loading) {
    return <Spin fullscreen />;
  }

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      <Card style={{ marginBottom: '1rem' }}>
        <Statistic
          title="Active"
          value={11.28}
          precision={2}
          valueStyle={{ color: '#3f8600' }}
          prefix={<ArrowUpOutlined />}
          suffix="%"
        />
        <List
          size="small"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text mark>[ITEM]</Typography.Text> {item}
            </List.Item>
          )}
        />
      </Card>
      <Card>
        <Statistic
          title="Idle"
          value={9.3}
          precision={2}
          valueStyle={{ color: '#cf1322' }}
          prefix={<ArrowDownOutlined />}
          suffix="%"
        />
      </Card>
    </Layout.Sider>
  );
}
