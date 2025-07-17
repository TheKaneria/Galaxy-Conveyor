import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import DashBoard from './DashBoard';
import colors from '../Utils/colors';
import ProfileScreen from './ProfileScreen';
import TadaScreen from './TADA/TadaScreen';
import LeadScreen from './Lead/LeadScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

const TabRoot = props => {
  const [check, setCheck] = useState('');
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      CheckPermission();
    });
    return unsubscribe;
  }, [props]);

  const CheckPermission = async () => {
    const data = await AsyncStorage.getItem('permission');
    setCheck(data);
  };

  return (
    <>
      {check === '0,0,1,0' ? (
        <Tab.Navigator
          initialRouteName="DashBoard"
          screenOptions={{
            tabBarStyle: {
              height: 70,
              paddingBottom: 10,
              paddingTop: 10,
            },
            tabBarActiveTintColor: '#000',
          }}>
          <Tab.Screen
            name="DashBoard"
            component={DashBoard}
            options={{
              headerShown: false,
              tabBarLabel: 'DashBoard',

              tabBarIcon: ({focused, size}) => (
                <Entypo
                  name="home"
                  size={size ? 26 : 26}
                  color={focused ? colors.themecolor : '#000'}
                  focused={focused}
                />
              ),
            }}
          />

          <Tab.Screen
            name="Lead"
            component={LeadScreen}
            options={{
              headerShown: false,
              tabBarLabel: 'Lead',

              tabBarIcon: ({focused, size}) => (
                <MaterialIcons
                  name="leaderboard"
                  size={size ? 26 : 26}
                  color={focused ? colors.themecolor : '#000'}
                  focused={focused}
                />
              ),
            }}
          />

          <Tab.Screen
            name="TADA"
            component={TadaScreen}
            options={{
              headerShown: false,
              tabBarLabel: 'TA/DA',

              tabBarIcon: ({focused, size}) => (
                <FontAwesome
                  name="money"
                  size={size ? 26 : 26}
                  color={focused ? colors.themecolor : '#000'}
                  focused={focused}
                />
              ),
            }}
          />

          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              headerShown: false,
              tabBarLabel: 'Profile',

              tabBarIcon: ({focused, color, size}) => (
                <Ionicons
                  name="person-circle-outline"
                  size={size ? 26 : 26}
                  color={focused ? colors.themecolor : '#000000'}
                  focused={focused}
                />
              ),
            }}
          />
        </Tab.Navigator>
      ) : null}
      {check === '0,0,0,0' ? (
        <Tab.Navigator
          initialRouteName="Lead"
          screenOptions={{
            tabBarStyle: {
              height: 70,
              paddingBottom: 10,
              paddingTop: 10,
            },
            tabBarActiveTintColor: '#000',
          }}>
          <Tab.Screen
            name="Lead"
            component={LeadScreen}
            options={{
              headerShown: false,
              tabBarLabel: 'Lead',

              tabBarIcon: ({focused, size}) => (
                <MaterialIcons
                  name="leaderboard"
                  size={size ? 26 : 26}
                  color={focused ? colors.themecolor : '#000'}
                  focused={focused}
                />
              ),
            }}
          />

          <Tab.Screen
            name="TADA"
            component={TadaScreen}
            options={{
              headerShown: false,
              tabBarLabel: 'TA/DA',

              tabBarIcon: ({focused, size}) => (
                <FontAwesome
                  name="money"
                  size={size ? 26 : 26}
                  color={focused ? colors.themecolor : '#000'}
                  focused={focused}
                />
              ),
            }}
          />

          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              headerShown: false,
              tabBarLabel: 'Profile',

              tabBarIcon: ({focused, color, size}) => (
                <Ionicons
                  name="person-circle-outline"
                  size={size ? 26 : 26}
                  color={focused ? colors.themecolor : '#000000'}
                  focused={focused}
                />
              ),
            }}
          />
        </Tab.Navigator>
      ) : null}
    </>
  );
};

export default TabRoot;
