import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import background from '../images/background.jpg';

const MealsScreen = ({ navigation }) => {
  const [meals, setMeals] = useState([]);

  const fetchMeals = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      const data = await response.json();
      setMeals(data.meals || []);
    } catch (error) {
      console.error('Error fetching meals:', error);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);
  
  return (
    
    <View style={styles.container}>
      
      <Text style={styles.title}>Delicious Recipes for you</Text>
     
        <FlatList
          data={meals}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => (
            <TouchableOpacity 
                      style={styles.card} 
                      onPress={() => navigation.navigate('MealDetails', { mealId: item.idMeal })}
                    >
            <View style={styles.mealCard}>
              <Image source={{ uri: item.strMealThumb }} style={styles.mealImage} />
              <Text style={styles.mealTitle}>{item.strMeal}</Text>
            </View>
            </TouchableOpacity>
          )}
        />
     
      <View style={styles.footer}>
</View>

    </View>
   
  );
};


const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    height: '100%',
    width: '100%', 
    backgroundColor: 'black',
  },
  title: { 
    paddingTop: 20,
    fontSize: 32, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 10, 
    color: 'white',
    fontFamily: 'serif',
  },
  mealCard: { 
    alignItems: 'center', 
    marginBottom: 15 
  },
  mealImage: { 
    width: 150, 
    height: 150, 
    borderRadius: 10 
  },
  mealTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginTop: 5,
    color: 'white'
  },
  footer: { 
    padding: 10, 
    alignItems: 'center', 
    marginTop: 10 
  },
});

export default MealsScreen;