import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Businesses} from '../screens/Businesses';
import {BusinessDetail} from '../screens/BusinessDetail';

const MainNavigator = createStackNavigator();

export const RootNav = () => {
  return (
    <NavigationContainer>
      <MainNavigator.Navigator>
        <MainNavigator.Screen name="Home" component={Businesses} />
        <MainNavigator.Screen name="Profile" component={BusinessDetail} />
      </MainNavigator.Navigator>
    </NavigationContainer>
  );
}