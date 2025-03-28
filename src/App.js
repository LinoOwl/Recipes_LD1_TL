import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import SplashScreen from './screens/SplashScreen';
import TabNavigator from './navigation/TabNavigator';

import SearchScreen from './screens/SearchScreen';
import MealDetailsScreen from './screens/MealDetailsScreen';
import MealsScreen from './screens/MealsScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Main" component={TabNavigator} />

        {/* stack navigator para ir aos detalhes de cada receita  */}
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="MealDetails" component={MealDetailsScreen} />
        <Stack.Screen name="Meals" component={MealsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
