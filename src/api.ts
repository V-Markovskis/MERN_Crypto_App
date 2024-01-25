import { cryptoAssets, cryptoData } from './data.ts';
import { CryptoData } from './DataTypes/Crypto/CryptoData.ts';
import { CryptoAsset } from './DataTypes/Assets/CryptoAsset.ts';

export function fetchCrypto(): Promise<CryptoData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoData);
    }, 1);
  });
}

export function fetchAssets(): Promise<CryptoAsset[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoAssets);
    }, 1);
  });
}
