import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';

const MealsScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]); // Array para guardar as categorias
  const [meals, setMeals] = useState([]); // Array para guardar as receitas
  const [selectedCategory, setSelectedCategory] = useState(''); // Estado para a categoria selecionada

  // Função para buscar as receitas de uma categoria específica
  const fetchMeals = async (category) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      const data = await response.json();
      setMeals(data.meals || []);
    } catch (error) {
      console.error('Error fetching meals:', error);
    }
  };
  // Função para buscar as categorias
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
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      
      {/* Flatlist Horizontal para as categorias */}
      <FlatList data={categories} keyExtractor={(item) => item.idCategory} horizontal   
      showsHorizontalScrollIndicator={false} style={styles.categoryScroll}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.categoryItem, selectedCategory === item.strCategory && styles.selectedCategory]}
            onPress={() => setSelectedCategory(item.strCategory)}
          >
            <Image source={{ uri: item.strCategoryThumb }} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{item.strCategory}</Text>

          </TouchableOpacity>
        )}
      />
      {/* Flatlist Vertical para as receitas */}
      <FlatList data={meals} keyExtractor={(item) => item.idMeal}
        numColumns={2} renderItem={({ item }) => (
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
  container: { 
    flex: 1, 
    padding: 10, 
    backgroundColor: '#131312' 
  },

  title: { 
    fontSize: 32,
    paddingTop: 20, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 10, 
    marginTop: 20,
    color: 'orange',
    fontFamily: 'serif',
  },
  
//category styles
  categoryScroll: { 
    marginBottom: 15 
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 10,
    padding: 5,
    paddingBottom: 30,
    borderRadius: 10,
  },
  
  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  categoryText: { 
    fontSize: 12, 
    fontWeight: 'bold', 
    textAlign: 'center',
    color: 'orange',
    fontFamily: 'serif', 
  },

  // Meals Styles
  card: { 
    flex: 1, 
    margin: 5, 
    alignItems: 'center' 
  },
  mealCard: { 
    alignItems: 'center' 
  },
  mealImage: { 
    width: 120, 
    height: 120, 
    borderRadius: 10 
  },
  mealTitle: { 
    fontSize: 12, 
    fontWeight: 'bold', 
    marginTop: 5, 
    textAlign: 'center',
    color: 'orange',
    fontFamily: 'serif', 
    justifyContent: 'center',
  },
});

export default MealsScreen;

