import React, { useEffect, useState, useCallback, useRef } from "react";
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator, Linking, TouchableOpacity, Alert } from 'react-native';
// Importa o YoutubePlayer para exibir vídeos do YouTube 
// ' https://lonelycpp.github.io/react-native-youtube-iframe/ '
// "A wrapper of the Youtube-iframe API built for react native."
import YoutubePlayer from "react-native-youtube-iframe"; 



const MealDetailsScreen = ({ route }) => {


 // Função chamada quando o estado do vídeo muda
  const onStateChange = useCallback((state) => { 
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const { mealId } = route.params; // Recebe o ID da refeição como parâmetro da rota
  const [meal, setMeal] = useState(null); // Estado para armazenar os detalhes da refeição
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento

  // Fetch os detalhes das receitas na API
  useEffect(() => {
    const fetchMealDetails = async () => {
      try { 
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        const data = await response.json();
        setMeal(data.meals[0]);
      } catch (error) {
        console.error('Error fetching meal details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMealDetails();
  }, [mealId]);

  if (loading) {
    // Exibe um indicador de carregamento enquanto os dados estão sendo buscados
    return <ActivityIndicator size="large" color="#FFA500" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <View style={styles.container}>
    <ScrollView  horizontal={false} bounces={false} showsVerticalScrollIndicator={false}>

      <Text style={styles.title}>{meal.strMeal}</Text>
      <Text style={styles.category}>Category: {meal.strCategory}</Text>
      <Text style={styles.area}>Origin: {meal.strArea}</Text>

        {/* YouTube Video */}
<View style={{marginBottom: -50, paddingBottom: 0, overflow: 'hidden'}}>
        <YoutubePlayer height={270} padding={20} 
        videoId={meal.strYoutube ? meal.strYoutube.split('v=')[1] : null} 
        onChangeState={onStateChange}/>
</View>

      {/* Ingredients List */}
      <Text style={styles.sectionTitle}>Ingredients:</Text>
      {/* Mapeia os ingredientes e medidas, filtrando os que não existem */}
      {/* Exibe os ingredientes e medidas em uma lista, cada um por um ponto */}
      {Array.from({ length: 20 }, (_, i) => i + 1).map(i => meal[`strIngredient${i}`] && `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
        .filter(Boolean).map((ingredient, index) => (
          <Text key={index} style={styles.ingredient}>• {ingredient}</Text>
        ))
      }
      
      <View style={styles.flowerBox}>
      {/* Instructions */}
      <Text style={styles.sectionTitle2}>Instructions</Text>
      {/* Divida as instruções por '.' e mapeie-as para exibir cada etapa */}
      {meal.strInstructions ?.split('.').map(step => step.trim()).filter(Boolean).map((step, index) => (
        // Exibir cada etapa como um componente de texto separado
    <Text key={index} style={styles.instructions}>• {step}.</Text>
  ))
}
      </View>
    </ScrollView>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#131312', 
    justifyContent: 'center',
  },
  title: { 
    fontFamily: 'serif',
    fontSize: 34, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginTop: 30,
    marginBottom: 10,
    color: 'orange'
  },
  category: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 5, 
    color: 'white',
    fontFamily: 'serif' 
  },
  area: { 
    fontSize: 20, 
    textAlign: 'center', 
    marginBottom: 30, 
    color: 'white',
    fontFamily: 'serif' 
  },
  sectionTitle: { 
    fontSize: 30, 
    fontWeight: 'bold', 
    marginTop: 15, 
    marginBottom: 5,
    color: 'orange',
    fontFamily: 'serif'
  },
  sectionTitle2: { 
    fontSize: 30, 
    fontWeight: 'bold', 
    marginTop: 15, 
    marginBottom: 5,
    color: 'orange',
    fontFamily: 'serif',
    textAlign: 'center',
  },
  ingredient: { 
    fontSize: 17, 
    marginLeft: 10, 
    marginBottom: 3,
    color: 'white',
    fontFamily: 'serif'
  },
  instructions: { 
    fontSize: 16, 
    textAlign: 'justify', 
    marginTop: 5, 
    color: 'white',
    fontFamily: 'serif'
  },
  flowerBox: {       
    borderRadius: 40,                 
    padding: 20,
    justifyContent: 'center',                   
    borderWidth: 2,
    borderColor: '#ffb6c1',          
    marginTop: 50,
    marginBottom: 20,
  },
});

export default MealDetailsScreen;
