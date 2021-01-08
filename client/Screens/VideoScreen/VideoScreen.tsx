import React, {useEffect, useReducer} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import Orientation from 'react-native-orientation-locker';
import TitleBannerUnderVideo from './VideoComponents/TitleBannerUnderVideo';
import VideoControls from './VideoComponents/VideoControls';
import PlayingNext from './UnderVideoDetailComponents/IndependentWorkout/PlayingNext';
import VideoPlayerPortraitWindow from './VideoComponents/VIdeoPlayerPortraitWindow';
import PauseOptionCard from './VideoComponents/PauseOptionCard';

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
interface LessonScreenProps {
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

export const LessonScreenStore = React.createContext<LessonScreenProps | any>(
  InitialState,
);

const LessonScreen: React.FC<LessonScreenProps> = () => {
  const [state, dispatch] = useReducer(videoReducer, InitialState);
  const videoRedux = React.useMemo(() => ({state, dispatch}), [
    state,
    dispatch,
  ]);

  const handleOrientation = (orientation: string) => {
    var initial = Orientation.getInitialOrientation();
    if (initial == 'LANDSCAPE-RIGHT' || 'LANDSCAPE-LEFT') {
      console.log('screen mode landscape');

      return;
    } else {
      //TODO POP LANDSCAPE SCREEN ON
      console.log('screen mode portrait');
      return;
    }
  };

  useEffect(() => {
    Orientation.addOrientationListener((orientation: string) => {
      // console.log(orientation);
      handleOrientation(orientation);
    });
    return () => {
      Orientation.removeOrientationListener((orientation: string) => {
        console.log('no longer watching orientation');
      });
    };
  }, []);

  const route = useRoute<LessonScreenProps>();
  let {
    title,
    contentUrl,
    instructor,
    weekNumber,
    lessonNumber,
    length,
  } = route.params;

  return (
    <LessonScreenStore.Provider value={videoRedux}>
      <View style={styles.container}>
        <View style={styles.videoParentPortrait}>
          <VideoPlayerPortraitWindow contentUrl={contentUrl} />

          <VideoControls />
        </View>

        {/*         Get API Key Spotify and Connect */}
        <TitleBannerUnderVideo
          width={width}
          title={title}
          length={'length'}
          playAction={() => console.log('okay')}
        />

        <ScrollView>
          <View style={styles.playingNextParent}>
            <PlayingNext />
          </View>
        </ScrollView>
        {state.paused ? <PauseOptionCard /> : null}
      </View>
    </LessonScreenStore.Provider>
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
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
});
export default LessonScreen;
