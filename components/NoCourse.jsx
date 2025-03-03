import { View, Image, Text } from "react-native";
import React from "react";
import Button from "./Shared/Button";
import { useRouter } from "expo-router";

const NoCourse = () => {

  const router = useRouter();

  return (
    <View
      style={{
        marginTop: 40,
      }}
    >
      <Image
        source={require("./../assets/images/course.webp")}
        style={{
          width: 250,
          height: 250,
          alignSelf: "center",
          objectFit: "contain",
        }}
      ></Image>
      <Text
      style={
        {
          textAlign: 'center',
          fontSize: 25,
          color: 'gray',
          marginTop: 20
      }}
      > You have No Courses Yet</Text>
    <Button text={'+ Create New Course'} onPress={()=>router.push('/addCourse')}/>
    <Button text={'Explore Existing Course'} type="outline"/>
    </View>
  );
};

export default NoCourse;
