import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Acheivement from './CongratScreenComponents/AcheivementBanner';
import CourseCompletedDetailBanner from './CongratScreenComponents/CourseCompletedDetailBanner/CourseCompletedDetailBanner';
import InstructorOutfitBlock from './CongratScreenComponents/InstructorOutfitBlock';
import {useMutation} from 'urql';
import updateLessonPopularity from '../../../Urql_Requests/Mutations/UpdateVideoPopularity_LessonVideoScreen_PauseOptionCard';
import {VideoStore} from '../../../Context/LessonVideoContext';
import {AuthContext} from '../../../Context/AuthContext';

interface CongratScreenProps {}

const CongratScreen: React.FC<CongratScreenProps> = () => {
  let {state, dispatch} = useContext(VideoStore);
  let {state: authState, dispatch: authDispatch} = useContext(AuthContext);
  let {email, token} = authState;
  const nav = useNavigation();
  const [data, executeMutation] = useMutation(updateLessonPopularity);

  const {instructor, courseName, weekNumber, lessonNumber} = state;

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

  console.log('congrats authState: ', authState);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Good Work, {email}!</Text>
      <Text style={styles.underTitle}>You completed today's class.</Text>
      <CourseCompletedDetailBanner />
      <Acheivement />
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
