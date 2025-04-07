import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import MealsScreen from '../screens/TabScreens/MealsScreen';
import CategoriesScreen from '../screens/TabScreens/CategoriesScreen';
import SearchScreen from '../screens/TabScreens/SearchScreen';

import { Ionicons } from 'react-native-vector-icons';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator 
  initialRouteName="Home"  
  screenOptions={({ route }) => ({
    tabBarStyle: {
    backgroundColor: 'black', 
    height: 60, 
    paddingBottom: 10,
  },
  tabBarActiveTintColor: 'orange', 
  tabBarInactiveTintColor: 'gray', 

  
    tabBarIcon: ({ color, size }) => {
      let iconName;
      switch (route.name) {
        case 'Home':
          iconName = 'restaurant';
          break;
        case 'Categories':
          iconName = 'list';
          break;
        case 'Search':
          iconName = 'search';
          break;
      }
      return <Ionicons name={iconName} size={size} color={color} />;
    }, 
    })}>

  
  <Tab.Screen name="Categories" component={CategoriesScreen} />
  <Tab.Screen name="Home" component={MealsScreen}/>
  <Tab.Screen name="Search" component={SearchScreen} />
  
</Tab.Navigator>

  );
};


export default TabNavigator;

