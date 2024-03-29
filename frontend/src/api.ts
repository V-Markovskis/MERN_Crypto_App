import { CryptoAsset } from './DataTypes/Assets/CryptoAsset.ts';
import axios from 'axios';
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
      'X-API-KEY': import.meta.env.VITE_API_KEY,
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

//https://mern-crypto-app-backend.vercel.app for VERCEL

export async function fetchAssets(): Promise<CryptoAsset[]> {
  try {
    const response = await axios.get('https://mern-crypto-app-backend.vercel.app');
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function postAsset(asset: CryptoAsset) {
  try {
    await axios.post('https://mern-crypto-app-backend.vercel.app', asset);
  } catch (err) {
    console.error(err);
  }
}

export async function deleteAsset(id: string) {
  try {
    await axios.delete(`https://mern-crypto-app-backend.vercel.app/${id}`);
  } catch (err) {
    console.error(err);
  }
}

export async function editAsset(asset: CryptoAsset, id: string) {
  try {
    await axios.put(`https://mern-crypto-app-backend.vercel.app/${id}`, asset);
  } catch (err) {
    console.error(err);
  }
}

// export async function getSingleAsset() {
//   try {
//     await axios.get('');
//   } catch (err) {
//     console.error(err);
//   }
// }
