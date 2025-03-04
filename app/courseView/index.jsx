import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import Intro from '../../components/CourseView/Intro';

const CourseView = () => {
  const {courseParams} = useLocalSearchParams();
  console.log(courseParams)
  const course = JSON.parse(courseParams);
  return (
    <View>
    <Intro course={course}/>
    </View>
  )
}

export default CourseView