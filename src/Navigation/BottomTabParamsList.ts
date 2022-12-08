import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type BottomTabParamsList = {
  Home: undefined;
  Favorite: undefined;
};

export type BottomTabProps = NativeStackNavigationProp<BottomTabParamsList>;
