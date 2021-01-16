import {VideoStore} from '../LessonVideoScreen';
import Video from 'react-native-video';
import React, {useContext, useRef, useEffect, useState} from 'react';
import {StyleSheet, Dimensions, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Orientation from 'react-native-orientation-locker';
import VideoControls from './LessonVideoIconsOverlay';
import PauseOptionCard from './PauseOptionCard';
import TitleBannerUnderVideo from './LessonTitleBannerUnderVideo';
import {ScrollView} from 'react-native-gesture-handler';
import CourseOverview from '../../../ReusableComponents/UiCards/CourseOverview';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
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
  children,
}) => {
  let {state, dispatch} = useContext(VideoStore);
  const [hidePauseMenu, setHidePauseMenu] = useState(state.paused);
  let videoRef = useRef<HTMLElement | any>(null);

  const nav = useNavigation();

  const handleOrientation = (orientation: string) => {
    var initial = Orientation.getInitialOrientation();
    if (initial == 'LANDSCAPE-RIGHT' || 'LANDSCAPE-LEFT') {
      dispatch({type: 'LOCK_PORTRAIT', payload: false});
      return;
    } else {
      dispatch({type: 'LOCK_PORTRAIT', payload: true});
      return;
    }
  };

  useEffect(() => {
    console.log('rerendered ', state.currentTime);
    Orientation.addOrientationListener((orientation: string) => {
      handleOrientation(orientation);
    });
    return () => {
      Orientation.removeOrientationListener((orientation: string) => {
        console.log('no longer watching orientation');
      });
    };
  }, []);

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

      let number = state.playableDuration - state.currentTime;

      dispatch({
        type: 'TIME_REMAINING_AS_STRING',
        payload: getMinutesFromSeconds(number),
      });
    }
    return;
  };

  const seekToLocation = () => {
    videoRef.current.seek(state.currentTime);
    dispatch({type: 'Paused', paylaod: false});
  };

  const restartTheLesson = () => {
    dispatch({type: 'Paused', paylaod: false});
    videoRef.current.seek(0);
    setHidePauseMenu(!hidePauseMenu);
  };

  const onEnd = () => {
    dispatch({type: 'USER_WATCH_TIME', payload: state.currentTime});
    dispatch({type: 'LESSON_COMPLETED', payload: true});
  };

  return (
    <View style={styles.wholePage}>
      <View style={styles.videoArea}>
        <Video
          source={{
            uri: `${contentUrl}`,
          }}
          onLoadStart={() => dispatch({type: 'LOADING', payload: true})}
          onLoad={handleOnLoad}
          // TODO END OF VIDEO FX
          onEnd={onEnd}
          // onBuffer={() => dispatch({type: 'BUFFERING', payload: true})}
          onError={() => console.log('error')}
          style={styles.videoPortrait}
          paused={state.paused}
          fullscreen={false}
          fullscreenOrientation={'portrait'}
          ref={(video) => (videoRef.current = video)}
          onProgress={onProgress}
          progressUpdateInterval={500}
          resizeMode={'cover'}
        />

        <VideoControls seekToLocation={seekToLocation} />
      </View>
      <TitleBannerUnderVideo />

      <View style={styles.componentArea}>
        <ScrollView horizontal={false}>{children}</ScrollView>
      </View>
      {state.paused && <PauseOptionCard restartTheLesson={restartTheLesson} />}
    </View>
  );
};

const styles = StyleSheet.create({
  wholePage: {
    maxHeight: height,
  },
  videoArea: {
    display: 'flex',
    flexDirection: 'column',
    width: width,
    justifyContent: 'flex-start',
  },
  componentArea: {
    minHeight: 400,
  },
  videoPortrait: {
    minHeight: 400,
  },
  videoWide: {
    position: 'absolute',
    height: height,
    width: width,
  },

  sliderParent: {
    padding: 30,
    paddingBottom: 0,
    position: 'absolute',
    bottom: 10,
    zIndex: 9,
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
  childContainer: {
    minHeight: 400,
  },
});
export default VideoPlayerPortraitWindow;
