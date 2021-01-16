import {SgVideoStore} from '../SelfGuidedVideoScreen';
import Video from 'react-native-video';
import React, {useContext, useRef, useEffect, useState} from 'react';
import {StyleSheet, Dimensions, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Orientation from 'react-native-orientation-locker';
import VideoControls from './SelfGuidedVideoIconOverlay';
import PauseOptionCard from './PauseOptionCard';
import TitleBannerUnderVideo from './SelfGuidedTitleBannerUnderVideo';
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
  let {state, dispatch} = useContext(SgVideoStore);
  const [hidePauseMenu, setHidePauseMenu] = useState(state.paused);
  let videoRef = useRef<HTMLElement | any>(null);

  const nav = useNavigation();

  const handleOrientation = (orientation: string) => {
    var initial = Orientation.getInitialOrientation();

    initial == 'LANDSCAPE-RIGHT' || 'LANDSCAPE-LEFT'
      ? dispatch({type: 'LOCK_PORTRAIT', payload: false})
      : dispatch({type: 'LOCK_PORTRAIT', payload: true});
  };

  useEffect(() => {
    Orientation.addOrientationListener((orientation: string) => {
      handleOrientation(orientation);
    });
    return () => {
      Orientation.removeOrientationListener((orientation: string) => {
        console.log('no longer watching orientation');
      });
    };
  }, []);

  const onEnd = () => {
    let cumulativeTime = state.userWatchTime + state.currentTime;

    if (state.sectionNumber + 1 === state.exerciseSections.length) {
      dispatch({type: 'USER_WATCH_TIME', payload: cumulativeTime});
      nav.navigate('Home');
    } else {
      dispatch({type: 'USER_WATCH_TIME', payload: cumulativeTime});
      let next = state.sectionNumber + 1;

      dispatch({
        type: 'VIDEO_PLAYING',
        payload: state.exerciseSections[next],
      });
      dispatch({
        type: 'SECTION_NUMBER',
        payload: next,
      });
    }
  };
  console.log('userWatchTime: ', state.currentTime, state.userWatchTime);
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
  };

  const restartTheLesson = () => {
    dispatch({type: 'Paused', paylaod: false});
    videoRef.current.seek(0);
    setHidePauseMenu(!hidePauseMenu);
  };

  let displayThisVideo = (
    <Video
      source={{
        uri: state.videoPlaying,
      }}
      onLoadStart={() => dispatch({type: 'LOADING', payload: true})}
      onLoad={handleOnLoad}
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
  );

  return (
    <View style={styles.wholePage}>
      <View style={styles.videoArea}>
        {displayThisVideo}
        <VideoControls />
      </View>
      <TitleBannerUnderVideo />
      <View style={styles.componentArea}>{children}</View>
      {state.paused && <PauseOptionCard restartTheLeeson={restartTheLesson} />}
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
    height: '100%',
    minHeight: 400,
    width: width,
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
