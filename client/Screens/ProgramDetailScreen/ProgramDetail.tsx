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

const findCourse = `
query ($courseName: String!) {
    course(courseName: $courseName){
      courseName
      instructor
      id
      description
      lectureCount
      length
      created
      category
      courseImg
      equipment
      targets
      courseRelation {
        contentUrl
        title
        id
        length
        img
        equipment
        weekNumber
        lessonNumber
        courseName
        instructor
      }
    }
  }
`;

interface ProgramDetailProps {
  courseName: string;
  instructor: string;
  targets: string;
  id: string;
  courseImg: string;
  description: string;
  lectureCount: string;
  length: string;
  created: string;
  category: string;
  equipment: string[];
  courseRelation: CourseRelation;
  img: string;
  contentUrl: string;
  title: string;
  additionalInfo: string[];
  weekNumber: string;
  lessonNumber: string;
}

type CourseRelation = {
  img: string;
};

type ParamList = {
  courseName: string;
  key: string;
  name: string;
  params: Params;
};

type Params = {courseName: string};

interface LessonProps extends ProgramDetailProps {
  e: EventTarget;
  courseName: string;
  instructor: string;
  weekNumber: string;
  lessonNumber: string;
}

const ProgramDetail: React.FC<ProgramDetailProps> = () => {
  const [showThis, setShowThis] = useState<any>('');
  const route = useRoute<ParamList>();
  const nav = useNavigation();

  let courseName = route.params.courseName;

  const [result, reexecuteQuery] = useQuery({
    query: findCourse,
    variables: {courseName},
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
    return (
      <InstructionalLessonCard
        key={item.id}
        img={item.img}
        title={item.title}
        additionalInfo={item.equipment}
        length={item.length}
        wideDimension={true}
        id={item.id}
        //   onPress={() => console.log('uh Oh')}
        onPress={(e: EventTarget) =>
          onPress(
            e,
            item.courseName,
            item.instructor,
            item.weekNumber,
            item.lessonNumber,
          )
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
        //TODO Link This to  All Course Videos Componet
        onPress={() => nav.navigate('Home')}
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
        created={data.course.created}
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
