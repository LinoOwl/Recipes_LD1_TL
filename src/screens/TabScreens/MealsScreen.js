import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, } from 'react-native';

const MealsScreen = ({ navigation }) => {
  const [meals, setMeals] = useState([]); // Inicializa o estado das receitas

  const fetchMeals = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      const data = await response.json();
      setMeals(data.meals || []);
    } catch (error) {
      console.error('Error fetching meals:', error);
    }
  }; // Fetch das receitas através da API

  useEffect(() => { fetchMeals(); }, []); 
  
  return (
    
    <View style={styles.container}>

      <Text style={styles.title}>Delicious Recipes</Text>
     {/* FlatList para renderizar as receitas, com o idMeal como keyExtractor 
     e o onPress para navegar para a tela de detalhes da receita */}
        <FlatList data={meals} keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} 
            onPress={() => navigation.navigate('MealDetails', { mealId: item.idMeal })}>
        
        <View style={styles.cardContent}>
              <Image source={{ uri: item.strMealThumb }} style={styles.mealImage} />
              <Text style={styles.mealTitle}>{item.strMeal}</Text>
</View>
            </TouchableOpacity>
          )}
        />
     
      <View style={styles.footer}></View>

    </View>
   
  );
};


const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    height: '100%',
    width: '100%', 
    backgroundColor: '#131312',
  },
  title: { 
    paddingTop: 50,
    fontSize: 32, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 30, 
    marginTop: 10,
    color: 'orange',
    fontFamily: 'serif',
  },
  mealImage: { 
    justifyContent: 'left',
    width: 130, 
    height: 130, 
    borderRadius: 10 
  },
  mealTitle: { 
    justifyContent: 'right',
    fontSize: 28, 
    fontWeight: 'bold', 
    marginTop: 20,
    color: 'orange'
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  mealTitle: { 
    fontSize: 30, 
    fontWeight: 'bold', 
    marginLeft: 20,
    color: 'orange',
    flexShrink: 1, 
    fontFamily: 'serif',
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#1c1c1c',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  footer: { 
    padding: 10, 
    alignItems: 'center', 
    marginTop: 20 
  },
});

export default MealsScreen;