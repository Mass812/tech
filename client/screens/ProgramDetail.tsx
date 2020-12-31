import React, {useState} from 'react';
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
import {NavigationParamContext} from '../Context/NavagationParamConext'
import { paramReducer } from './ClassDetail';



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
        contentImg
        equipment

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

  if (fetching) return <Text>Loading...</Text>;
  if (error) return <Text>Oh no... {error.message}</Text>;

  const onPress = () => {
    console.log('hit the card');
    setShowThis(data.course);
  };
  console.log('desired state attribute: ', showThis);

  const renderItem = ({item}: {item: ProgramDetailProps}) => {
    return (
    

      <InstructionalLessonCard
        key={item.id}
        img={item.contentImg}
        title={item.title}
        onPress={onPress}
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
        buttonText={'Start Program'}
        id={data.course.id}
        instructor={data.course.instructor}
        photo={data.course.courseImg}
        title={data.course.courseName}
        bulletPoints={`${data.course.lectureCount} Programes *  ${data.course.length}`}
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

      <Text style={{margin: 12, fontSize: 23}}>Program BreakDown</Text>
      <FlatList
        data={data.course.courseRelation}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal={true}
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