import {VideoStore} from '../../../Context/LessonVideoContext';
import {AuthContext} from '../../../Context/AuthContext';
import Video from 'react-native-video';
import React, {useContext, useRef, useState} from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import VideoControls from './LessonVideoIconsOverlay';
import PauseOptionCard from './PauseOptionCard';
import TitleBannerUnderVideo from './LessonTitleBannerUnderVideo';
import {ScrollView} from 'react-native-gesture-handler';
import {useMutation} from 'urql';
import progressTime from '../../../Urql_Requests/Mutations/UpdateProgressValue';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

interface VideoPlayerPortraitWindowProps {
  contentUrl: string;
}
interface iPlaybackShape {
  currentTime: number;
  playableDuration: number;
  seekableDuration: number;
}

const VideoPlayerPortraitWindow: React.FC<VideoPlayerPortraitWindowProps> = ({
  contentUrl,
  children,
}) => {
  let {state: videoState, dispatch: videoDispatch} = useContext(VideoStore);
  let {state: authState, dispatch: authDispatch} = useContext(AuthContext);
  const [hidePauseMenu, setHidePauseMenu] = useState(videoState.paused);
  let videoRef = useRef<HTMLElement | any>(null);
  const [data, addTimeToProgress] = useMutation(progressTime);

  const handleOnLoad = () => {
    videoDispatch({type: 'LOADING', payload: false});
    videoDispatch({type: 'BUFFERING', payload: false});
  };

  const getMinutesFromSeconds = (time: number) => {
    const minutes = time >= 60 ? Math.floor(time / 60) : 0;
    const seconds = Math.floor(time - minutes * 60);
    return `${minutes >= 10 ? minutes : '0' + minutes}:${
      seconds >= 10 ? seconds : '0' + seconds
    }`;
  };

  const onProgress = (data: iPlaybackShape) => {
    if (!videoState.loading && !videoState.paused) {
      videoDispatch({
        type: 'CURRENT_TIME',
        payload: data.currentTime,
      });
      videoDispatch({
        type: 'PLAYABLE_DURATION',
        payload: data.seekableDuration,
      });
      videoDispatch({
        type: 'TOTAL_PLAYER_TIME_AS_STRING',
        payload: getMinutesFromSeconds(videoState.playableDuration),
      });
      videoDispatch({
        type: 'CURRENT_PLAYER_TIME_AS_STRING',
        payload: getMinutesFromSeconds(videoState.currentTime),
      });

      let number = videoState.playableDuration - videoState.currentTime;

      videoDispatch({
        type: 'TIME_REMAINING_AS_STRING',
        payload: getMinutesFromSeconds(number),
      });
    }
  };

  const seekToLocation = () => {
    videoRef.current.seek(videoState.currentTime);
    videoDispatch({type: 'Paused', paylaod: false});
  };

  const restartTheLesson = () => {
    videoRef.current.seek(0);
    setHidePauseMenu(!hidePauseMenu);
  };

  const onEnd = async () => {
    videoDispatch({type: 'LOADING', payload: true});
    let userWatchTime = videoState.currentTime * 1000;

    videoDispatch({type: 'USER_WATCH_TIME', payload: userWatchTime});

    let addLessonCompletedCountTOUserDoc = await addTimeToProgress({
      email: authState.email,
      attr: 'lessonsCompleted',
      value: 1,
    }).catch((err) => console.log(err));

    let addUserWatchTimeToUserDoc = await addTimeToProgress({
      email: authState.email,
      attr: 'userWatchTime',
      value: videoState.playableDuration * 1000,
    }).catch((err) => console.log(err));

    try {
      return [addLessonCompletedCountTOUserDoc, addUserWatchTimeToUserDoc];
    } catch (err) {
      console.log(err);
    } finally {
      videoDispatch({type: 'LOADING', payload: false});
      videoDispatch({type: 'LESSON_COMPLETED', payload: true});
    }
  };

  return (
    <View style={styles.wholePage}>
      <View style={styles.videoArea}>
        <Video
          source={{
            uri: `${contentUrl}`,
          }}
          onLoadStart={() => videoDispatch({type: 'LOADING', payload: true})}
          onLoad={handleOnLoad}
          // TODO END OF VIDEO FX
          onEnd={onEnd}
          // onBuffer={() => dispatch({type: 'BUFFERING', payload: true})}
          onError={() => console.log('error')}
          style={styles.videoPortrait}
          paused={videoState.paused}
          fullscreen={false}
          fullscreenOrientation={'portrait'}
          ref={(video) => (videoRef.current = video)}
          onProgress={onProgress}
          progressUpdateInterval={500}
          resizeMode={'cover'}
        />

        <VideoControls seekToLocation={seekToLocation} />
      </View>
      <TitleBannerUnderVideo />
      <View style={styles.componentArea}>
        <ScrollView horizontal={false}>{children}</ScrollView>
      </View>
      {videoState.paused && (
        <PauseOptionCard restartTheLesson={restartTheLesson} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wholePage: {
    maxHeight: height,
  },
  videoArea: {
    display: 'flex',
    flexDirection: 'column',
    width: width,
    justifyContent: 'flex-start',
  },
  componentArea: {
    minHeight: 400,
  },
  videoPortrait: {
    minHeight: 400,
  },
  videoWide: {
    position: 'absolute',
    height: height,
    width: width,
  },

  sliderParent: {
    padding: 30,
    paddingBottom: 0,
    position: 'absolute',
    bottom: 10,
    zIndex: 9,
    width: width - 20,
  },
  timerParent: {
    position: 'absolute',
    left: 30,
    bottom: 25,
  },
  timer: {
    position: 'absolute',
    bottom: 20,
    zIndex: 2,
    width: width - 20,
    color: 'white',
  },
  childContainer: {
    minHeight: 400,
  },
});
export default VideoPlayerPortraitWindow;
