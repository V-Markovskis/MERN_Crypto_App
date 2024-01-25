import { cryptoData } from './data.ts';

export function fetchCrypto() {
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoData);
    }, 2000);
  });
}
