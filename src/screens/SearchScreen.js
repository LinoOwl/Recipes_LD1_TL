import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [meals, setMeals] = useState([]);

  const searchMeals = async (text) => {
    setQuery(text);
    if (text.length > 1) {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`);
        const data = await response.json();
        setMeals(data.meals || []);
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    } else {
      setMeals([]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Meals</Text>

      <TextInput
        style={styles.input}
        placeholder="Search for a meal..."
        value={query}
        onChangeText={searchMeals}
      />

      <FlatList
        data={meals}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => navigation.navigate('MealDetails', { mealId: item.idMeal })}
          >
            <Image source={{ uri: item.strMealThumb }} style={styles.image} />
            <Text style={styles.mealName}>{item.strMeal}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  input: { 
    height: 40, 
    borderColor: '#ccc', 
    borderWidth: 1, 
    borderRadius: 8, 
    paddingHorizontal: 10, 
    marginBottom: 10 
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  image: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  mealName: { fontSize: 16, fontWeight: '500' },
});

export default SearchScreen;
