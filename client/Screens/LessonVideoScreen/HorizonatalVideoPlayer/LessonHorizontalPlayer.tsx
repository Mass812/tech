import {VideoStore} from '../LessonVideoScreen';
import Video, {
  OnSeekData,
  OnLoadData,
  OnProgressData,
} from 'react-native-video';
import React, {useContext, useRef, useEffect} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LoadingScreen from '../../SplashScreens/Loading';

const width = Dimensions.get('screen').width;

interface VideoPlayerPortraitWindowProps {
  contentUrl: string;
}

interface iPlaybackShape {
  currentTime: number;
  playableDuration: number;
  seekableDuration: number;
}

const VideoPlayerPortraitWindow: React.FC<VideoPlayerPortraitWindowProps> = ({
  contentUrl,
}) => {
  let {state, dispatch} = useContext(VideoStore);
  let videoRef = useRef<HTMLElement | null>(null);
  const nav = useNavigation();

  const handleOnLoad = () => {
    dispatch({type: 'LOADING', payload: false});
    dispatch({type: 'BUFFERING', payload: false});
  };

  const getMinutesFromSeconds = (time: number) => {
    const minutes = time >= 60 ? Math.floor(time / 60) : 0;
    const seconds = Math.floor(time - minutes * 60);
    return `${minutes >= 10 ? minutes : '0' + minutes}:${
      seconds >= 10 ? seconds : '0' + seconds
    }`;
  };
  const onProgress = (data: iPlaybackShape) => {
    //only way is metadata or db doc params
    if (!state.loading && !state.paused) {
      dispatch({
        type: 'CURRENT_TIME',
        payload: data.currentTime,
      });
      dispatch({
        type: 'PLAYABLE_DURATION',
        payload: data.seekableDuration,
      });
      dispatch({
        type: 'TOTAL_PLAYER_TIME_AS_STRING',
        payload: getMinutesFromSeconds(state.playableDuration),
      });
      dispatch({
        type: 'CURRENT_PLAYER_TIME_AS_STRING',
        payload: getMinutesFromSeconds(state.currentTime),
      });
    }
  };

  return (
    <>
      <Video
        source={{
          uri: `${contentUrl}`,
        }}
        onLoadStart={() => dispatch({type: 'LOADING', payload: true})}
        onLoad={handleOnLoad}
        onEnd={() => nav.goBack()}
        onBuffer={() => dispatch({type: 'BUFFERING', payload: true})} // Callback when remote video is buffering
        onError={() => console.log('error')} // Callback when video cannot be loaded
        style={styles.videoPortrait}
        paused={state.paused}
        fullscreen={false}
        onFullscreenPlayerWillPresent={() => {
          // dispatch({type: 'LOCK_PORTRAIT', payload: true});
        }}
        //fullscreenOrientation={'portrait'}
        ref={(video) => (videoRef.current = video)}
        onProgress={(currentTime: any) => onProgress(currentTime)}
        progressUpdateInterval={250}
        resizeMode={'cover'}
        bufferConfig={{
          minBufferMs: 30000,
          maxBufferMs: 70000,
          bufferForPlaybackMs: 3500,
          bufferForPlaybackAfterRebufferMs: 5000,
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  videoPortrait: {
    position: 'absolute',
    zIndex: 10,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
export default VideoPlayerPortraitWindow;
