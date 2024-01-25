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

export default function AppSider() {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState<CryptoResult[]>([]);
  const [assets, setAssets] = useState<CryptoAsset[]>([]);

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
      {assets.map((asset) => (
        <Card key={asset.id} style={{ marginBottom: '1rem' }}>
          <Statistic
            title={asset.id}
            value={asset.amount}
            precision={2}
            valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322' }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />
          <List
            size="small"
            dataSource={[
              { title: 'Total Profit', value: asset.totalProfit },
              { title: 'Asset Amount', value: asset.amount },
              { title: 'Difference', value: asset.growPercent },
            ]}
            renderItem={(item) => (
              <List.Item>
                <span>{item.title}</span>
                <span>{item.value}</span>
              </List.Item>
            )}
          />
        </Card>
      ))}
    </Layout.Sider>
  );
}
