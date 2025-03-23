import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const HomeScreen = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then(response => setMeals(response.data.meals))
      .catch(error => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delicious Meals</Text>
      <ScrollView>
        <FlatList
          data={meals}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => (
            <View style={styles.mealCard}>
              <Image source={{ uri: item.strMealThumb }} style={styles.mealImage} />
              <Text style={styles.mealTitle}>{item.strMeal}</Text>
            </View>
          )}
        />
      </ScrollView>
      <View style={styles.footer}>
        <Text>© 2024 RecipesApp - All Rights Reserved</Text>
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
    marginTop: 5 },
  footer: { padding: 10, alignItems: 'center', borderTopWidth: 1, marginTop: 10 },
});

export default HomeScreen;

