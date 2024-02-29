import { CryptoAsset } from '../DataTypes/Assets/CryptoAsset.ts';

export const emptyAsset: CryptoAsset = {
  name: '',
  amount: 0,
  price: 0,
  date: '',
  grow: false,
  growPercent: 0,
  totalAmount: 0,
  totalProfit: 0,
  priceChange1h: 0,
  priceChange1d: 0,
  priceChange1w: 0,
};
