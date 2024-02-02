import { cryptoAssets, cryptoData } from './data.ts';
import { CryptoAsset } from './DataTypes/Assets/CryptoAsset.ts';
import axios from 'axios';

// use hardcoded data in data.ts
// export function fetchCrypto(): Promise<CryptoData> {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(cryptoData);
//     }, 1);
//   });
// }

export async function fetchCrypto() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-KEY': 'UF7tA8M7HBW36qleNjr+4Xl+z66jFCDdmk+NiZvPxZ4=',
    },
  };

  try {
    const response = await axios.get('https://openapiv1.coinstats.app/coins', options);
    console.log(response);
    return response.data;
  } catch (err) {
    console.error('Failed to fetch data', err);
  }
}

export function fetchAssets(): Promise<CryptoAsset[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoAssets);
    }, 1);
  });
}
