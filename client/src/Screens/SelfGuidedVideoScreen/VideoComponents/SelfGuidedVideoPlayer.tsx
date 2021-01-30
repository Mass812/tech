import {AuthContext} from '../../../Context/AuthContext';
import {SgVideoStore} from '../../../Context/SgVideoContext';
import Video from 'react-native-video';
import React, {useContext, useRef, useState} from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import {useMutation} from 'urql';
import UpdateUserDocAttribute from '../../../Urql_Requests/Mutations/UpdateUserDocAttribute';
import UpdateSelfGuidedPopularity from '../../../Urql_Requests/Mutations/UpdateSelfGuidedPopularity';
import {useNavigation} from '@react-navigation/native';
import VideoControls from './SelfGuidedVideoIconOverlay';
import PauseOptionCard from './PauseOptionCard';
import TitleBannerUnderVideo from './SelfGuidedTitleBannerUnderVideo';
import {ScrollView} from 'react-native-gesture-handler';
import {iPlaybackShape} from '../../../Interfaces/SelfGuidedVideoScreenInterfaces';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
interface VideoPlayerPortraitWindowProps {
  // contentUrl: string;
}

const VideoPlayerPortraitWindow: React.FC<VideoPlayerPortraitWindowProps> = ({
  children,
}) => {
  let {state: sgState, dispatch: sgDispatch} = useContext(SgVideoStore);
  let {state: authState, dispatch: authDispatch} = useContext(AuthContext);
  const [hidePauseMenu, setHidePauseMenu] = useState(sgState.paused);
  let [data, updateUserDocAttribute] = useMutation(UpdateUserDocAttribute);
  let [sgPopData, updateSelfGuidedPopularity] = useMutation(
    UpdateSelfGuidedPopularity,
  );
  let videoRef = useRef<HTMLElement | any>(null);

  const nav = useNavigation();

  const onLoadStart = () => {
    // if (sgState.exerciseSections.length < 1) {
    //   sgDispatch({
    //     type: 'VIDEO_PLAYING',
    //     payload: sgState.exerciseSections[0],
    //   });
    // }
  };

  const onEnd = async () => {
    let cumulativeTime = sgState.userWatchTime + sgState.currentTime;

    if (sgState.sectionNumber + 1 === sgState.exerciseSections.length) {
      sgDispatch({type: 'USER_WATCH_TIME', payload: cumulativeTime});
      sgDispatch({type: 'LOADING', payload: true});
      let cumulativeInMs = Math.floor(cumulativeTime) * 1000;

      try {
        updateSelfGuidedPopularity({
          id: sgState.id,
        });
        let addUserWatchTimeToUserDoc = await updateUserDocAttribute({
          email: authState.email,
          attr: 'userWatchTime',
          value: cumulativeInMs,
        }).catch((err) => console.log(err));

        let addLessonCompletedCountTOUserDoc = await updateUserDocAttribute({
          email: authState.email,
          attr: 'selfGuidedCompleted',
          value: 1,
        }).catch((err) => console.log(err));

        return [addUserWatchTimeToUserDoc, addLessonCompletedCountTOUserDoc];
      } catch (err) {
        console.log(err);
        nav.navigate('Home');
      } finally {
        sgDispatch({type: 'LOADING', payload: false});
        nav.navigate('Home');
        // sgDispatch({type: 'LESSON_COMPLETED', payload: true});
      }
      // end of condition
    } else {
      sgDispatch({type: 'USER_WATCH_TIME', payload: cumulativeTime});
      let next = sgState.sectionNumber + 1;

      sgDispatch({
        type: 'VIDEO_PLAYING',
        payload: sgState.exerciseSections[next],
      });
      sgDispatch({
        type: 'SECTION_NUMBER',
        payload: next,
      });
    }
  };

  const handleOnLoad = () => {
    sgDispatch({type: 'LOADING', payload: false});
    sgDispatch({type: 'BUFFERING', payload: false});
  };

  const getMinutesFromSeconds = (time: number) => {
    const minutes = time >= 60 ? Math.floor(time / 60) : 0;
    const seconds = Math.floor(time - minutes * 60);
    return `${minutes >= 10 ? minutes : '0' + minutes}:${
      seconds >= 10 ? seconds : '0' + seconds
    }`;
  };

  const onProgress = (data: iPlaybackShape) => {
    if (!sgState.loading && !sgState.paused) {
      sgDispatch({
        type: 'CURRENT_TIME',
        payload: data.currentTime,
      });
      sgDispatch({
        type: 'PLAYABLE_DURATION',
        payload: data.seekableDuration,
      });
      sgDispatch({
        type: 'TOTAL_PLAYER_TIME_AS_STRING',
        payload: getMinutesFromSeconds(sgState.playableDuration),
      });
      sgDispatch({
        type: 'CURRENT_PLAYER_TIME_AS_STRING',
        payload: getMinutesFromSeconds(sgState.currentTime),
      });

      let number = sgState.playableDuration - sgState.currentTime;

      sgDispatch({
        type: 'TIME_REMAINING_AS_STRING',
        payload: getMinutesFromSeconds(number),
      });
    }
  };

  const restartTheLesson = () => {
    sgDispatch({type: 'Paused', paylaod: false});
    videoRef.current.seek(0);
    setHidePauseMenu(!hidePauseMenu);
  };

  let displayThisVideo = (
    <Video
      source={{uri: sgState.videoPlaying}}
      onLoadStart={onLoadStart}
      onLoad={handleOnLoad}
      onEnd={onEnd}
      // onBuffer={() => sgDispatch({type: 'BUFFERING', payload: true})}
      onError={() => console.log('error')}
      style={styles.videoPortrait}
      paused={sgState.paused}
      fullscreen={false}
      fullscreenOrientation={'portrait'}
      ref={(video) => (videoRef.current = video)}
      onProgress={onProgress}
      progressUpdateInterval={500}
      resizeMode={'cover'}
    />
  );

  return (
    <View style={styles.wholePage}>
      <View style={styles.videoArea}>
        {sgState.videoPlaying ? displayThisVideo : null}
        <VideoControls />
      </View>
      <TitleBannerUnderVideo />
      <View style={styles.componentArea}>{children}</View>
      {sgState.paused && (
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
    height: '100%',
    minHeight: 400,
    width: width,
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
