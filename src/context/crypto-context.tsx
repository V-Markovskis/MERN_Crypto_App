import React, { createContext, useEffect, useState } from 'react';
import { CryptoResult } from '../DataTypes/Crypto/CryptoResult.ts';
import { CryptoAsset } from '../DataTypes/Assets/CryptoAsset.ts';
import { fetchAssets, fetchCrypto } from '../api.ts';
import { percentDifference } from '../utils.ts';

const CryptoContext = createContext({
  assets: [] as CryptoAsset[],
  crypto: [] as CryptoResult[],
  loading: false,
});

export function CryptoContextProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState<CryptoResult[]>([]);
  const [assets, setAssets] = useState<CryptoAsset[]>([]);

  useEffect(() => {
    setLoading(true);
    async function preload() {
      const { result } = await fetchCrypto();
      const assets = await fetchAssets();

      setCrypto(result);
      setAssets(
        assets.map((asset) => {
          const coin = result.find((coin) => coin.id === asset.id);
          return {
            //asset.price = price when crypto coin bought
            //coin.price = current coin price
            grow: asset.price < coin!.price,
            growPercent: percentDifference(asset.price, coin!.price),
            totalAmount: asset.amount * coin!.price,
            totalProfit: asset.amount * coin!.price - asset.amount * asset.price,
            ...asset,
          };
        }),
      );
      setLoading(false);
    }
    preload();
  }, []);
  //creating tier-one provider, which provides data to all components within the provider
  return <CryptoContext.Provider value={{ loading, crypto, assets }}>{children}</CryptoContext.Provider>;
}

export default CryptoContext;
