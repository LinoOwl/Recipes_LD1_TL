import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

const SearchScreen = ({ navigation }) => {

  const [query, setQuery] = useState('');// Estado para armazenar a consulta de pesquisa
  const [meals, setMeals] = useState([]);// Estado para armazenar os resultados da pesquisa

  // Função para pesquisar refeições
  const searchMeals = async (text) => { 
    setQuery(text); 
    
    
    if (text.trim().length >= 2) { // Verifica se o input tem pelo menos 2 caracteres
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
      

      <TextInput style={styles.input} placeholder="Search for a meal..." placeholderTextColor="orange"
        value={query} onChangeText={searchMeals}/>

      <Text style={styles.subtittle}>write more than 1 letter</Text>

{/* FlatList para renderizar as refeições, com o idMeal como keyExtractor
e o onPress para navegar para a tela de detalhes da refeição */}
      <FlatList data={meals} keyExtractor={(item) => item.idMeal}

        renderItem={({ item }) => (
          
          <TouchableOpacity style={styles.card} 
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
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#1c1c1c' 
  },
  title: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 10, 
    marginTop: 40,
    color: 'orange',
    fontFamily: 'serif',
  },
  subtittle: { 
    fontSize: 17, 
    textAlign: 'justified', 
    color: 'red', 
    marginBottom: 10,
    fontFamily: 'serif',
  },
  input: { 
    height: 40, 
    borderColor: 'orange', 
    color: 'orange',
    borderWidth: 1, 
    borderRadius: 8, 
    paddingHorizontal: 10, 
    marginBottom: 10,
    fontFamily: 'serif',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'orange',
    backgroundColor: '#282823',
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  image: { 
    width: 55, 
    height: 55, 
    borderRadius: 25, 
    marginRight: 10 
  },
  mealName: { 
    fontSize: 16, 
    fontWeight: '500',
    color: 'orange',
    fontFamily: 'serif',
  },
});

export default SearchScreen;
