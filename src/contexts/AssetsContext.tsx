import React, { useContext } from "react";
import { Asset, useAssets } from "expo-asset";
import {
  Backgrounds as SpaceShipBackgrounds,
  Images as SpaceShipImages,
} from "../modules/SpaceBattle/assets";

const AssetsContext = React.createContext<{ [key: string]: Asset }>({});

export default ({ children }: React.PropsWithChildren) => {
  const [assets] = useAssets([
    ...Object.values(SpaceShipImages),
    ...Object.values(SpaceShipBackgrounds),
  ]);

  const assetsObj = assets?.reduce((prev, i) => ({ ...prev, [i.name]: i }), {});

  return (
    <AssetsContext.Provider value={assetsObj || {}}>
      {children}
    </AssetsContext.Provider>
  );
};

export const useGetAssets = () => {
  const assets = useContext(AssetsContext);
  return assets;
};
