import { View, Text, FlatList, Image, StyleSheet } from 'react-native'
import React from 'react'
import { imageAssets } from '../../constant/Option'

const CourseProgress = ({ courseList }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Progress</Text>
      <FlatList
        data={courseList}
        horizontal={true} // Ensure horizontal scrolling
        showsHorizontalScrollIndicator={false} // Hide scroll bar
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.scrollContainer}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={imageAssets[item?.banner_image]} style={styles.image} />
            <View style={styles.content}>
              <Text style={styles.courseTitle}>{item?.courseTitle}</Text>
              <Text style={styles.progressText}>{item?.progress || 0}% Completed</Text>
              {/* Progress Bar */}
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBarFill, { width: `${item?.progress || 0}%` }]} />
              </View>
            </View>
          </View>
        )}
      />
    </View>
  )
}

export default CourseProgress

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollContainer: {
    paddingVertical: 10,
  },
  card: {
    width: 220, // Fixed width for horizontal scrolling
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginRight: 15, // Space between items
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  content: {
    width: '100%',
    marginTop: 10,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  progressText: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
  },
  progressBarContainer: {
    width: '100%',
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginTop: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
})
