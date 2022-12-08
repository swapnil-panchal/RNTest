import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import type {RootStackParamsList} from './StackParamsList';
import LoginController from '../Controllers/LoginController';
import BottomTabNavigation from './BottomNavigation';

const Stack = createNativeStackNavigator<RootStackParamsList>();

const MainNavigation: FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'login'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={'login'} component={LoginController} />
        <Stack.Screen name={'Dashboard'} component={BottomTabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
