import { CryptoResult } from '../DataTypes/Crypto/CryptoResult.ts';

const emptyCoin: CryptoResult = {
  id: '',
  icon: '',
  name: '',
  symbol: '',
  rank: 0,
  price: 0,
  priceBtc: 0,
  volume: 0,
  marketCap: 0,
  availableSupply: 0,
  totalSupply: 0,
  priceChange1h: 0,
  priceChange1d: 0,
  priceChange1w: 0,
  redditUrl: '',
  websiteUrl: '',
  twitterUrl: '',
  explorers: [],
  contractAddress: '',
};

export default emptyCoin;
