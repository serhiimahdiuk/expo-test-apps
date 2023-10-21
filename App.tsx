import "react-native-gesture-handler";
import RootNavigator from "./src/navigation";
import AssetsContext from "./src/contexts/AssetsContext";

export default function App() {
  return (
    <AssetsContext>
      <RootNavigator />
    </AssetsContext>
  );
}
