import React, {useEffect, useRef, useState} from 'react';
import { View, StyleSheet, Text, Dimensions} from 'react-native';
import Video from 'react-native-video';
import {useNavigation, useRoute} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlayCircle, faPauseCircle, faArrowCircleLeft} from '@fortawesome/free-solid-svg-icons';

let width = Dimensions.get('screen').width;
let height = Dimensions.get('screen').height;

   
   

  interface LessonPlayerProps {
    key: string;
    name: string;
    params: Params;
  }
  
  type Params = {
    contentImg: string;
     contentUrl: string;
    length: number
    instructor: string
    description: string
    title: string
  };
interface playbackShape {
    currentTime: number;
    playableDuration: number;
    seekableDuration: number;
  }




const LessonPlayer : React.FC <LessonPlayerProps> = ( ) => {
    let player = useRef<HTMLInputElement>('player');
    const nav = useNavigation();
    const route = useRoute<LessonPlayerProps>();
    let { 
     title,
     contentImg,
     contentUrl,
     length,
     instructor,
     description,
    } = route.params;
    const [isBuffering, setIsBuffering] = useState(false);
    const [errrorMessage, setErrorMessage] = useState('');
    const [progressData, setProgressData] = useState<playbackShape>({
      currentTime: 0,
      playableDuration: 34.6,
      seekableDuration: 888,
    });
    const [pause, setPause] = useState(false);
  





        return (

        <View style={styles.container}>
          <Text style={styles.title}>this is the LessonPlayer component</Text>
          <Video
        source={{
          uri:
            contentUrl,
        }}
        onLoad={() => setIsBuffering(false)}
        onEnd={() => nav.goBack()}
        onBuffer={() => setIsBuffering(true)} // Callback when remote video is buffering
        onError={()=>console.log('error')} // Callback when video cannot be loaded
        style={styles.video}
        paused={pause}
        fullscreen={true}
        fullscreenOrientation={'portrait'}
        onProgress={(currentTime: any) => setProgressData({...currentTime})}
      />
        </View>

)}

 const styles = StyleSheet.create({
container: {
flex:1,
alignItems: 'center',
justifyContent: 'center',
height: 600,
width: width,

},
title: {
fontSize: 20,
color: 'green',
},
video: {
height: 600,
width: width
}
})
export default LessonPlayer;