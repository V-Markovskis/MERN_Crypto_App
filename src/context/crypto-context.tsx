import React, { createContext, useContext, useEffect, useState } from 'react';
import { CryptoResult } from '../DataTypes/Crypto/CryptoResult.ts';
import { CryptoAsset } from '../DataTypes/Assets/CryptoAsset.ts';
import { deleteAsset, fetchAssets, fetchCrypto, postAsset } from '../api.ts';
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
      const coin = result.find((coin) => coin.id === asset.name);
      return {
        //asset.price = price when crypto coin bought
        //coin.price = current coin price
        grow: asset.price < coin!.price,
        growPercent: percentDifference(asset.price, coin!.price),
        totalAmount: asset.amount * coin!.price,
        totalProfit: asset.amount * coin!.price - asset.amount * asset.price,
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

  async function addAsset(newAsset: CryptoAsset) {
    await postAsset(newAsset);
    console.log('newAsset', newAsset);
    setAssets((prev) => mapAssets([...prev, newAsset], crypto));
  }

  async function removeAsset(id: string) {
    console.log('delete entered');
    await deleteAsset(id);
    // const filteredAssets = assets.filter((asset) => asset.id !== id);
    // setAssets(filteredAssets);
    setAssets((prev) => prev.filter((prev) => prev.id !== id));
    // mapAssets(assets, crypto);
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
