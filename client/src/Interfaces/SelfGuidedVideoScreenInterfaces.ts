export interface iComponentState {
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
  export type Action =
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
  



export interface SgVideoPlayerProps {
    key: string;
    name: string;
    params: Params;
  }
  
 export type Params = {
    contentUrl: string;
    exerciseSections: string;
    id: string;
    length: string;
    title: string;
  };
  
 export interface iPlaybackShape {
    currentTime: number;
    playableDuration: number;
    seekableDuration: number;
    currentTimeRemaining?: number;
  }