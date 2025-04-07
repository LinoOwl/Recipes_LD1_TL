import React from 'react';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import MealsScreen from '../screens/TabScreens/MealsScreen';
import CategoriesScreen from '../screens/TabScreens/CategoriesScreen';
import SearchScreen from '../screens/TabScreens/SearchScreen';

import { Ionicons } from 'react-native-vector-icons';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
<Tab.Navigator 
 // Define a tela inicial do Tab Navigator
  initialRouteName="Home"  
  screenOptions={({ route }) => ({
    // Define o estilo do Tab Navigator
    tabBarStyle: {
    backgroundColor: 'black', 
    height: 60, 
    paddingBottom: 10,
  },
  headerShown: false, // Esconde o cabeçalho
  tabBarActiveTintColor: 'orange',  // Cor dos ícones/texto quando ativos
  tabBarInactiveTintColor: 'gray',  // Cor dos ícones/texto quando inativos

    tabBarIcon: ({ color, size }) => {
      let iconName;
      switch (route.name) {
        case 'Home': iconName = 'restaurant';
          break; 
        case 'Categories': iconName = 'list';
          break;
        case 'Search': iconName = 'search';
          break;
      } // Define o ícone de cada tela
      // Retorna o ícone correspondente à tela
      return <Ionicons name={iconName} size={size} color={color} />;
    }, 
    })}>

  {/* Define as telas do Tab Navigator */}
  <Tab.Screen name="Categories" component={CategoriesScreen} />
  <Tab.Screen name="Home" component={MealsScreen}/>
  <Tab.Screen name="Search" component={SearchScreen} />
  
</Tab.Navigator>

  );
};


export default TabNavigator;

