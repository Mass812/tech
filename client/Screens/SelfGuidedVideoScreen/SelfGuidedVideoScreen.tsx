import React, {useEffect, useReducer} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {useRoute} from '@react-navigation/native';
import SgVideoPlayerPortraitWindow from './VideoComponents/SelfGuidedVideoPlayer';
import CourseOverview from '../../ReusableComponents/UiCards/CourseOverview';
import SelfGuidedUnderVideoComponent from '../SelfGuidedVideoScreen/VideoComponents/SelfGuidedUnderVideoComponent';
import {useQuery} from 'urql';
import LoadingScreen from '../SplashScreens/Loading';
import ErrorScreen from '../SplashScreens/ErrorScreen';

let width = Dimensions.get('screen').width;
let height = Dimensions.get('window').height;

const InitialState: iComponentState = {
  loading: false,
  error: '',
  paused: false,
  videoPlaying: '',
  currentTime: 0,
  userWatchTime: 0,
  playableDuration: 0,
  currentPlayerTimeAsString: '',
  timeRemainingAsString: '',
  buffering: false,
  totalPlayerTimeAsString: '0',
  screenOrientation: '',
  renderedVideoTapped: false,
  lockPortrait: false,
  restart: false,
  id: '',
  length: '',
  sectionNumber: 0,
  targets: '',
  title: '',
  exerciseSections: [],
};
interface iComponentState {
  loading: boolean;
  error: string;
  paused: boolean;
  videoPlaying: string;
  currentTime: number;
  userWatchTime: number;
  playableDuration: number;
  currentPlayerTimeAsString: string;
  totalPlayerTimeAsString: string;
  timeRemainingAsString: string;
  buffering: boolean;
  screenOrientation: string;
  renderedVideoTapped: boolean;
  lockPortrait: boolean;
  restart: boolean;
  id: string;
  length: string;
  exerciseSections: string[];
  sectionNumber: number;
  targets: string;
  title: string;
}
type Action =
  | {type: 'LOADING'; payload: boolean}
  | {type: 'ERROR'; payload: string}
  | {type: 'PAUSED'; payload: boolean}
  | {type: 'VIDEO_PLAYING'; payload: string}
  | {type: 'CURRENT_TIME'; payload: number}
  | {type: 'USER_WATCH_TIME'; payload: number}
  | {type: 'PLAYABLE_DURATION'; payload: number}
  | {type: 'CURRENT_PLAYER_TIME_AS_STRING'; payload: string}
  | {type: 'TOTAL_PLAYER_TIME_AS_STRING'; payload: string}
  | {type: 'TIME_REMAINING_AS_STRING'; payload: string}
  | {type: 'BUFFERING'; payload: boolean}
  | {type: 'SCREEN_ORIENTATION'; payload: string}
  | {type: 'LOCK_PORTRAIT'; payload: boolean}
  | {type: 'RESTART'; payload: boolean}
  | {type: 'COURSE_NAME'; payload: string}
  | {type: 'ID'; payload: string}
  | {type: 'LENGTH'; payload: string}
  | {type: 'TITLE'; payload: string}
  | {type: 'SECTION_NUMBER'; payload: number}
  | {type: 'EXERCISE_SECTIONS'; payload: string[]}
  | {type: 'TARGETS'; payload: string}
  | {type: 'RESET'};

export const sgVideoReducer = (
  state = InitialState,
  action: Action,
): iComponentState => {
  switch (action.type) {
    case 'LOADING':
      return {...state, loading: action.payload};
    case 'ERROR':
      return {...state, error: action.payload};
    case 'PAUSED':
      return {...state, paused: action.payload};
    case 'VIDEO_PLAYING':
      return {...state, videoPlaying: action.payload};
    case 'SCREEN_ORIENTATION':
      return {...state, screenOrientation: action.payload};
    case 'CURRENT_TIME':
      return {...state, currentTime: action.payload};
    case 'PLAYABLE_DURATION':
      return {...state, playableDuration: action.payload};
    case 'USER_WATCH_TIME':
      return {...state, userWatchTime: action.payload};
    case 'CURRENT_PLAYER_TIME_AS_STRING':
      return {...state, currentPlayerTimeAsString: action.payload};
    case 'TOTAL_PLAYER_TIME_AS_STRING':
      return {...state, totalPlayerTimeAsString: action.payload};
    case 'TIME_REMAINING_AS_STRING':
      return {...state, timeRemainingAsString: action.payload};
    case 'BUFFERING':
      return {...state, buffering: action.payload};
    case 'LOCK_PORTRAIT':
      return {...state, lockPortrait: action.payload};
    case 'EXERCISE_SECTIONS':
      return {...state, exerciseSections: action.payload};
    case 'TITLE':
      return {...state, title: action.payload};
    case 'LENGTH':
      return {...state, length: action.payload};
    case 'ID':
      return {...state, id: action.payload};
    case 'SECTION_NUMBER':
      return {...state, sectionNumber: action.payload};
    case 'TARGETS':
      return {...state, targets: action.payload};
    case 'RESET':
      return InitialState;
    default:
      return state;
  }
};

interface SgVideoPlayerProps {
  key: string;
  name: string;
  params: Params;
}

type Params = {
  contentUrl: string;
  exerciseSections: string;
  id: string;
  length: string;
  title: string;
};

interface iPlaybackShape {
  currentTime: number;
  playableDuration: number;
  seekableDuration: number;
  currentTimeRemaining?: number;
}

export const SgVideoStore = React.createContext<iComponentState | any>(
  InitialState,
);

const getSelfGuidedWorkout = `
  query($id: String!){
    selfGuided(id: $id){
      title
      length
      exerciseSections{
        title
        length
        sectionNumber
        contentUrl
        id

      }
    }
    }


`;

const SgVideoPlayer: React.FC<SgVideoPlayerProps> = () => {
  const [state, dispatch] = useReducer(sgVideoReducer, InitialState);
  const videoRedux = React.useMemo(() => ({state, dispatch}), [
    state,
    dispatch,
  ]);

  const route = useRoute<SgVideoPlayerProps>();
  let {contentUrl, id, title} = route.params;
  console.log('params in screenPlayer: ', id);

  const [results, reexecuteQuery] = useQuery({
    query: getSelfGuidedWorkout,
    variables: {id: id},
  });

  useEffect(() => {
    dispatch({type: 'TITLE', payload: title ?? ''});
    // dispatch({type: 'LENGTH', payload: length ?? ''});
    // dispatch({type: 'EXERCISE_SECTIONS', payload: exerciseSections ?? ''});
    dispatch({type: 'ID', payload: id ?? ''});
  }, []);

  // TODO condition of params of class type, selfGuided: true or false
  // return LessonUnderVideoContext or SelfGuidedUnderVideoComponent as props here

  const {data, fetching, error} = results;

  if (fetching) return <LoadingScreen />;

  if (error) return <ErrorScreen error={error.message} />;

  return (
    <SgVideoStore.Provider value={videoRedux}>
      <SgVideoPlayerPortraitWindow contentUrl={contentUrl}>
        <SelfGuidedUnderVideoComponent
          data={data.selfGuided.exerciseSections}
        />

        {/* <CourseOverview
              courseName={state.courseName}
              instructor={'Matt Wellman'}
              length={'23 minutes'}
              equipment={['Rug', 'flying carpet']}
              targets={'upper body'}
              category={'Jump Rope'}
              img={
                'data:image/jpeg;base64,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'
              }
              description={'Awesomeness'}
            /> */}
      </SgVideoPlayerPortraitWindow>
    </SgVideoStore.Provider>
  );
};

export default SgVideoPlayer;
