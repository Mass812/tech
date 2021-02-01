import {useMutation, useQuery} from 'urql';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Acheivement from './CongratScreenComponents/AcheivementBanner';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CourseCompletedDetailBanner from './CongratScreenComponents/CourseCompletedDetailBanner/CourseCompletedDetailBanner';
import InstructorOutfitBlock from './CongratScreenComponents/InstructorOutfitBlock';
import updateLessonPopularity from '../../../Urql_Requests/Mutations/UpdateVideoPopularity_LessonVideoScreen_PauseOptionCard';
import {VideoStore} from '../../../Context/LessonVideoContext';
import {AuthContext} from '../../../Context/AuthContext';
import LoadingScreen from '../../SplashScreens/Loading';
import ErrorScreen from '../../SplashScreens/ErrorScreen';
import {useNavigation} from '@react-navigation/native';
import userDetails from '../../../Urql_Requests/Querys/UserDetails_Congrats_Profile';

interface CongratScreenProps {}

const CongratScreen: React.FC<CongratScreenProps> = () => {
  const {state: videoState, dispatch: videoDispatch} = useContext(VideoStore);
  const {instructor, courseName, weekNumber, lessonNumber} = videoState;
  const {state: authState, dispatch: authDispatch} = useContext(AuthContext);
  let {email, token} = authState;
  const [mutationData, executeMutation] = useMutation(updateLessonPopularity);
  const [minutes, setMinutesCalc] = useState<number>(0);
  const [seconds, setRemainingSecondsCalc] = useState<number>(0);
  const nav = useNavigation();

  const [userInfo, reUser] = useQuery({
    query: userDetails,
    variables: {
      email: authState.email,
    },
    requestPolicy: 'network-only',
  });

  let {data, fetching, error} = userInfo;

  if (fetching) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error.message} />;
  if (minutes === 0 && seconds === 0) {
    getMinutesFromSeconds(userInfo.data.user.userWatchTime);
  }
  // TODO ADD TIME TO USER DOC
  const handleMarkAsCompleted = () => {
    executeMutation({
      instructor,
      courseName,
      weekNumber,
      lessonNumber,
    })
      .then(() => nav.navigate('Home'))
      .catch((err) => console.log(err));
  };

  function getMinutesFromSeconds(time: number) {
    //  let time = data.user.userWatchTime;
    const mins = time >= 60000 ? Math.floor(time / 60000) : 0;
    const y = Math.floor(time - mins * 60000);
    const secs = y / 1000;

    setMinutesCalc(mins);
    setRemainingSecondsCalc(secs);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Good Work, {email}!</Text>
      <Text style={styles.underTitle}>You completed today's class.</Text>
      <CourseCompletedDetailBanner />
      <Acheivement
        minutes={minutes}
        seconds={seconds}
        lessonsCompleted={data.user.lessonsCompleted}
        selfGuidedCompleted={data.user.selfGuidedCompleted}
        streak={data.user.streak}
      />

      <View></View>
      <InstructorOutfitBlock />
      <TouchableOpacity
        onPress={handleMarkAsCompleted}
        style={styles.buttonPink}>
        <Text style={styles.pinkButtonDetails}>Finish Workout</Text>
      </TouchableOpacity>
      <Text>user token: {token.substring(0, 14)}...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 23,
    color: 'black',
    marginBottom: 25,
  },
  underTitle: {
    fontSize: 14,
    marginBottom: 35,
  },

  buttonPink: {
    borderWidth: 0.5,
    backgroundColor: 'rgb(239,150,128)',
    minWidth: 400,
    color: 'white',
    padding: 10,
    alignSelf: 'center',
    borderRadius: 7,
    margin: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinkButtonDetails: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
export default CongratScreen;
