import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import SplashScreen from './screens/SplashScreen';
import TabNavigator from './navigation/TabNavigator';
import SearchScreen from './screens/TabScreens/SearchScreen';
import MealDetailsScreen from './screens/MealDetailsScreen';
import MealsScreen from './screens/TabScreens/MealsScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      {/* stack navigator para fazer uma tela de abertura quando a app é iniciada*/}
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
