import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';


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
      <Text style={styles.title}>Delicious Meals for you</Text>
      
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
    padding: 10, 
    backgroundColor: '#fff' 
  },
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 10 
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
    marginTop: 5 
  },
  footer: { 
    padding: 10, 
    alignItems: 'center', 
    marginTop: 10 
  },
});

export default MealsScreen;