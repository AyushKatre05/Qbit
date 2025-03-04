import { View, Text, Pressable } from "react-native";
import React from "react";
import { Image } from "react-native";
import { imageAssets } from "../../constant/Option";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../components/Shared/Button"
import { useRouter } from "expo-router";

const Intro = ({ course }) => {
    const router = useRouter();
  return (
    <View>
      <Image
        style={{ width: "100%", height: 250, objectFit: "contain" }}
        source={imageAssets[course?.banner_image]}
      />
      <View style={{padding:20}}>
        <Text style={{fontSize:25}}>
            {course?.courseTitle}
        </Text>
        <View style={{display:'flex', flexDirection:'row', gap:5, alignItems:'center',marginTop:5}}>
            <Ionicons name="book-outline" size={20}/>
            <Text>{course?.chapters?.length} Chapters</Text>
        </View>
        <View>
           <Text style={{margin:10}}>Description</Text>
           <Text style={{fontSize:18,color:'gray'}}>
            {course?.description}
           </Text> 
           <Button text={'Start Now'}/>
        </View>
      </View>
      <Pressable onPress={()=>router.back()} style={{position:"absolute"}}>
            <Ionicons name="arrow-back" size={25}/>
        </Pressable>
    </View>
  );
};

export default Intro;
