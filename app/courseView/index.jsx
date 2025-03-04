import { View, Text, FlatList } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import Intro from "../../components/CourseView/Intro";
import Chapters from "../../components/CourseView/Chapters";
import Colors from "../../constant/Colors";

const CourseView = () => {
  const { courseParams } = useLocalSearchParams();
  console.log(courseParams);
  const course = JSON.parse(courseParams);
  return (
    <FlatList
      data={[]}
      ListHeaderComponent={
        <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
          <Intro course={course} />
          <Chapters course={course} />
        </View>
      }
    />
  );
};

export default CourseView;
