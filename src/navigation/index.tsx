import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {bottomSheetInterpolator} from './bottomSheetInterpolator';
import {Businesses} from '../screens/Businesses';
import {BusinessDetail} from '../screens/BusinessDetail';
import { Colors } from '../theme';

const MainNavigator = createStackNavigator();

export const RootNav = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle='light-content' />
      <MainNavigator.Navigator screenOptions={{
        headerShown: true,
        headerTitleStyle: {
          color: Colors.text.onPrimary,
        },
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        cardStyle: { backgroundColor: 'transparent' },
        cardOverlayEnabled: true,
        cardStyleInterpolator: bottomSheetInterpolator,
      }}
      mode="modal">
        <MainNavigator.Screen name="Home" component={Businesses} options={{title: 'Business Intelligence'}} />
        <MainNavigator.Screen name="Profile" component={BusinessDetail} options={{headerShown: false}}   />
      </MainNavigator.Navigator>
    </NavigationContainer>
  );
}