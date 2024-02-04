export interface CryptoAsset {
  id?: string;
  name: string;
  amount: number;
  price: number;
  date: string;
  grow?: boolean;
  growPercent?: number;
  totalAmount?: number;
  totalProfit?: number;
  // name?: string;
}
