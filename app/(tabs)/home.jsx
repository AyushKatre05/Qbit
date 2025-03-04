import { View, Text, Platform } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Home/Header'
import NoCourse from '../../components/NoCourse'
import {db} from "./../../config/firebaseConfig"
import { collection, getDocs, query, where } from 'firebase/firestore'
import { UserDetailContext } from '../../context/UserDetailContext'
import CourseList from '../../components/Home/CourseList'

const Home = () => {

  useEffect(() => {
    userDetail && GetCourseList();
  }, [userDetail])

  const {userDetail,setUserDetail} = useContext(UserDetailContext);
  const [courseList, setCourseList] = useState([]);
  const GetCourseList= async()=>{
    const q = query(collection(db, "Courses"),where("createdBy", "==", userDetail?.email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log( "--",doc.data());
          setCourseList(prev=>[...prev,doc.data()]);
        });
  }
  return (
    <View
      style={{
        padding: 25,
        paddingTop: Platform.OS === 'ios' ? 50 : 25,
        flex: 1,
        backgroundColor : 'white'
      }}>
      <Header/>
      {
        courseList?.length == 0 ? <NoCourse/> : <CourseList/>
      }
    </View>
  )
}

export default Home