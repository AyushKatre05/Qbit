import { View, Text, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { imageAssets } from './../../constant/Option'
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window'); // Get screen width

const CourseList = ({ courseList }) => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Courses</Text>

      <FlatList
        horizontal
        data={courseList}
        showsHorizontalScrollIndicator={false} // Hide scroll bar
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={()=>router.push(
            {
              pathname : '/courseView',
              params : {
                courseParams : JSON.stringify(item)
              }
            }
          )} key={index} style={styles.courseCard}>
            <Image
              style={styles.courseImage}
              source={imageAssets[item.banner_image]}
            />
            <Text style={styles.courseTitle}>{item?.courseTitle}</Text>
            <Text style={{textAlign:"center"}}>{item?.chapters?.length} Chapters</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default CourseList;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    marginLeft: 10,
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  courseCard: {
    width: width * 0.7, // Make each card take 70% of screen width
    marginRight: 15, // Space between cards
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5, // Android shadow
  },
  courseImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    objectFit:"contain"
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
    marginTop: 10,
    textAlign: 'center',
  },
});
