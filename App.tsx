import "react-native-gesture-handler";
import RootNavigator from "./src/navigation";
import { useAssets } from "expo-asset";
import AssetsContext from "./src/contexts/AssetsContext";

export default function App() {
  return (
    <AssetsContext>
      <RootNavigator />
    </AssetsContext>
  );
}
