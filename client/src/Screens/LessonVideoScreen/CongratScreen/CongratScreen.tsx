import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Acheivement from './CongratScreenComponents/AcheivementBanner';
import CourseCompletedDetailBanner from './CongratScreenComponents/CourseCompletedDetailBanner/CourseCompletedDetailBanner';
import InstructorOutfitBlock from './CongratScreenComponents/InstructorOutfitBlock';
import {useMutation, useQuery} from 'urql';
import updateLessonPopularity from '../../../Urql_Requests/Mutations/UpdateVideoPopularity_LessonVideoScreen_PauseOptionCard';
import {VideoStore} from '../../../Context/LessonVideoContext';
import {AuthContext} from '../../../Context/AuthContext';
import LoadingScreen from '../../SplashScreens/Loading';
import ErrorScreen from '../../SplashScreens/ErrorScreen';

const showUserDetails = ` 
query($email: String!){
  user(email: $email){
    userWatchTime
    lessonsCompleted
    selfGuidedCompleted
    streak
  }
}
`;
interface CongratScreenProps {}

const CongratScreen: React.FC<CongratScreenProps> = () => {
  const {state: videoState, dispatch: videoDispatch} = useContext(VideoStore);
  const {instructor, courseName, weekNumber, lessonNumber} = videoState;
  const {state: authState, dispatch: authDispatch} = useContext(AuthContext);
  let {email, token} = authState;
  const [mutationData, executeMutation] = useMutation(updateLessonPopularity);
  const [minutes, setMinutesCalc] = useState<number>(0);
  const [seconds, setRemainingSecondsCalc] = useState<number>(0);
  const [queryState, setQueryState] = useState<number>(0);
  const nav = useNavigation();

  const [userInfo, reUser] = useQuery({
    query: showUserDetails,
    variables: {
      email: authState.email,
    },
    requestPolicy: 'network-only',
  });

  let {data, fetching, error} = userInfo;

  useEffect(() => {
    getMinutesFromSeconds();
    console.log('userInfo:: ', userInfo);
    console.log('data: ', data);
  }, [fetching]);

  if (fetching) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error.message} />;

  function getMinutesFromSeconds() {
    if (data?.user?.userWatchTime) {
      let time = data.user.userWatchTime;
      const minutes = time >= 60000 ? Math.floor(time / 60000) : 0;
      const y = Math.floor(time - minutes * 60000);
      const seconds = y / 1000;

      setMinutesCalc(minutes);
      setRemainingSecondsCalc(seconds);
    }
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
