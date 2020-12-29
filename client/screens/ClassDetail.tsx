import * as React from 'react';
import {View, ScrollView, StyleSheet, Text, Image} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useQuery} from 'urql';
import ProgramCard from '../Components/ProgramCard';
import CourseOverview from '../Components/CourseOverview';
import PopularClassesCard from '../Components/PopularClassesCard';

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
}

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

  const onPress = () => {
    console.log('hit the card');
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
        onPress={() => nav.navigate('Home')}
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
      />
      <PopularClassesCard
        img={'https://'}
        instructor={data.course.instructor}
        courseName={data.course.courseName}
        onPress={onPress}
        targets={data.course.targets}
        equipment={data.course.equipment}
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
