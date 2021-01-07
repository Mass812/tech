import React, {useEffect, useRef, useReducer} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import Video, {
  OnSeekData,
  OnLoadData,
  OnProgressData,
} from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import TitleBannerUnderVideo from '../Components/VideoComponents/TitleBannerUnderVideo';
import VideoControls from '../Components/VideoComponents/VideoControls';
import Slider from '@react-native-community/slider';
import PlayingNext from '../Components/VideoComponents/PlayingNext';

let width = Dimensions.get('screen').width;
let height = Dimensions.get('window').height;

const InitialState: iComponentState = {
  loading: false,
  paused: false,
  showOptions: false,
  currentTime: 0,
  playableDuration: 0,
  seekableDuration: 0,
  currentPlayerTimeAsString: '',
  buffering: false,
  currentSlideTime: '0',
  totalPlayerTimeAsString: '0',
  screenOrientation: '',
  renderedVideoTapped: false,
};
interface iComponentState {
  loading: boolean;
  paused: boolean;
  showOptions: boolean;
  currentTime: number;
  playableDuration: number;
  seekableDuration: number;
  currentPlayerTimeAsString: string;
  buffering: boolean;
  currentSlideTime: string;
  totalPlayerTimeAsString: string;
  screenOrientation: string;
  renderedVideoTapped: boolean;
}
type Action =
  | {type: 'LOADING'; payload: boolean}
  | {type: 'PAUSED'; payload: boolean}
  | {type: 'CURRENT_TIME'; payload: number}
  | {type: 'PLAYABLE_DURATION'; payload: number}
  | {type: 'SHOW_OPTIONS'; payload: boolean}
  | {type: 'SEEKABLE_DURATION'; payload: number}
  | {type: 'CURRENT_PLAYER_TIME_AS_STRING'; payload: string}
  | {type: 'TOTAL_PLAYER_TIME_AS_STRING'; payload: string}
  | {type: 'BUFFERING'; payload: boolean}
  | {type: 'CURRENT_SLIDE_TIME'; payload: string}
  | {type: 'SCREEN_ORIENTATION'; payload: string}
  | {type: 'RENDERED_VIDEO_TAPPED'; payload: boolean};

export const videoReducer = (
  state = InitialState,
  action: Action,
): iComponentState => {
  switch (action.type) {
    case 'LOADING':
      return {...state, loading: action.payload};
    case 'PAUSED':
      return {...state, paused: action.payload};
    case 'SHOW_OPTIONS':
      return {...state, showOptions: action.payload};
    case 'SCREEN_ORIENTATION':
      return {...state, screenOrientation: action.payload};
    case 'CURRENT_TIME':
      return {...state, currentTime: action.payload};
    case 'CURRENT_SLIDE_TIME':
      return {...state, currentSlideTime: action.payload};
    case 'PLAYABLE_DURATION':
      return {...state, playableDuration: action.payload};
    case 'SEEKABLE_DURATION':
      return {...state, seekableDuration: action.payload};
    case 'CURRENT_PLAYER_TIME_AS_STRING':
      return {...state, currentPlayerTimeAsString: action.payload};
    case 'TOTAL_PLAYER_TIME_AS_STRING':
      return {...state, totalPlayerTimeAsString: action.payload};
    case 'RENDERED_VIDEO_TAPPED':
      return {...state, renderedVideoTapped: action.payload};
    case 'BUFFERING':
      return {...state, buffering: action.payload};
    default:
      throw new Error('No action recognized ');
  }
};
interface iSeek {
  currentTime: number;
  seekTime: number;
}
interface LessonPlayerProps {
  key: string;
  name: string;
  params: Params;
}

type Params = {
  contentUrl: string;
  weekNumber: string;
  lessonNumber: string;
  courseName: string;
  instructor: string;
  title: string;
  length?: string;
};
interface iPlaybackShape {
  currentTime: number;
  playableDuration: number;
  seekableDuration: number;
}

const LessonPlayer: React.FC<LessonPlayerProps> = () => {
  let [
    {
      loading,
      paused,
      showOptions,
      currentTime,
      playableDuration,
      seekableDuration,
      buffering,
      currentPlayerTimeAsString,
      currentSlideTime,
      totalPlayerTimeAsString,
      screenOrientation,
      renderedVideoTapped,
    },
    dispatch,
  ] = useReducer(videoReducer, InitialState);

  const handleOrientation = () => {
    var initial = Orientation.getInitialOrientation();
    if (initial == 'PORTRAIT') {
      console.log('portrait mode orientation');
    } else {
      //TODO POP LANDSCAPE SCREEN ON
      return;
    }
  };

  useEffect(() => {
    Orientation.addOrientationListener((orientation: string) => {
      console.log(orientation);
    });
    return () => {
      Orientation.removeOrientationListener((orientation: string) => {
        console.log('no longer watching orientation');
      });
    };
  }, []);

  const nav = useNavigation();
  let videoRef = useRef<HTMLElement | null>(null);
  const route = useRoute<LessonPlayerProps>();
  let {
    title,
    contentUrl,
    instructor,
    weekNumber,
    lessonNumber,
    length,
  } = route.params;

  const handleOnLoad = () => {
    dispatch({type: 'LOADING', payload: false});
    return;
  };

  const handlePause = () => {
    let p = !paused;
    dispatch({type: 'PAUSED', payload: p});
    dispatch({type: 'SHOW_OPTIONS', payload: p});
    return;
  };

  const getMinutesFromSeconds = (time: number) => {
    const minutes = time >= 60 ? Math.floor(time / 60) : 0;
    const seconds = Math.floor(time - minutes * 60);
    return `${minutes >= 10 ? minutes : '0' + minutes}:${
      seconds >= 10 ? seconds : '0' + seconds
    }`;
  };

  const onSlideStart = () => {};
  const onSlideEnd = () => {};
  const handleOnSlide = (payload: iSeek) => {};

  const onProgress = (data: iPlaybackShape) => {
    //only way is metadata or db doc params
    if (!loading && !paused) {
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
        payload: getMinutesFromSeconds(playableDuration),
      });
      dispatch({
        type: 'CURRENT_PLAYER_TIME_AS_STRING',
        payload: getMinutesFromSeconds(currentTime),
      });
    }
  };

  const handleRenderedVideoTapped = () => {
    let videoScreenTapped = !renderedVideoTapped;
    dispatch({
      type: 'RENDERED_VIDEO_TAPPED',
      payload: videoScreenTapped,
    });
  };

  const handleClose = () => {
    nav.goBack();
  };

  const hamdleExpand = () => {
    // side view screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.videoParentPortrait}>
        <Video
          source={{
            uri: contentUrl,
          }}
          onLoadStart={() => dispatch({type: 'LOADING', payload: true})}
          onLoad={handleOnLoad}
          onEnd={() => nav.goBack()}
          //  onBuffer={() => dispatch({type: 'BUFFERING', payload: true})} // Callback when remote video is buffering
          onError={() => console.log('error')} // Callback when video cannot be loaded
          style={styles.videoPortrait}
          paused={paused}
          fullscreen={false}
          fullscreenOrientation={'portrait'}
          ref={(video) => (videoRef.current = video)}
          onProgress={(currentTime: any) => onProgress(currentTime)}
          progressUpdateInterval={250}
          resizeMode={'cover'}
          bufferConfig={{
            minBufferMs: 30000,
            maxBufferMs: 50000,
            bufferForPlaybackMs: 3500,
            bufferForPlaybackAfterRebufferMs: 5000,
          }}
        />

        <View style={styles.sliderParent}>
          <Slider
            value={currentTime}
            minimumValue={0}
            maximumValue={playableDuration}
            step={1}
            // onValueChange={(sliderInfo) =>
            //   dispatch({type: 'CURRENT_PLAYER_TIME_AS_STRING', payload: sliderInfo})
            // }
            // onSlidingStart={onSlideStart}
            // onSlidingComplete={onSlideEnd}
            minimumTrackTintColor={'#689493'}
            maximumTrackTintColor={'#FFFFFF'}
            // thumbTintColor={'rgba(28, 158, 155, 0.4)'}
          />
        </View>
        <View style={styles.timerParent}>
          <Text style={styles.timer}>
            {currentPlayerTimeAsString} / {totalPlayerTimeAsString}
          </Text>
        </View>

        <VideoControls
          onPressClose={handleClose}
          onPressPause={handlePause}
          onPressFullScreen={() => 'push on new full screen modal'}
          onPressOutOfFocus={handleRenderedVideoTapped}
          videoScreenTapped={renderedVideoTapped}
        />
      </View>
      <TitleBannerUnderVideo
        width={width}
        title={title}
        length={'length'}
        playAction={handlePause}
      />

      <ScrollView>
        <View style={styles.playingNextParent}>
          <PlayingNext />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},

  videoParentPortrait: {
    display: 'flex',
    flexDirection: 'column',
    width: width,
    justifyContent: 'flex-start',
  },
  videoPortrait: {
    minHeight: 400,
  },
  title: {
    fontSize: 20,
    color: 'green',
  },
  playingNextParent: {
    display: 'flex',
    height: height - 400,
  },
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
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
});
export default LessonPlayer;
