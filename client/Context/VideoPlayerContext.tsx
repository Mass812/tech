import React, {createContext, useContext, useReducer, useMemo} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import LessonPlayer from '../Screens/LessonPlayer';
import LoadingScreen from '../Screens/Loading';

const InitialState: VideoPlayerContextProps = {
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

interface VideoPlayerContextProps {
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
type value = VideoPlayerContextProps | React.DispatchWithoutAction;
//   videoRedux: ()=> void
//   value: value

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

function videoReducer(
  state = InitialState,
  action: Action,
): VideoPlayerContextProps {
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
      return InitialState;
  }
}

export const VideoStore = createContext<VideoPlayerContextProps | any>(
  InitialState,
);

export const VideoPlayerProvider = (children: any): JSX.Element => {
  const [state, dispatch] = useReducer(videoReducer, InitialState);
  // const videoRedux = useMemo(() => ({state, dispatch}), [state, dispatch]);

  return (
    <VideoStore.Provider value={{state, dispatch}}>
      <VideoStore.Consumer>{children}</VideoStore.Consumer>
    </VideoStore.Provider>
  );
};
