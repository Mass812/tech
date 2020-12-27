import * as React from 'react'
import { View, StyleSheet, Text, } from 'react-native';
  
   
   
interface MeditationProps {   }



const Meditation : React.FC <MeditationProps> = ( ) => {

        return (

        <View style={styles.container}>
          <Text style={styles.title}>this is the Meditation component</Text>
        </View>

)}

 const styles = StyleSheet.create({
container: {
flex:1,
alignItems: 'center',
justifyContent: 'center',
},
title: {
fontSize: 20,
color: 'green',
}
})
export default Meditation;