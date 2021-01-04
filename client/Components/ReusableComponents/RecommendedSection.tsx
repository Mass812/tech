import * as React from 'react'
import { View, StyleSheet, Text, } from 'react-native';
  
   
   
interface RecommendedSectionProps { 
    header: string
  }



const RecommendedSection : React.FC <RecommendedSectionProps> = ({header, children} ) => {

    return (

        <View style={styles.container}>
          <Text style={styles.title}>{header}</Text>
          <View style={styles.childParent}>
              {children}
          </View>
        </View>

)}

 const styles = StyleSheet.create({
container: {

width: '100%',
textAlign: 'left'
},
title: {
fontSize: 20,
color: 'black',
textAlign: 'left',
margin: 10
},
childParent: {
minHeight: 200    
}
})
export default RecommendedSection;