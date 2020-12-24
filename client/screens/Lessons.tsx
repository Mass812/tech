import * as React from 'react'
import { View, StyleSheet, Text, } from 'react-native';
  
   
   
interface LessonsProps {  
    
 }



const Lessons : React.FC <LessonsProps> = ( ) => {

        return (

        <View style={styles.container}>
            {/* <Text>{route.params}</Text> */}
          <Text style={styles.title}>this is the Lessons component</Text>
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
export default Lessons;