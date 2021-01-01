import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Text, Image, Dimensions} from 'react-native';
import Video from 'react-native-video';
import {useNavigation, useRoute} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlayCircle, faPauseCircle, faArrowCircleLeft} from '@fortawesome/free-solid-svg-icons';

let width = Dimensions.get('screen').width;
let height = Dimensions.get('screen').height;

interface MeditationPlayerProps {
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

const MeditationPlayer: React.FC<MeditationPlayerProps> = () => {
  let player = useRef<HTMLInputElement>('player');
  const nav = useNavigation();
  const route = useRoute<MeditationPlayerProps>();
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

  console.log('PROGRESS DATA: ==> ', progressData);

  return (
      <View>

       
    <View style={styles.container}>
     
      <View style={styles.headerBlock}>
         
        <View style={styles.detailGroup}>
        <TouchableOpacity
            style={styles.backButton}
            onPress={() => nav.navigate('Meditation')}>
            <FontAwesomeIcon icon={faArrowCircleLeft} color={'darkgrey'} size={28} />
          </TouchableOpacity>
          <Text style={styles.headerText1}> {instructor} </Text>
          <Text style={styles.title}> {title}</Text>
          <Text style={styles.textTime}> {length} </Text>
          <Text style={styles.headerText2}> {description}</Text>
        </View>

        <View style={styles.playButtonRow}>
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => setPause(!pause)}>
            {!pause ? (
              <FontAwesomeIcon icon={faPauseCircle} color={'white'} size={52} />
            ) : (
              <FontAwesomeIcon icon={faPlayCircle} color={'white'} size={52} />
            )}
          </TouchableOpacity>
        </View>
          <Text style={styles.headerText1}>{progressData.currentTime.toFixed(0)} of {progressData.playableDuration.toFixed(0)} seconds</Text>

        <View style={styles.trackbarParent}>
          <View
            style={{
              position: 'absolute',
              left: 0,
              width:
                ((0 + progressData.currentTime) /
                  progressData.playableDuration) *
                100,
              height: 6,
            }}></View>
        </View>
      </View>
      <Image
        source={{
          uri:
            contentImg
        }}
        style={styles.image}
      />

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
    zIndex: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    backgroundColor: 'black',
  
 
  },
  trackbarParent: {
    width: '100%',
    height: 5,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 20
  },
  trackbar: {
    color: 'blue',
  },


  title: {
    fontSize: 28,
    color: 'white',
    textAlign: 'center',
    fontWeight: '400',
    textShadowColor: 'black',
    textShadowRadius: 5,
    margin: 7

  },
  headerText1: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
    textShadowColor: 'black',
    textShadowRadius: 5
  },
  headerText2: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontWeight: '400',
    textShadowColor: 'black',
    textShadowRadius: 5,
    marginTop: 50
  },
  textTime: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontWeight: '400',
    textShadowColor: 'black',
    textShadowRadius: 5,
    marginBottom: 12
  },
  video: {
    width: 0,
    height: 0,
  },
  image: {
    position: 'absolute',
    height: height,
    width: '100%',
    resizeMode: 'stretch',
    zIndex: 0,
    
    opacity: .7
  },
  headerBlock: {
    display: 'flex',
    flexDirection: 'column',
 
    minHeight: height,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    zIndex: 3,
    margin: 20,
  
  },
  detailGroup: {
    display: 'flex',
    flexDirection: 'column',
    zIndex: 3,
  },
  playButtonRow: {
    height: 50,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    zIndex: 5,
   // marginBottom: 50

  },
  playButton: {
    height: 60,
    width: 40,
    zIndex: 5,
    
   
  },
  backButton: {
  
    height: 100,
    width: 100,
 

    
   

  },
});
export default MeditationPlayer;
