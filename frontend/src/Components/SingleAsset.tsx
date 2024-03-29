import { CryptoAsset } from '../DataTypes/Assets/CryptoAsset.ts';
import { Button, Card, ConfigProvider, List, Statistic, Tag, Typography } from 'antd';
import { capitalize } from '../utils.ts';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import EditModal from './EditModal.tsx';
import { useContext, useState } from 'react';
import CryptoContext from '../context/crypto-context.tsx';
import { useAuth } from '../context/auth-context.tsx';

type SingleAssetProps = {
  asset: CryptoAsset;
};

export function SingleAsset({ asset }: SingleAssetProps) {
  const { session } = useAuth();
  const { removeAsset } = useContext(CryptoContext);
  const [isEditing, setIsEditing] = useState(false);

  function handleDelete(assetId: string) {
    removeAsset(assetId);
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: '#292952',
        },
      }}
    >
      <Card style={{ marginBottom: '1rem' }}>
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
          ]}
          renderItem={(item) => (
            <List.Item>
              <span>{item.title}</span>
              <span>
                {item.withTag && <Tag color={asset.grow ? 'green' : 'red'}>{asset.growPercent}%</Tag>}
                {item.isPlain && item.value}
                {!item.isPlain && (
                  <Typography.Text type={asset.grow ? 'success' : 'danger'}>{item.value!.toFixed(2)}$</Typography.Text>
                )}
              </span>
            </List.Item>
          )}
        />
        {session && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: 10 }}>
            <Button type="primary" onClick={() => handleDelete(asset._id!)} style={{ backgroundColor: '#4e0cc4' }}>
              Delete
            </Button>
            {isEditing ? (
              <EditModal isEditing={isEditing} setIsEditing={setIsEditing} asset={asset} />
            ) : (
              <Button type="primary" onClick={() => setIsEditing(!isEditing)}>
                Edit
              </Button>
            )}
          </div>
        )}
      </Card>
    </ConfigProvider>
  );
}
