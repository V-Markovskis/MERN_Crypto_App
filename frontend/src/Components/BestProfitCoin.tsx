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
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={bestProfitCoin.icon} alt={bestProfitCoin.name} style={{ width: 40, marginRight: 10 }} />
            {capitalize(bestProfitCoin.name)}
          </div>
        </Typography.Title>
        <Tag color="green" style={{ fontSize: '16px' }}>
          {bestProfitCoin.growPercent}%
        </Tag>
        <Divider />
        <Typography.Paragraph strong>Price Change</Typography.Paragraph>
        <div style={{ display: 'flex' }}>
          <Typography.Paragraph>1 hour: {bestProfitCoin.priceChange1h}$</Typography.Paragraph>
          <Divider type="vertical" style={{ height: 20, borderLeft: '1px solid' }}></Divider>
          <Typography.Paragraph>1 day: {bestProfitCoin.priceChange1d}$</Typography.Paragraph>
          <Divider type="vertical" style={{ height: 20, borderLeft: '1px solid' }}></Divider>
          <Typography.Paragraph>1 week: {bestProfitCoin.priceChange1w}$</Typography.Paragraph>
        </div>
      </Card>
    </>
  );
}
