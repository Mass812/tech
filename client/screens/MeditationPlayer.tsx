import React, {useEffect, useRef, useState} from 'react'
import { View, StyleSheet, Text, } from 'react-native';
 import Video from 'react-native-video';
import {useNavigation, useRoute} from '@react-navigation/native';
   
interface MeditationPlayerProps {   }


const MeditationPlayer : React.FC <MeditationPlayerProps> = ( ) => {
    let player = useRef<HTMLInputElement>('player')
const [isBuffering, setIsBuffering] = useState(true)
const [errrorMessage, setErrorMessage] = useState('')


        return (
        <View style={styles.container}>
          <Video source={{uri: "https://elasticbeanstalk-us-east-2-325970805780.s3.us-east-2.amazonaws.com/meditation_3min_breathing.mp3"}} />

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
},
backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
})
export default MeditationPlayer;