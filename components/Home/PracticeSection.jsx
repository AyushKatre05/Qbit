import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { practiceOption } from '../../constant/Option'

const PracticeSection = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Practice</Text>
      <FlatList
        data={practiceOption}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default PracticeSection;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
    width: 85, // Small size
    height: 85,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Android shadow
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
});
