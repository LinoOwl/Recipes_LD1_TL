import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const HomeScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome to My App!</Text>
      <Text style={styles.subtitle}>This is the Home Panel with instructions on what you can do in this app.</Text>

      <Text style={styles.sectionTitle}>Meals Tab</Text>
      <Text style={styles.text}>
        Browse a variety of delicious recipes. Click on any recipe image to view its details, including ingredients and instructions.
      </Text>

      <Text style={styles.sectionTitle}>Categories Tab</Text>
      <Text style={styles.text}>
        Explore recipes sorted into different categories. Each recipe can be clicked to view more details.
      </Text>

      <Text style={styles.sectionTitle}>Search Tab</Text>
      <Text style={styles.text}>
        Looking for a specific recipe? Use the search bar to find any dish and tap it to see the full recipe details.
      </Text>

      <Text style={styles.sectionTitle}>Recipe Details</Text>
      <Text style={styles.text}>
        Each recipe detail page includes ingredients, step-by-step instructions, and a YouTube video button to watch the recipe in action.
      </Text>

      <Text style={styles.sectionTitle}>Terms & Instructions</Text>
      <Text style={styles.text}>
        Check out the Terms page for app policies and guidelines. You are currently on the Instructions page, which helps you understand how to navigate the app.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: 'white' },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 10, fontFamily: 'serif', color: '' },
  subtitle: { fontSize: 18, textAlign: 'center', marginBottom: 20, color: 'gray' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 15, color: '#FF5733' },
  text: { fontSize: 16, lineHeight: 24, color: '#333' },
});

export default HomeScreen;
