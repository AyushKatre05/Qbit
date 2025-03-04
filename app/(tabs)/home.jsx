import { View, Text, Platform, FlatList } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Home/Header";
import NoCourse from "../../components/NoCourse";
import { db } from "./../../config/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { UserDetailContext } from "../../context/UserDetailContext";
import CourseList from "../../components/Home/CourseList";
import PracticeSection from "../../components/Home/PracticeSection";
import CourseProgress from "../../components/Home/CourseProgress";

const Home = () => {
  useEffect(() => {
    if (userDetail) GetCourseList();
  }, [userDetail]);

  const { userDetail } = useContext(UserDetailContext);
  const [courseList, setCourseList] = useState([]);

  const GetCourseList = async () => {
    setCourseList([]);
    const q = query(
      collection(db, "Courses"),
      where("createdBy", "==", userDetail?.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log("--", doc.data());
      setCourseList((prev) => [...prev, doc.data()]);
    });
  };

  if (courseList.length === 0) {
    return (
      <View style={{ flex: 1, paddingTop: Platform.OS === "ios" ? 50 : 25 }}>
        <Header />
        <NoCourse />
      </View>
    );
  }

  const sections = [
    { id: "progress", component: <CourseProgress courseList={courseList} /> },
    { id: "practice", component: <PracticeSection courseList={courseList} /> },
    { id: "courseList", component: <CourseList courseList={courseList} /> },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingTop: Platform.OS === "ios" ? 50 : 25 }}>
      <Header />
      <FlatList
        data={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => item.component}
        contentContainerStyle={{ paddingHorizontal: 25, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Home;
