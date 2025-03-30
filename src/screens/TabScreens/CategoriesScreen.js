import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const MealsScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchMeals = async (category) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      const data = await response.json();
      setMeals(data.meals || []);
    } catch (error) {
      console.error('Error fetching meals:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
      const data = await response.json();
      setCategories(data.categories || []);
      if (data.categories.length > 0) {
        setSelectedCategory(data.categories[0].strCategory); 
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchMeals(selectedCategory);
    }
  }, [selectedCategory]);

  return (
    <View>
      <Text style={styles.title}>Categories</Text>
      
      {/* Horizontal Scroll for Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {categories.map((category) => (
          <TouchableOpacity key={category.idCategory} style={[styles.categoryItem, ]}
            onPress={() => setSelectedCategory(category.strCategory)}>
            <Image source={{ uri: category.strCategoryThumb }} style={styles.categoryImage} />
            <Text >{category.strCategory}</Text>
          </TouchableOpacity>
        ))}
        
      </ScrollView>

      
      
      <FlatList
        data={meals}
        keyExtractor={(item) => item.idMeal}
        numColumns={2}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, marginTop: 20 },
  
//category styles
  categoryScroll: { marginBottom: 15 },
  categoryItem: {
    alignItems: 'center',
    marginRight: 10,
    padding: 5,
    paddingBottom: 30,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
  },
  selectedCategory: {
    backgroundColor: '#ffa726', 
  },
  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  categoryText: { fontSize: 12, fontWeight: 'bold', textAlign: 'center' },

  // Meals Styles
  card: { flex: 1, margin: 5, alignItems: 'center' },
  mealCard: { alignItems: 'center' },
  mealImage: { width: 120, height: 120, borderRadius: 10 },
  mealTitle: { fontSize: 14, fontWeight: 'bold', marginTop: 5, textAlign: 'center' },
});

export default MealsScreen;

