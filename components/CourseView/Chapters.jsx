import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../../constant/Colors'

const Chapters = ({course}) => {
  return (
    <View style={{
        padding:20
    }}>
      <Text style={{
        fontSize:25
      }}>Chapters</Text>
      <FlatList 
        data={course?.chapters}
        renderItem={({item,index})=>(
            <View style={{
                padding : 15,
                borderWidth:0.5,
                borderRadius:15,
                marginTop:15,
                display : 'flex',
                flexDirection : 'row',
                justifyContent : 'space-between',
                alignItems : 'center'
            }}>
                <View 
                style={{
                    display:"flex",
                    flexDirection:"row",
                    gap:10
                }}
                >
                    <Text style={styles.chapterText}>{index+1}</Text>
                    <Text style={styles.chapterText}>{item?.chapterName}</Text>
                </View>
                <Ionicons name='play' size={24} color={Colors.BLUE}/>
            </View>
        )}
      />
    </View>
  )
}

export default Chapters

const styles = StyleSheet.create({
    chapterText:{
        fontSize:14
    }
})