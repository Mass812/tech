import React, {useEffect, useReducer} from 'react';
import {useRoute} from '@react-navigation/native';
import SgVideoPlayerPortraitWindow from './VideoComponents/SelfGuidedVideoPlayer';
import SelfGuidedUnderVideoComponent from '../SelfGuidedVideoScreen/VideoComponents/SelfGuidedUnderVideoComponent';
import {useQuery} from 'urql';
import LoadingScreen from '../SplashScreens/Loading';
import ErrorScreen from '../SplashScreens/ErrorScreen';
import {SgVideoPlayerProps} from '../../Interfaces/SelfGuidedVideoScreenInterfaces';
import getSelfGuidedWorkout from '../../Urql_Requests/Querys/GetSelfGuidedWorkout_SelfGuidedVideoScreen';
import {
  InitialState,
  sgVideoReducer,
  SgVideoStore,
} from '../../Context/SgVideoContext';

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
