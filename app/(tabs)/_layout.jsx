import React from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';

const TabLayout = () => {
  return (
    <Tabs screenOptions={{
      headerShown: false}}>
      <Tabs.Screen name="home" options={{
        title: 'Home',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" color={color} size={size} />
        )
      }}/>
      <Tabs.Screen name="explore"  options={{
        title: 'Explore',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="search" color={color} size={size} />
        )
      }}/>
      <Tabs.Screen name="progress" options={{
        title: 'Progress',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="stats-chart" color={color} size={size} />
        )
      }}/>
      <Tabs.Screen name="profile" options={{
        title: 'Profile',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person" color={color} size={size} />
        )
      }}/>

    </Tabs>
  )
}

export default TabLayout