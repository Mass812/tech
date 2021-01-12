import React, {useEffect} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  FlatList,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useQuery} from 'urql';
import ProgramCard from '../../ReusableComponents/UiCards/ProgramCard';
import CourseOverview from '../../ReusableComponents/UiCards/CourseOverview';
import LoadingScreen from '../SplashScreens/Loading';
import ErrorScreen from '../SplashScreens/ErrorScreen';
import FocusGraph from '../../ReusableComponents/FocusGraph/FocusGraph';

//courseName, instructor, lessonNumber, weekNumber
const findPopular = `
query ($courseName: String!, $instructor: String!, $lessonNumber: String!, $weekNumber: String!) {
    lesson(courseName: $courseName, instructor: $instructor, lessonNumber: $lessonNumber, weekNumber: $weekNumber){
      courseName
      instructor
      id
      description
      lessonNumber
      length
      created
      category
      img
      equipment
      weekNumber
      title
      contentUrl
      targetChestValue
      targetLegsValue
      targetArmsValue
      targetAbstValues
      targetBackValue
    }
  }
`;

interface LessonDetailProps {
  courseName: string;
  instructor: string;
  // targets: string;
  id: string;
  description: string;
  lessonNumber: string;
  length: string;
  created: string;
  category: string;
  equipment: string[];
  img: string;
  contentUrl: string;
  title: string;
  additionalInfo: string[];
  weekNumber: string;
  lectureNumber: string;
}

type CourseRelation = {
  img: string;
};

type ParamList = {
  courseName: string;
  weekNumber: string;
  lessonNumber: string;
  instructor: string;
  key: string;
  name: string;
  params: Params;
};

type Params = {
  courseName: string;
  weekNumber: string;
  lessonNumber: string;
  instructor: string;
};

const LessonDetail: React.FC<LessonDetailProps> = () => {
  const route = useRoute<ParamList>();
  const nav = useNavigation();

  let {courseName, weekNumber, lessonNumber, instructor} = route.params;

  const [result, reexecuteQuery] = useQuery({
    query: findPopular,
    variables: {courseName, instructor, lessonNumber, weekNumber},
  });

  let {data, fetching, error} = result;

  if (fetching) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error.message} />;

  const sendToProgram = (e: EventTarget, id: string, courseName: string) => {
    nav.navigate('ProgramDetail', {courseName});
  };

  console.log('LessonDetail Component: ', data.lesson);

  return (
    <ScrollView style={styles.container}>
      <ProgramCard
        button={true}
        buttonText={'Start Class'}
        // id={data.lesson.id}
        instructor={data.lesson.instructor}
        photo={data.lesson.img}
        title={data.lesson.title}
        bulletPoints={`Lesson ${data.lesson.lessonNumber}  *  ${data.lesson.length}`}
        displayAsCard={false}
        //TODO Link This to  All Course Videos Componet
        onPress={() => {
          console.log('Cless Detail prop contentUrl: ', data.lesson.contentUrl);

          nav.navigate('LessonVideoScreen', {
            contentUrl: data.lesson.contentUrl,
            weekNumber: data.lesson.weekNumber,
            lessonNumber: data.lesson.lessonNumber,
            courseName: data.lesson.courseName,
            instructor: data.lesson.instructor,
            title: data.lesson.title,
          });
          console.log('navigating later');
        }}
      />

      <CourseOverview
        equipment={data.lesson.equipment}
        instructor={data.lesson.instructor}
        length={data.lesson.length}
        targets={data.lesson.targets}
        courseName={data.lesson.courseName}
        // id={data.lesson.id}
        //  lectureCount={data.lesson.lectureCount}
        description={data.lesson.description}
        category={data.lesson.category}
        img={data.lesson.img}
        created={data.lesson.created}
        displayProgramLink={true}
        onPress={(e: EventTarget) =>
          sendToProgram(e, data.lesson.id, data.lesson.courseName)
        }
      />
      <FocusGraph
        //targetChestValue={data.lesson.  targetChestValue}
        targetLegsValue={data.lesson.targetLegsValue}
        targetArmsValue={data.lesson.targetArmsValue}
        targetAbstValues={data.lesson.targetAbstValues}
        targetBackValue={data.lesson.targetBackValue}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    color: 'green',
  },
});
export default LessonDetail;
