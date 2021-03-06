import React, {useEffect, useReducer} from 'react';
import {useRoute} from '@react-navigation/native';
import LesonVideoPlayer from './VideoComponents/LessonVideoPlayer';
import CourseOverview from '../../ReusableComponents/UiCards/CourseOverview';
import CongratScreen from './CongratScreen/CongratScreen';
import {
  Action,
  iVideoPlayerProps,
} from '../../Interfaces/LessonVideoScreenInterface';
import {
  InitialState,
  videoReducer,
  VideoStore,
} from '../../Context/LessonVideoContext';

const VideoPlayer: React.FC<iVideoPlayerProps> = () => {
  const [state, dispatch] = useReducer(videoReducer, InitialState);
  const videoRedux = React.useMemo(() => ({state, dispatch}), [
    state,
    dispatch,
  ]);

  const route = useRoute<iVideoPlayerProps>();
  let {
    title,
    contentUrl,
    instructor,
    weekNumber,
    lessonNumber,
    length,
    courseName,
    outfitTopName,
    outfitTopImgUrl,
    outfitBottomName,
    outfitBottomImgUrl,
    targets,
  } = route.params;

  useEffect(() => {
    dispatch({type: 'COURSE_NAME', payload: courseName ?? ''});
    dispatch({type: 'TITLE', payload: title ?? ''});
    dispatch({type: 'INSTRUCTOR', payload: instructor ?? ''});
    dispatch({type: 'WEEK_NUMBER', payload: weekNumber ?? ''});
    dispatch({type: 'LESSON_NUMBER', payload: lessonNumber ?? ''});
    dispatch({type: 'CLOTHING_TOP_NAME', payload: outfitTopName ?? ''});
    dispatch({type: 'CLOTHING_TOP_IMG', payload: outfitTopImgUrl ?? ''});
    dispatch({type: 'CLOTHING_BOTTOM_NAME', payload: outfitBottomName ?? ''});
    dispatch({type: 'CLOTHING_BOTTOM_IMG', payload: outfitBottomImgUrl ?? ''});
    dispatch({type: 'TARGETS', payload: targets ?? ['Whole Body']});
    dispatch({type: 'LENGTH', payload: length ?? ''});
  }, []);

  return (
    <VideoStore.Provider value={videoRedux}>
      {state.lessonCompleted ? (
        <CongratScreen />
      ) : (
        <LesonVideoPlayer contentUrl={contentUrl}>
          {/*            Any Component Child Can go here */}
          <CourseOverview
            courseName={state.courseName}
            instructor={'Matt Wellman'}
            length={'23 minutes'}
            equipment={['Rug', 'flying carpet']}
            targets={['upper body']}
            category={'Jump Rope'}
            img={
              'data:image/jpeg;base64,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'
            }
            description={'Awesomeness'}
          />
        </LesonVideoPlayer>
      )}
    </VideoStore.Provider>
  );
};

export default VideoPlayer;
