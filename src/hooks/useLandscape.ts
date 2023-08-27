import { useEffect } from "react";
import * as ScreenOrientation from "expo-screen-orientation";

export default () => {
  useEffect(() => {
    lockLeft();
    return () => {
      lockPortrait();
    };
  }, []);

  const lockLeft = async () => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  };

  const lockPortrait = async () => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  };
};
