import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator, Linking, TouchableOpacity } from 'react-native';

const MealDetailsScreen = ({ route }) => {
  const { mealId } = route.params;
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

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
    return <ActivityIndicator size="large" color="#FFA500" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
      <Text style={styles.title}>{meal.strMeal}</Text>
      <Text style={styles.category}>Category: {meal.strCategory}</Text>
      <Text style={styles.area}>Origin: {meal.strArea}</Text>

      {/* Ingredients List */}
      <Text style={styles.sectionTitle}>Ingredients:</Text>
      {Array.from({ length: 20 }, (_, i) => i + 1)
        .map(i => meal[`strIngredient${i}`] && `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
        .filter(Boolean)
        .map((ingredient, index) => (
          <Text key={index} style={styles.ingredient}>• {ingredient}</Text>
        ))
      }

      {/* Instructions */}
      <Text style={styles.sectionTitle}>Instructions:</Text>
      <Text style={styles.instructions}>{meal.strInstructions}</Text>

      {/* YouTube Video */}
      {meal.strYoutube && (
        <TouchableOpacity 
          style={styles.youtubeButton} 
          onPress={() => Linking.openURL(meal.strYoutube)}
        >
          <Text style={styles.youtubeText}>Watch on YouTube</Text>
        </TouchableOpacity>
      )}
       <View style={styles.footer}>
      
    </View>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', marginTop: 40 },
  image: { width: '100%', height: 250, borderRadius: 10, marginBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  category: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 5, color: '#888' },
  area: { fontSize: 16, textAlign: 'center', marginBottom: 10, color: '#666' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 15, marginBottom: 5 },
  ingredient: { fontSize: 16, marginLeft: 10, marginBottom: 3 },
  instructions: { fontSize: 16, textAlign: 'justify', marginTop: 5 },
  youtubeButton: { backgroundColor: '#FF0000', padding: 10, marginTop: 15, borderRadius: 8, alignItems: 'center' },
  youtubeText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  footer: { padding: 10, alignItems: 'center', marginTop: 40 },
  footerText: { color: '#888', fontSize: 16 },
});

export default MealDetailsScreen;
