import { CryptoResult } from '../DataTypes/Crypto/CryptoResult.ts';
import { Divider, Tag, Typography } from 'antd';
import CoinInfo from './CoinInfo.tsx';

type CryptoInfoModalProps = {
  coin: CryptoResult;
};
export default function CryptoInfoModal({ coin }: CryptoInfoModalProps) {
  //<Flex/> - add flex property, appears as a component
  return (
    <>
      <CoinInfo coin={coin} withSymbol />
      <Divider />
      <Typography.Paragraph>
        <Typography.Text strong> 1 hour: </Typography.Text>
        <Tag color={coin.priceChange1h > 0 ? 'green' : 'red'}>{coin.priceChange1h}%</Tag>
        <Typography.Text strong> 1 day: </Typography.Text>
        <Tag color={coin.priceChange1d > 0 ? 'green' : 'red'}>{coin.priceChange1d}%</Tag>
        <Typography.Text strong> 1 week: </Typography.Text>
        <Tag color={coin.priceChange1w > 0 ? 'green' : 'red'}>{coin.priceChange1w}%</Tag>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong> Price: </Typography.Text>
        {coin.price.toFixed(2)}$
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong> PriceBTC: </Typography.Text>
        {coin.priceBtc.toFixed(5)}
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong> Market Cap: </Typography.Text>
        {coin.marketCap.toFixed(2)}$
      </Typography.Paragraph>
      {coin.contractAddress && (
        <Typography.Paragraph>
          <Typography.Text strong> Contract Address: </Typography.Text>
          {coin.contractAddress}
        </Typography.Paragraph>
      )}
    </>
  );
}
