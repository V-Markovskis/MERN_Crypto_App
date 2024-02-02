import { CryptoAsset } from './DataTypes/Assets/CryptoAsset.ts';
import axios from 'axios';
import { CryptoData } from './DataTypes/Crypto/CryptoData.ts';
import { CryptoResult } from './DataTypes/Crypto/CryptoResult.ts';

// use hardcoded data in data.ts
// export function fetchCrypto(): Promise<CryptoData> {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(cryptoData);
//     }, 1);
//   });
// }

export async function fetchCrypto(): Promise<CryptoResult[]> {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-KEY': 'UF7tA8M7HBW36qleNjr+4Xl+z66jFCDdmk+NiZvPxZ4=',
    },
  };

  try {
    const response = await axios.get('https://openapiv1.coinstats.app/coins', options);
    return response.data.result;
  } catch (err) {
    console.error('Failed to fetch data', err);
    throw err;
  }
}

// export function fetchAssets(): Promise<CryptoAsset[]> {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(cryptoAssets);
//     }, 1);
//   });
// }

export async function fetchAssets(): Promise<CryptoAsset[]> {
  try {
    const response = await axios.get('http://localhost:3000/cryptoAssets');
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function postAsset(asset: CryptoAsset) {
  try {
    await axios.post('http://localhost:3000/cryptoAssets', asset);
  } catch (err) {
    console.error(err);
  }
}
