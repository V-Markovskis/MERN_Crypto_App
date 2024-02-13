import React, { createContext, useContext, useEffect, useState } from 'react';
import { CryptoResult } from '../DataTypes/Crypto/CryptoResult.ts';
import { CryptoAsset } from '../DataTypes/Assets/CryptoAsset.ts';
import { deleteAsset, editAsset, fetchAssets, fetchCrypto, postAsset } from '../api.ts';
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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  editAssetContext: (asset: CryptoAsset, id: string) => {},
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
    // setAssets((prev) => mapAssets([...prev, newAsset], crypto));
    const updatedAssets = await fetchAssets();
    setAssets(mapAssets(updatedAssets, crypto));
  }

  async function removeAsset(id: string) {
    await deleteAsset(id);
    // setAssets((prev) => prev.filter((prev) => prev.identifierId !== id));
    const updatedAssets = await fetchAssets();
    setAssets(mapAssets(updatedAssets, crypto));
  }

  async function editAssetContext(asset: CryptoAsset, id: string) {
    await editAsset(asset, id);
    const updatedAssets = await fetchAssets();
    setAssets(mapAssets(updatedAssets, crypto));
  }

  //creating tier-one provider, which provides data to all components within the provider
  return (
    <CryptoContext.Provider value={{ loading, crypto, assets, addAsset, removeAsset, editAssetContext }}>
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoContext;

export function useCrypto() {
  return useContext(CryptoContext);
}
