import React from 'react';
import {
  iComponentState,
  Action,
} from '../Interfaces/LessonVideoScreenInterface';

export const InitialState: iComponentState = {
  loading: false,
  paused: false,
  currentTime: 0,
  userWatchTime: 0,
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
  targets: [''],
  title: '',
  outfitTopName: '',
  outfitTopImgUrl: '',
  outfitBottomName: '',
  outfitBottomImgUrl: '',
  lessonCompleted: false,
};

export const videoReducer = (
  state = InitialState,
  action: Action,
): iComponentState => {
  switch (action.type) {
    case 'LOADING':
      return {...state, loading: action.payload};
    case 'PAUSED':
      return {...state, paused: action.payload};
    case 'SCREEN_ORIENTATION':
      return {...state, screenOrientation: action.payload};
    case 'CURRENT_TIME':
      return {...state, currentTime: action.payload};
    case 'USER_WATCH_TIME':
      return {...state, userWatchTime: action.payload};
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
    case 'CLOTHING_TOP_NAME':
      return {...state, outfitTopName: action.payload};
    case 'CLOTHING_TOP_IMG':
      return {...state, outfitTopImgUrl: action.payload};
    case 'CLOTHING_BOTTOM_NAME':
      return {...state, outfitBottomName: action.payload};
    case 'CLOTHING_BOTTOM_IMG':
      return {...state, outfitBottomImgUrl: action.payload};
    case 'LESSON_COMPLETED':
      return {...state, lessonCompleted: action.payload};
    case 'RESET':
      return InitialState;
    default:
      return state;
  }
};

export const VideoStore = React.createContext<iComponentState | any>(
  InitialState,
);
