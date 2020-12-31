import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Text, Image, Dimensions} from 'react-native';
import Video from 'react-native-video';
import {useNavigation, useRoute} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import useFloatingHeaderHeight from '@react-navigation/stack/lib/typescript/src/utils/useHeaderHeight';

let width = Dimensions.get('screen').width;
let height = Dimensions.get('screen').height;

interface MeditationPlayerProps {}

const MeditationPlayer: React.FC<MeditationPlayerProps> = () => {
  let player = useRef<HTMLInputElement>('player');
  const nav = useNavigation();
  const [isBuffering, setIsBuffering] = useState(false);
  const [errrorMessage, setErrorMessage] = useState('');
  const [pause, setPause] = useState(false);

  const onBuffer = () => {
    setIsBuffering(true);
  };

  const videoError = () => {
    setErrorMessage('There was an error');
  };

  const onLoad = () => {
    setIsBuffering(false);
  };

  const onEnd = () => {
    console.log('Meditation Successfully Completed');
    nav.navigate('Meditations');
  };

  const handlePlay = () => {
    console.log('action');
  };
  const handlePause = () => {
    console.log('action');
    setPause((el) => (el = !pause));
  };
  const handleBack = () => {
    console.log('action');
  };
  const handleRestart = () => {
    console.log('action');
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri:
            'https://elasticbeanstalk-us-east-2-325970805780.s3.us-east-2.amazonaws.com/meditation_trees.jpg',
        }}
        style={styles.image}
      />
      <Text style={styles.container}>Here</Text>
      <Video
        source={{
          uri:
            'https://elasticbeanstalk-us-east-2-325970805780.s3.us-east-2.amazonaws.com/meditation_3min_breathing.mp3',
        }}
        onLoad={() => setIsBuffering(false)}
        onEnd={onEnd}
        onBuffer={() => setIsBuffering(true)} // Callback when remote video is buffering
        onError={videoError} // Callback when video cannot be loaded
        style={styles.video}
        paused={pause}
      />
      <View style={styles.buttonGroup}>

      <TouchableOpacity style={styles.button} onPress={handlePlay}>
        <Text>PLay</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handlePause}>
        <Text>Pause</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleBack}>
        <Text>Back</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleRestart}>
        <Text>Restart</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,


  },
  title: {
    fontSize: 20,
    color: 'green',
  },
  video: {
    width: 500,
    height: 300,
  },
  image: {
    position: 'absolute',
    height: height,
    width: '100%',
    resizeMode: 'stretch',
    zIndex: 0,
  },
  buttonGroup: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',

    left: (width/4),
    top: height/3
    
  },
  button: {
 position: 'relative',
    zIndex: 5,
    fontSize: 40,
    margin: 5,
    textAlign: 'center',
    alignSelf: 'center',

    backgroundColor: 'aqua',

  },
});
export default MeditationPlayer;
