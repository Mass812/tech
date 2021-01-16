export interface iComponentState {
    loading: boolean;
    paused: boolean;
    currentTime: number;
    userWatchTime: number;
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
    targets: string[];
    title: string;
    outfitTopName: string;
    outfitTopImgUrl: string;
    outfitBottomName: string;
    outfitBottomImgUrl: string;
    lessonCompleted: boolean;
  }
  export type Action =
    | {type: 'LOADING'; payload: boolean}
    | {type: 'PAUSED'; payload: boolean}
    | {type: 'CURRENT_TIME'; payload: number}
    | {type: 'USER_WATCH_TIME'; payload: number}
    | {type: 'PLAYABLE_DURATION'; payload: number}
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
    | {type: 'TARGETS'; payload: [string]}
    | {type: 'CLOTHING_TOP_NAME'; payload: string}
    | {type: 'CLOTHING_TOP_IMG'; payload: string}
    | {type: 'CLOTHING_BOTTOM_NAME'; payload: string}
    | {type: 'CLOTHING_BOTTOM_IMG'; payload: string}
    | {type: 'TITLE'; payload: string}
    | {type: 'LESSON_COMPLETED'; payload: boolean}
    | {type: 'RESET'};


     export interface iVideoPlayerProps {
        key: string;
        name: string;
        params: tIncomingParamsShape;
      }
      
      export type tIncomingParamsShape = {
        contentUrl: string;
        weekNumber: string;
        lessonNumber: string;
        courseName: string;
        instructor: string;
        title: string;
        length?: string;
        targets: [string];
        outfitTopName: string;
        outfitTopImgUrl: string;
        outfitBottomName: string;
        outfitBottomImgUrl: string;
      };
      