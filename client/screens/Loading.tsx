import * as React from 'react'
import { View, StyleSheet, Text, } from 'react-native';
  
   
   
interface LoadingScreenProps {   }



const LoadingScreen : React.FC <LoadingScreenProps> = ( ) => {

        return (

        <View style={styles.container}>
          <Text style={styles.title}>Loading...</Text>
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
export default LoadingScreen;