import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardController from '../Controllers/DashboardController';
import { BottomTabParamsList } from './BottomTabParamsList';
import IconEn from 'react-native-vector-icons/Entypo';
import IconAD from 'react-native-vector-icons/AntDesign';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FavoriteController from '../Controllers/FavoriteController';

const Tab = createBottomTabNavigator<BottomTabParamsList>();

IconEn.loadFont();
IconAD.loadFont();

const BottomTabNavigation = () => {
  const CustomTabButton = (props: TouchableOpacityProps) => (
    <TouchableOpacity
      {...props}
      style={
        props.accessibilityState&&props.accessibilityState.selected
          ? [props.style, { borderTopColor: 'red', borderTopWidth: 2 }]
          : props.style
      }
    />
  );
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#E9518D',
        tabBarInactiveTintColor: '#D7D8E0',
        tabBarStyle: styles.bottomBarStyle,
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={DashboardController}
        options={() => ({
          tabBarIcon: ({ focused }) => (
            <IconEn
              name="home"
              size={24}
              color={focused ? '#E9518D' : '#D7D8E0'}
            />
          ),
          tabBarLabel: 'Home',
          tabBarLabelPosition: 'below-icon',
          tabBarButton: CustomTabButton
        })}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteController}
        options={() => ({
          tabBarIcon: ({ focused }) => (
            <IconAD
              name="staro"
              size={24}
              color={focused ? '#E9518D' : '#D7D8E0'}
            />
          ),
          tabBarButton: CustomTabButton,
          tabBarLabel: 'Favorite',
          tabBarLabelPosition: 'below-icon',
        })}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  bottomBarStyle: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: hp('10%'),
    paddingBottom: hp('3%'),
  },
});

export default BottomTabNavigation;
