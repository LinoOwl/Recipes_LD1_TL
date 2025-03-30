import React from 'react';
import { ScrollView, StyleSheet, Text, View  } from 'react-native';


const TermsScreen = () => {
  return (
    
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.title}>Terms & Conditions</Text>
      
        <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
        <Text style={styles.content}>
          By downloading and using RecipeMaster, you agree to comply with these Terms of Service. 
          If you do not agree, please do not use the app.
        </Text>

        <Text style={styles.sectionTitle}>2. User Responsibilities</Text>
        <Text style={styles.content}>
          - You must be at least 13 years old to use this app.{'\n'}
          - You are responsible for the accuracy of any content you submit, including recipes, reviews, or comments.{'\n'}
          - You agree not to post any offensive, illegal, or harmful content.
        </Text>

        <Text style={styles.sectionTitle}>3. Content Ownership</Text>
        <Text style={styles.content}>
          - All user-submitted recipes remain the property of their respective creators.{'\n'}
          - By submitting content, you grant RecipeMaster a non-exclusive, royalty-free license to display and distribute it within the app.
        </Text>

        <Text style={styles.sectionTitle}>4. Health Disclaimer</Text>
        <Text style={styles.content}>
          - RecipeMaster provides general cooking information but does not guarantee the safety or nutritional accuracy of recipes.{'\n'}
          - Always check ingredients for allergies and food safety guidelines.
        </Text>

        <Text style={styles.sectionTitle}>5. Limitation of Liability</Text>
        <Text style={styles.content}>
          - RecipeMaster is not responsible for any damages, health issues, or losses resulting from using our recipes.{'\n'}
          - We do not guarantee that the app will always function without errors.
        </Text>

        <Text style={styles.sectionTitle}>6. Changes to Terms</Text>
        <Text style={styles.content}>
          - These terms may be updated from time to time. Continued use of the app signifies acceptance of any changes.
        </Text>

        <Text style={styles.sectionTitle}>7. Termination</Text>
        <Text style={styles.content}>
          - We reserve the right to suspend or delete accounts that violate these terms.
        </Text>
        </View>
        <Text style={styles.footerText}>
          THIS IS NOT A REAL TERMS AND SERVICE, JUST A PROJECT FOR COLLEGE.
        </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },

  title:{
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'serif',
    textAlign: 'center',
    marginBottom: 10,
    color: '#FF5733',
  },

  sectionTitle: {
    marginTop: 20,
    fontSize: 22,
    fontSize: 18,
    fontFamily: 'serif',
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },

  content: {
    fontSize: 16,
    fontFamily: 'serif',
    color: '#555',
    marginTop: 5,
    textAlign: 'justify'
  },

  footerText: {
    fontSize: 14,
    fontFamily: 'serif',
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'red',
    marginTop: 10,
    padding: 10,
    marginBottom: 30, 
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },

});

export default TermsScreen;

