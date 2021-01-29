import React, {useRef, useState} from 'react';
import {Dimensions, View, StyleSheet, Text} from 'react-native';
import Video from 'react-native-video';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  MeditationPlayerProps,
  iPlaybackShape,
} from '../../../Interfaces/MeditationPlayerScreenInterface';
import MediaPlayerComponent from './MeditationPlayerComponent';
import Slider from '@react-native-community/slider';

const width = Dimensions.get('window').width;

const MeditationPlayer: React.FC<MeditationPlayerProps> = () => {
  let player = useRef<HTMLInputElement | any>(null);
  const nav = useNavigation();
  const [isBuffering, setIsBuffering] = useState(false);
  const [errrorMessage, setErrorMessage] = useState('');
  const route = useRoute<MeditationPlayerProps>();

  let {
    title,
    contentImg,
    contentUrl,
    length,
    instructor,
    description,
  } = route.params;

  const [progressData, setProgressData] = useState<iPlaybackShape>({
    currentTime: 0,
    playableDuration: 34.6,
    seekableDuration: 888,
  });

  const getMinutesFromSeconds = (time: number) => {
    const minutes = time >= 60 ? Math.floor(time / 60) : 0;
    const seconds = Math.floor(time - minutes * 60);
    return `${minutes >= 10 ? minutes : '0' + minutes}:${
      seconds >= 10 ? seconds : '0' + seconds
    }`;
  };

  const [pause, setPause] = useState(false);
  const [currentTimeString, setCurrentTimeString] = useState('0');
  const [trackDuration, setTrackDuration] = useState('0');

  const onSlide = (sliderInfo: number) => {
    setProgressData({...progressData, currentTime: sliderInfo});
    player.current.seek(sliderInfo);
  };

  const onProgress = (x: iPlaybackShape) => {
    setProgressData(x);
    let now = getMinutesFromSeconds(progressData.currentTime);
    let total = getMinutesFromSeconds(progressData.playableDuration);
    setCurrentTimeString(now);
    setTrackDuration(total);
  };

  return (
    <View>
      <MediaPlayerComponent
        title={title}
        contentImg={contentImg}
        instructor={instructor}
        description={description}
        onPressArrowBack={() => nav.goBack()}
        onPressPause={() => setPause(!pause)}
        length={`${length}`}
        pause={pause}
      />
      <Video
        source={{
          uri: contentUrl,
        }}
        //onLoad={onLoad}
        onEnd={() => nav.goBack()}
        onBuffer={() => setIsBuffering(true)}
        onError={() => console.log('error')}
        paused={pause}
        fullscreen={true}
        fullscreenOrientation={'portrait'}
        onProgress={onProgress}
        ref={(video) => (player.current = video)}
      />
      <View style={styles.sliderParent}>
        <Slider
          value={progressData.currentTime}
          minimumValue={0}
          maximumValue={progressData.playableDuration}
          minimumTrackTintColor={'salmon'}
          maximumTrackTintColor={'#FFFFFF'}
          step={1}
          thumbTintColor={'rgba(28, 158, 155, 0.0)'}
          onValueChange={onSlide}
          style={{
            position: 'absolute',
            bottom: 50,
            zIndex: 99,
            left: 0,
            right: 0,
          }}
        />
      </View>
      <View style={styles.timerParent}>
        <Text style={styles.timer}>
          {currentTimeString} / {trackDuration}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderBlock: {
    display: 'flex',
    alignSelf: 'center',
  },
  sliderParent: {
    padding: 30,
    paddingBottom: 0,
    position: 'absolute',
    bottom: 10,
    zIndex: 2,
    width: width - 20,
    alignSelf: 'center',
  },
  timerParent: {
    position: 'absolute',
    left: 30,
    bottom: 25,
  },
  timer: {
    position: 'absolute',
    bottom: 70,
    zIndex: 2,
    width: width - 20,
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});
export default MeditationPlayer;
