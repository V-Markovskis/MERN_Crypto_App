import { Card, Divider, Statistic, Typography } from 'antd';
import { ShoppingOutlined } from '@ant-design/icons';
import CountUp from 'react-countup';
import { useCrypto } from '../context/crypto-context.tsx';
import { Formatter } from 'antd/lib/statistic/utils';
import React from 'react';

const formatter: Formatter = (value: number | string): React.ReactNode => {
  if (typeof value === 'string') {
    value = parseFloat(value);
  }
  return <CountUp end={value} separator="," />;
};

export function AccountBalance() {
  const { crypto, assets } = useCrypto();

  return (
    <Card style={{ backgroundColor: '#292952' }}>
      <Typography.Title level={3}>Account Balance (USD)</Typography.Title>
      <Divider />
      <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
        <ShoppingOutlined style={{ fontSize: '22px', color: '#573ab2' }} />
        <Statistic
          value={assets
            .map((asset) => {
              const coin = crypto.find((c) => c.id === asset.name);
              return asset.amount * coin!.price;
            })
            .reduce((acc, v) => (acc += v), 0)
            .toFixed(2)}
          precision={2}
          formatter={formatter}
        />
      </div>
    </Card>
  );
}
