import * as React from 'react'
import { View, StyleSheet, Text, Dimensions} from 'react-native';
  
  
   
interface CarouselProps { 
  w: number

  }





const Carousel : React.FC <CarouselProps> = ( {w}) => {







        return (

        <View style={styles.container}>
          <View style={styles.miniBox}>

          <Text style={styles.bar}> o o o </Text>
          </View>
          <View></View>
        </View>

)}




 const styles = StyleSheet.create({
container: {
position: 'absolute',
backgroundColor: 'grey',
padding: 10,
width: 175,
height: 45,
zIndex: 0,
},
bar: {
fontSize: 30,
color: 'white',
zIndex: 2,
},
miniBox: {
position: 'absolute',  
width: 20,
height: 65,
zIndex: 1,
},
})
export default Carousel;