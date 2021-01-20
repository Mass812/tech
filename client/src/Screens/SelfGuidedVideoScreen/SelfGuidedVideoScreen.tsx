import React, {useEffect, useReducer} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {useRoute} from '@react-navigation/native';
import SgVideoPlayerPortraitWindow from './VideoComponents/SelfGuidedVideoPlayer';
import CourseOverview from '../../ReusableComponents/UiCards/CourseOverview';
import SelfGuidedUnderVideoComponent from '../SelfGuidedVideoScreen/VideoComponents/SelfGuidedUnderVideoComponent';
import {useQuery} from 'urql';
import LoadingScreen from '../SplashScreens/Loading';
import ErrorScreen from '../SplashScreens/ErrorScreen';
import {
  iComponentState,
  Action,
  SgVideoPlayerProps,
  Params,
} from '../../Interfaces/SelfGuidedVideoScreenInterfaces';
import getSelfGuidedWorkout from '../../Urql_Requests/Querys/GetSelfGuidedWorkout_SelfGuidedVideoScreen';
import {
  InitialState,
  sgVideoReducer,
  SgVideoStore,
} from '../../Context/SgVideoContext';

// const InitialState: iComponentState = {
//   loading: false,
//   error: '',
//   paused: false,
//   videoPlaying: '',
//   currentTime: 0,
//   userWatchTime: 0,
//   playableDuration: 0,
//   currentPlayerTimeAsString: '',
//   timeRemainingAsString: '',
//   buffering: false,
//   totalPlayerTimeAsString: '0',
//   screenOrientation: '',
//   renderedVideoTapped: false,
//   lockPortrait: false,
//   restart: false,
//   id: '',
//   length: '',
//   sectionNumber: 0,
//   targets: '',
//   title: '',
//   exerciseSections: [],
// };

// export const sgVideoReducer = (
//   state = InitialState,
//   action: Action,
// ): iComponentState => {
//   switch (action.type) {
//     case 'LOADING':
//       return {...state, loading: action.payload};
//     case 'ERROR':
//       return {...state, error: action.payload};
//     case 'PAUSED':
//       return {...state, paused: action.payload};
//     case 'VIDEO_PLAYING':
//       return {...state, videoPlaying: action.payload};
//     case 'SCREEN_ORIENTATION':
//       return {...state, screenOrientation: action.payload};
//     case 'CURRENT_TIME':
//       return {...state, currentTime: action.payload};
//     case 'PLAYABLE_DURATION':
//       return {...state, playableDuration: action.payload};
//     case 'USER_WATCH_TIME':
//       return {...state, userWatchTime: action.payload};
//     case 'CURRENT_PLAYER_TIME_AS_STRING':
//       return {...state, currentPlayerTimeAsString: action.payload};
//     case 'TOTAL_PLAYER_TIME_AS_STRING':
//       return {...state, totalPlayerTimeAsString: action.payload};
//     case 'TIME_REMAINING_AS_STRING':
//       return {...state, timeRemainingAsString: action.payload};
//     case 'BUFFERING':
//       return {...state, buffering: action.payload};
//     case 'LOCK_PORTRAIT':
//       return {...state, lockPortrait: action.payload};
//     case 'EXERCISE_SECTIONS':
//       return {...state, exerciseSections: action.payload};
//     case 'TITLE':
//       return {...state, title: action.payload};
//     case 'LENGTH':
//       return {...state, length: action.payload};
//     case 'ID':
//       return {...state, id: action.payload};
//     case 'SECTION_NUMBER':
//       return {...state, sectionNumber: action.payload};
//     case 'TARGETS':
//       return {...state, targets: action.payload};
//     case 'RESET':
//       return InitialState;
//     default:
//       return state;
//   }
// };

// export const SgVideoStore = React.createContext<iComponentState | any>(
//   InitialState,
// );

const SgVideoPlayer: React.FC<SgVideoPlayerProps> = () => {
  const [state, dispatch] = useReducer(sgVideoReducer, InitialState);
  const videoRedux = React.useMemo(() => ({state, dispatch}), [
    state,
    dispatch,
  ]);

  const route = useRoute<SgVideoPlayerProps>();
  let {id, title} = route.params;

  const [results] = useQuery({
    query: getSelfGuidedWorkout,
    variables: {id: id},
  });

  useEffect(() => {
    dispatch({type: 'TITLE', payload: title ?? ''});
    dispatch({type: 'ID', payload: id ?? ''});
  }, []);

  const {data, fetching, error} = results;

  if (fetching) return <LoadingScreen />;

  if (error) return <ErrorScreen error={error.message} />;

  return (
    <SgVideoStore.Provider value={videoRedux}>
      <SgVideoPlayerPortraitWindow>
        <SelfGuidedUnderVideoComponent
          data={data.selfGuided.exerciseSections}
        />
      </SgVideoPlayerPortraitWindow>
    </SgVideoStore.Provider>
  );
};

export default SgVideoPlayer;
