import React, {useEffect, useReducer} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
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
  timeRemainingAsString: '',
  buffering: false,
  currentSlideTime: '0',
  totalPlayerTimeAsString: '0',
  screenOrientation: '',
  renderedVideoTapped: false,
  lockPortrait: false,
  restart: false,
  courseName: '',
  instructor: '',
  length: '',
  weekNumber: '',
  lessonNumber: '',
  targets: '',
  title: '',
};
interface iComponentState {
  loading: boolean;
  paused: boolean;
  showOptions: boolean;
  currentTime: number;
  playableDuration: number;
  seekableDuration: number;
  currentPlayerTimeAsString: string;
  totalPlayerTimeAsString: string;
  timeRemainingAsString: string;
  buffering: boolean;
  currentSlideTime: string;
  screenOrientation: string;
  renderedVideoTapped: boolean;
  lockPortrait: boolean;
  restart: boolean;
  courseName: string;
  instructor: string;
  length: string;
  weekNumber: string;
  lessonNumber: string;
  targets: string;
  title: string;
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
  | {type: 'TIME_REMAINING_AS_STRING'; payload: string}
  | {type: 'BUFFERING'; payload: boolean}
  | {type: 'CURRENT_SLIDE_TIME'; payload: string}
  | {type: 'SCREEN_ORIENTATION'; payload: string}
  | {type: 'RENDERED_VIDEO_TAPPED'; payload: boolean}
  | {type: 'LOCK_PORTRAIT'; payload: boolean}
  | {type: 'RESTART'; payload: boolean}
  | {type: 'COURSE_NAME'; payload: string}
  | {type: 'INSTRUCTOR'; payload: string}
  | {type: 'LENGTH'; payload: string}
  | {type: 'WEEK_NUMBER'; payload: string}
  | {type: 'LESSON_NUMBER'; payload: string}
  | {type: 'TARGETS'; payload: string}
  | {type: 'TITLE'; payload: string}
  | {type: 'RESET'};

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
    case 'TIME_REMAINING_AS_STRING':
      return {...state, timeRemainingAsString: action.payload};
    case 'RENDERED_VIDEO_TAPPED':
      return {...state, renderedVideoTapped: action.payload};
    case 'BUFFERING':
      return {...state, buffering: action.payload};
    case 'LOCK_PORTRAIT':
      return {...state, lockPortrait: action.payload};
    case 'COURSE_NAME':
      return {...state, courseName: action.payload};
    case 'INSTRUCTOR':
      return {...state, instructor: action.payload};
    case 'TITLE':
      return {...state, title: action.payload};
    case 'LENGTH':
      return {...state, length: action.payload};
    case 'WEEK_NUMBER':
      return {...state, weekNumber: action.payload};
    case 'LESSON_NUMBER':
      return {...state, lessonNumber: action.payload};
    case 'TARGETS':
      return {...state, targets: action.payload};
    case 'RESET':
      return InitialState;
    default:
      return state;
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
  currentTimeRemaining?: number;
}

export const LessonScreenStore = React.createContext<iComponentState | any>(
  InitialState,
);

const LessonScreen: React.FC<LessonScreenProps> = () => {
  const [state, dispatch] = useReducer(videoReducer, InitialState);
  const videoRedux = React.useMemo(() => ({state, dispatch}), [
    state,
    dispatch,
  ]);

  const route = useRoute<LessonScreenProps>();
  let {
    title,
    contentUrl,
    instructor,
    weekNumber,
    lessonNumber,
    length,
    courseName,
  } = route.params;

  useEffect(() => {
    dispatch({type: 'COURSE_NAME', payload: courseName ?? ''});
    dispatch({type: 'TITLE', payload: title ?? ''});
    dispatch({type: 'INSTRUCTOR', payload: instructor ?? ''});
    dispatch({type: 'WEEK_NUMBER', payload: weekNumber ?? ''});
    dispatch({type: 'LESSON_NUMBER', payload: lessonNumber ?? ''});
    dispatch({type: 'LENGTH', payload: length ?? ''});
  }, []);
  // console.log(route.params);

  return (
    <LessonScreenStore.Provider value={videoRedux}>
      <VideoPlayerPortraitWindow contentUrl={contentUrl} />
      <View style={styles.container}>
        {/* <View style={styles.videoParentPortrait}> */}
        {/* </View> */}
        {/* <TitleBannerUnderVideo />
        <ScrollView>
          <View style={styles.playingNextParent}>
            <PlayingNext />
          </View>
        </ScrollView>
        {state.paused ? <PauseOptionCard /> : null} */}
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
