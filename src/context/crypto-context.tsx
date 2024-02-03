import React, { createContext, useContext, useEffect, useState } from 'react';
import { CryptoResult } from '../DataTypes/Crypto/CryptoResult.ts';
import { CryptoAsset } from '../DataTypes/Assets/CryptoAsset.ts';
import { deleteAsset, fetchAssets, fetchCrypto } from '../api.ts';
import { percentDifference } from '../utils.ts';

const CryptoContext = createContext({
  assets: [] as CryptoAsset[],
  crypto: [] as CryptoResult[],
  loading: false,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  addAsset: (newAsset: CryptoAsset) => {},
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  removeAsset: (id: string) => {},
});

export function CryptoContextProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState<CryptoResult[]>([]);
  const [assets, setAssets] = useState<CryptoAsset[]>([]);

  function mapAssets(assets: CryptoAsset[], result: CryptoResult[]) {
    return assets.map((asset: CryptoAsset) => {
      const coin = result.find((coin) => coin.id === asset.id);
      return {
        //asset.price = price when crypto coin bought
        //coin.price = current coin price
        grow: asset.price < coin!.price,
        growPercent: percentDifference(asset.price, coin!.price),
        totalAmount: asset.amount * coin!.price,
        totalProfit: asset.amount * coin!.price - asset.amount * asset.price,
        name: coin!.name,
        ...asset,
      };
    });
  }

  useEffect(() => {
    setLoading(true);
    async function preload() {
      const result = await fetchCrypto();
      const assets = await fetchAssets();

      setCrypto(result);
      setAssets(mapAssets(assets, result));
      setLoading(false);
    }
    preload();
  }, []);

  function addAsset(newAsset: CryptoAsset) {
    setAssets((prev) => mapAssets([...prev, newAsset], crypto));
  }

  async function removeAsset(id: string) {
    await deleteAsset(id);
    setAssets(assets.filter((asset) => asset.id !== id));
  }

  //creating tier-one provider, which provides data to all components within the provider
  return (
    <CryptoContext.Provider value={{ loading, crypto, assets, addAsset, removeAsset }}>
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoContext;

export function useCrypto() {
  return useContext(CryptoContext);
}
