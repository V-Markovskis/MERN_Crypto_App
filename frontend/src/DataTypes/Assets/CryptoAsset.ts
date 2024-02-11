export interface CryptoAsset {
  _id?: string;
  name: string;
  amount: number;
  price: number;
  date: string | string[];
  grow?: boolean;
  growPercent?: number;
  totalAmount?: number;
  totalProfit?: number;
  // name?: string;
}
