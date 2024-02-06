import React, { useContext } from 'react';
import { Card, Layout, List, Statistic, Typography, Tag, Button } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { capitalize } from '../../utils.ts';
import CryptoContext from '../../context/crypto-context.tsx';

const siderStyle: React.CSSProperties = {
  padding: '1rem',
};

export default function AppSider() {
  const { assets, removeAsset } = useContext(CryptoContext);

  async function handleDelete(assetId: string) {
    await removeAsset(assetId);
  }

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets.map((asset, key) => (
        <Card key={key} style={{ marginBottom: '1rem' }}>
          <Statistic
            title={capitalize(asset.name!)}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322' }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />
          <List
            size="small"
            dataSource={[
              { title: 'Total Profit', value: asset.totalProfit, withTag: true },
              { title: 'Asset Amount', value: asset.amount, isPlain: true },
              // { title: 'Difference', value: asset.growPercent },
            ]}
            renderItem={(item) => (
              <List.Item>
                <span>{item.title}</span>
                <span>
                  {item.withTag && <Tag color={asset.grow ? 'green' : 'red'}>{asset.growPercent}%</Tag>}
                  {item.isPlain && item.value}
                  {!item.isPlain && (
                    <Typography.Text type={asset.grow ? 'success' : 'danger'}>
                      {item.value!.toFixed(2)}$
                    </Typography.Text>
                  )}
                </span>
              </List.Item>
            )}
          />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="primary" danger onClick={() => handleDelete(asset.id!)}>
              Delete
            </Button>
          </div>
        </Card>
      ))}
    </Layout.Sider>
  );
}
