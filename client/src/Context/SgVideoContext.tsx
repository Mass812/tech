import React from 'react';
import {
  iComponentState,
  Action,
} from '../Interfaces/SelfGuidedVideoScreenInterfaces';

export const InitialState: iComponentState = {
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

export const SgVideoStore = React.createContext<iComponentState | any>(
  InitialState,
);
