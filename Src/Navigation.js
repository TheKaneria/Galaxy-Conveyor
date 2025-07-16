import {Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './Screens/LoginScreen';
import SplashScreen from './Screens/SplashScreen';
import DashBoard from './Screens/DashBoard';
import Productnation from './Screens/Production/Production';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="DashBoard" component={DashBoard} />

        <Stack.Screen name="Productnation" component={Productnation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
