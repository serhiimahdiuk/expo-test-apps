import { StackNavigationProp } from "@react-navigation/stack";
import { ModulesStackParamList } from ".";
import { useNavigation } from "@react-navigation/native";

export const useAppNavigation = () =>
  useNavigation<StackNavigationProp<ModulesStackParamList>>();
