import React, {useState, useEffect} from 'react';
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
import InstructionalLessonCard from '../../ReusableComponents/UiCards/InstructionalLessonCard';
import LoadingScreen from '../SplashScreens/Loading';
import ErrorScreen from '../SplashScreens/ErrorScreen';
import FocusGraph from '../../ReusableComponents/FocusGraph/FocusGraph';
import GetSpecificCourse from '../../Urql_Requests/Querys/GetSpecificCourse_ProgramDetailScreen';
import {
  ProgramDetailProps,
  ParamList,
  LessonProps,
} from '../../Interfaces/ProgramDetailsScreenInterface';

const ProgramDetail: React.FC<ProgramDetailProps> = () => {
  const [showThis, setShowThis] = useState<any>('');
  const route = useRoute<ParamList>();
  const nav = useNavigation();

  let courseName = route.params.courseName;

  const [result, reexecuteQuery] = useQuery({
    query: GetSpecificCourse,
    variables: {courseName: courseName},
  });

  let {data, fetching, error} = result;

  if (fetching) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error.message} />;

  const onPress = (
    e: EventTarget,
    courseName: string,
    instructor: string,
    weekNumber: string,
    lessonNumber: string,
  ) => {
    nav.navigate('LessonDetail', {
      courseName,
      instructor,
      weekNumber,
      lessonNumber,
    });
  };

  console.log('desired state attribute: ', showThis);

  const renderItem = ({item}: {item: LessonProps}) => {
    const {
      img,
      title,
      equipment,
      length,
      id,
      instructor,
      courseName,
      weekNumber,
      lessonNumber,
    } = item;
    return (
      <InstructionalLessonCard
        img={img}
        title={title}
        additionalInfo={equipment}
        length={length}
        wideDimension={true}
        id={id}
        //   onPress={() => console.log('uh Oh')}
        onPress={(e: EventTarget) =>
          onPress(e, courseName, instructor, weekNumber, lessonNumber)
        }
      />
    );
  };

  return (
    <ScrollView style={styles.container}>
      <ProgramCard
        button={true}
        buttonText={'Start Program'}
        id={data.course.id}
        instructor={data.course.instructor}
        photo={data.course.courseImg}
        title={data.course.courseName}
        bulletPoints={`${data.course.lectureCount} Programes *  ${data.course.length}`}
        onPress={(e: EventTarget) =>
          onPress(
            e,
            data.course.courseRelation[0].courseName,
            data.course.courseRelation[0].instructor,
            data.course.courseRelation[0].weekNumber,
            data.course.courseRelation[0].lessonNumber,
          )
        }
        displayAsCard={false}
      />
      <CourseOverview
        equipment={data.course.equipment}
        instructor={data.course.instructor}
        length={data.course.length}
        targets={data.course.targets}
        courseName={data.course.courseName}
        // id={data.course.id}
        lectureCount={data.course.lectureCount}
        description={data.course.description}
        category={data.course.category}
        img={data.course.img}
      />
      <FocusGraph
        targetArmsValue={data.course.targetArmsValue}
        targetBackValue={data.course.targetBackValue}
        targetLegsValue={data.course.targetLegsValue}
        targetAbstValues={data.course.targetAbsValue}
      />
      <Text style={{margin: 12, fontSize: 23}}>Program BreakDown</Text>
      <FlatList<LessonProps>
        data={data.course.courseRelation}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal={true}
        snapToAlignment={'center'}
        snapToInterval={360}
        decelerationRate={'fast'}
        scrollEventThrottle={8}
        showsHorizontalScrollIndicator={false}
        disableIntervalMomentum={true}
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
export default ProgramDetail;
