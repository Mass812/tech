import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import Slider from '@react-native-community/slider';
import {LessonPlayerStore} from '../../Screens/LessonPlayer';
const width = Dimensions.get('screen').width;

interface VideoControlSliderProps {}

const VideoControlSlider: React.FC<VideoControlSliderProps> = ({}) => {
  let {state, dispatch} = useContext(LessonPlayerStore);

  useEffect(() => {}, [state, dispatch]);

  return (
    <>
      <View style={styles.sliderParent}>
        <Slider
          value={state.currentTime}
          minimumValue={0}
          maximumValue={state.playableDuration}
          minimumTrackTintColor={'#689493'}
          maximumTrackTintColor={'#FFFFFF'}
          step={1}
          // onValueChange={(sliderInfo) =>
          //   dispatch({type: 'CURRENT_PLAYER_TIME_AS_STRING', payload: sliderInfo})
          // }
          // onSlidingStart={onSlideStart}
          // onSlidingComplete={onSlideEnd}
          // thumbTintColor={'rgba(28, 158, 155, 0.4)'}
        />
      </View>
      <View style={styles.timerParent}>
        <Text style={styles.timer}>
          {state.currentPlayerTimeAsString} / {state.totalPlayerTimeAsString}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  sliderParent: {
    padding: 30,
    paddingBottom: 0,
    position: 'absolute',
    bottom: 10,
    zIndex: 2,
    width: width - 20,
  },
  timerParent: {
    position: 'absolute',
    left: 30,
    bottom: 25,
  },
  timer: {
    position: 'absolute',
    bottom: 20,
    zIndex: 2,
    width: width - 20,
    color: 'white',
  },
});
export default VideoControlSlider;
