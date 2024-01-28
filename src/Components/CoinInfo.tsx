import { Flex, Typography } from 'antd';
import { CryptoResult } from '../DataTypes/Crypto/CryptoResult.ts';

type CoinInfoProps = {
  coin: CryptoResult;
  withSymbol?: boolean;
};

export default function CoinInfo({ coin, withSymbol }: CoinInfoProps) {
  return (
    <Flex align="center">
      <img src={coin.icon} alt={coin.name} style={{ width: 40, marginRight: 10 }} />
      {/*Typography - basic text writing, including headings, body text, lists, and more. Typography.Title = <h2> analogy*/}
      <Typography.Title level={2} style={{ margin: 0 }}>
        {withSymbol && <span>({coin.symbol})</span>} {coin.name}
      </Typography.Title>
    </Flex>
  );
}
