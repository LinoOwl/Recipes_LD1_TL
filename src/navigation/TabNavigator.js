import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import MealsScreen from '../screens/MealsScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import HomeScreen from '../screens/HomeScreen';
import TermsScreen from '../screens/TermsScreen';
import SearchScreen from '../screens/SearchScreen';

import { Ionicons } from 'react-native-vector-icons';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ onPress }) => {
  return (
    <View>
    <TouchableOpacity style={styles.customButton} onPress={onPress}>
      <Ionicons name="add" size={32} color="white" />
    </TouchableOpacity>
    </View>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'Meals') iconName = 'restaurant';
        else if (route.name === 'Categories') iconName = 'list';
        else if (route.name === 'Home') iconName = 'add-circle';
        else if (route.name === 'Search') iconName = 'search';
        else if (route.name === 'Terms') iconName = 'document-text';
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}>
      <Tab.Screen name="Meals" component={MealsScreen} />
      <Tab.Screen name="Categories" component={CategoriesScreen} />
      <Tab.Screen name="Home" component={HomeScreen} options={{
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Terms" component={TermsScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  customButton: {
    width: 55,
    height: 55,
    borderRadius: 35,
    marginLeft: 13,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    top: -10, // Elevate above the tab bar
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 8,
  },
});

export default TabNavigator;

