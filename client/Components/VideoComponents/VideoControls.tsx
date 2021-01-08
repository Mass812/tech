import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faTimesCircle,
  faExpandAlt,
  faPause,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {LessonPlayerStore} from '../../Screens/LessonPlayer';
import VideoControlSlider from './VideoControlSlider';
const width = Dimensions.get('screen').width;

interface VideoControlsProps {}

const VideoControls: React.FC<VideoControlsProps> = ({}) => {
  let {state, dispatch} = useContext(LessonPlayerStore);

  const nav = useNavigation();

  const handleClose = () => {
    nav.goBack();
  };

  const hamdleExpand = () => {
    // side view screen
  };

  const handlePause = () => {
    let playingMode = !state.paused;
    dispatch({type: 'PAUSED', payload: playingMode});
    dispatch({type: 'SHOW_OPTIONS', payload: playingMode});

    setTimeout(() => {
      if (state.paused)
        return dispatch({
          type: 'RENDERED_VIDEO_TAPPED',
          payload: false,
        });
    }, 900);
  };

  const handlePressScreen = () => {
    let videoScreenTapped = !state.renderedVideoTapped;
    dispatch({
      type: 'RENDERED_VIDEO_TAPPED',
      payload: videoScreenTapped,
    });
  };

  return (
    <TouchableOpacity style={styles.parent} onPress={handlePressScreen}>
      {state.renderedVideoTapped ? (
        <>
          <View style={styles.topIcons}>
            <TouchableOpacity style={styles.leftIcon} onPress={handleClose}>
              <FontAwesomeIcon icon={faTimesCircle} size={17} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.rightIcon} onPress={hamdleExpand}>
              <FontAwesomeIcon icon={faExpandAlt} size={17} color="black" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.middleIcon} onPress={handlePause}>
            {state.paused ? (
              <FontAwesomeIcon icon={faPlay} size={36} color={'black'} />
            ) : (
              <FontAwesomeIcon icon={faPause} size={36} color={'black'} />
            )}
          </TouchableOpacity>
          <VideoControlSlider />
        </>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    display: 'flex',
    position: 'absolute',
    paddingRight: 25,
    paddingLeft: 25,
    paddingTop: 55,
    width: width,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  topIcons: {
    position: 'absolute',
    top: 56,
    left: 25,
    right: 25,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  middleIcon: {
    position: 'absolute',
    top: 200 - 18,
    left: width / 2 - 18,
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 30,
    opacity: 0.6,

    //zIndex: 2,
  },
  title: {
    fontSize: 20,
    color: 'green',
  },
  leftIcon: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 25,
    opacity: 0.6,
  },
  rightIcon: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 25,
    opacity: 0.6,
  },
});
export default VideoControls;
