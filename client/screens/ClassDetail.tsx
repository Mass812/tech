import React from 'react';
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
import ProgramCard from '../Components/ProgramCard';
import CourseOverview from '../Components/CourseOverview';
import InstructionalLessonCard from '../Components/InstructionalLessonCard';





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

    }
  }
`;


interface ClassDetailProps {
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
  contentImg: string;
  contentUrl: string;
  title: string;
  additionalInfo: string[];
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

const ClassDetail: React.FC<ClassDetailProps> = () => {
  const route = useRoute<ParamList>();
  const nav = useNavigation();


  let courseName = route.params.courseName;
  
  const [result, reexecuteQuery] = useQuery({
    query: findCourse,
    variables: {courseName},
  });




  let {data, fetching, error} = result;

  if (fetching) return <Text>Loading...</Text>;
  if (error) return <Text>Oh no... {error.message}</Text>;

  const sendToLesson =  (
    e: EventTarget,
    id: string,
    courseName: string,
  ) => {
  
  //  nav.navigate('ProgramDetail', {courseName});
  };
  const sendToProgram =  (
    e: EventTarget,
    id: string,
    courseName: string,
  ) => {

    nav.navigate('Programs', {
      screen: 'ProgramDetail',
      params: { courseName },
    });

  };

  const renderItem = ({item}: {item: ClassDetailProps}) => {
    return (
      <InstructionalLessonCard
        key={item.id}
        img={item.contentImg}
        title={item.title}
        onPress={(e: EventTarget) => sendToLesson(e, item.id, item.courseName)}
        additionalInfo={item.equipment}
        length={item.length}
        wideDimension={false}
        id={item.id}
      />
    );
  };

  return (
    <ScrollView style={styles.container}>
      <ProgramCard
        button={true}
        buttonText={'Start Class'}
        id={data.course.id}
        instructor={data.course.instructor}
        photo={data.course.courseImg}
        title={data.course.courseName}
        bulletPoints={`${data.course.lectureCount} Classes *  ${data.course.length}`}
        //TODO Link This to  All Course Videos Componet
        onPress={() => console.log('send me to video lesson')}
      />
      <CourseOverview
        equipment={data.course.equipment}
        instructor={data.course.instructor}
        length={data.course.length}
        targets={data.course.targets}
        courseName={data.course.courseName}
        id={data.course.id}
        lectureCount={data.course.lectureCount}
        description={data.course.description}
        category={data.course.category}
        img={data.course.img}
        created={data.course.created}
        displayProgramLink={true}
        onPress={(e: EventTarget) => sendToProgram(e, data.course.id, data.course.courseName)}
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
export default ClassDetail;

 