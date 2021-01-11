import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import Slider from '@react-native-community/slider';
import {SgVideoStore} from '../SelfGuidedVideoScreen';
const width = Dimensions.get('screen').width;

interface VideoControlSliderProps {}

const VideoControlSlider: React.FC<VideoControlSliderProps> = () => {
  let {state, dispatch} = useContext(SgVideoStore);

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
          thumbTintColor={'rgba(28, 158, 155, 0.0)'}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  sliderParent: {
    position: 'absolute',
    bottom: 0,
    left: -20,
    zIndex: 2,
    right: -20,
    height: 21,
  },
});
export default VideoControlSlider;
