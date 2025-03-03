import { View, Text, Platform } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import NoCourse from '../../components/NoCourse'

const Home = () => {
  return (
    <View
      style={{
        padding: 25,
        paddingTop: Platform.OS === 'ios' ? 50 : 25,
        flex: 1,
        backgroundColor : 'white'
      }}>
      <Header/>
      <NoCourse/>
    </View>
  )
}

export default Home