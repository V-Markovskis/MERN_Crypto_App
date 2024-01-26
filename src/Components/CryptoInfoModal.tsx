import { CryptoResult } from '../DataTypes/Crypto/CryptoResult.ts';

type CryptoInfoModalProps = {
  coin: CryptoResult;
};
export default function CryptoInfoModal({ coin }: CryptoInfoModalProps) {
  return <h2>{coin.name}</h2>;
}
