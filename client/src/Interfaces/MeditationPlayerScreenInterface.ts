
export interface MeditationPlayerProps {
    key: string;
    name: string;
    params: Params;
  }
  
  type Params = {
    contentImg: string;
    contentUrl: string;
    length: number;
    instructor: string;
    description: string;
    title: string;
  };
  export interface iPlaybackShape {
    currentTime: number;
    playableDuration: number;
    seekableDuration: number;
  }

  export interface MediaPlayerComponentProps {
    instructor: string;
    title: string;
    length: string;
    description: string;
    pause: boolean;
    onPressArrowBack: () => void;
    onPressPause: () => void;
    contentImg: string;
  }