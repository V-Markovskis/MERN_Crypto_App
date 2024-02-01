export interface CryptoAsset {
  id: string;
  amount: number;
  price: number;
  date: Date;
  grow?: boolean;
  growPercent?: number;
  totalAmount?: number;
  totalProfit?: number;
  name?: string;
}
