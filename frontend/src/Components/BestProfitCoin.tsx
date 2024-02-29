import { useCrypto } from '../context/crypto-context.tsx';
import { useEffect, useState } from 'react';
import { emptyAsset } from '../emptyCoin/emptyAsset.ts';
import { Card, Divider, Tag, Typography } from 'antd';
import { capitalize } from '../utils.ts';

export default function BestProfitCoin() {
  const { assets } = useCrypto();
  const [bestProfitCoin, setBestProfitCoin] = useState(emptyAsset);

  useEffect(() => {
    const objectWithMaxProfit = assets.reduce((maxObject, currentObject) => {
      if (!maxObject || currentObject.totalProfit! > maxObject.totalProfit!) {
        return currentObject;
      } else {
        return maxObject;
      }
    }, assets[0]);
    setBestProfitCoin(objectWithMaxProfit);
  }, [assets]);

  return (
    <>
      <Card style={{ backgroundColor: '#292952' }}>
        <Typography.Title level={3}>Highest Profit %</Typography.Title>
        <Divider />
        <Typography.Title level={3}>
          <img src={bestProfitCoin.icon} alt={bestProfitCoin.name} style={{ width: 40, marginRight: 10 }} />
          {capitalize(bestProfitCoin.name)}
        </Typography.Title>
        <Tag color="green">{bestProfitCoin.growPercent}%</Tag>
        <Typography.Paragraph></Typography.Paragraph>
      </Card>
    </>
  );
}
