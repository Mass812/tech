import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, FlatList} from 'react-native';

import {useQuery} from 'urql';
import {useNavigation} from '@react-navigation/native';
import Mega from '../Components/Mega';
import {ScrollView} from 'react-native-gesture-handler';
import InstructionalLessonCard from '../Components/UiCards/InstructionalLessonCard';
import LoadingScreen from './Loading';
import ErrorScreen from './ErrorScreen';
import Meditation from './Meditation';
import MeditationComponent from '../Components/MeditationComponent/MeditationComponent';
import InstructorProfileThumb from '../Components/UiCards/InstructorProfileThumb';
import RowSectionHeader from '../Components/ReusableComponents/RowSectionHeader';

const PopularQuery = `
query {
  popularLessons{
    id
    category
    length
    contentUrl
    img
    courseName
    equipment
    instructor
    weekNumber
    lessonNumber
    title
  }
  popularSelfGuided{
    id
    length
    equipment
    img
    title
  }
  popularMeditations{
    contentImg
   contentUrl
  length
  instructor
  description
  title
  }
}
`;

interface AllCoursesProps {
  courseName: string;
  instructor: string;
  lectureCount: string;
  keywords: string[];
  id: string;
  img: string;
  length: string;
  category: string;
  error: string;
  weekNumber: string;
  lessonNumber: string;
  title: string;
}

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const nav = useNavigation();

  const [result, reexecuteQuery] = useQuery({
    query: PopularQuery,
  });

  let {data, fetching, error} = result;

  if (fetching) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error.message} />;

  const sendToLesson = async (
    e: EventTarget,

    courseName: string,
    instructor: string,
    weekNumber: string,
    lessonNumber: string,
  ) => {
    nav.navigate('ClassDetail', {
      courseName,
      instructor,
      weekNumber,
      lessonNumber,
    });
  };

  console.log('homescreen data', data);

  const renderItem = ({item}: {item: AllCoursesProps}) => {
    return (
      <InstructionalLessonCard
        onPress={(e: EventTarget) =>
          sendToLesson(
            e,
            item.courseName,
            item.instructor,
            item.weekNumber,
            item.lessonNumber,
          )
        }
        superscriptTitle={item.instructor}
        img={item.img}
        title={item.title}
        additionalInfo={[`${item.weekNumber} ${item.lessonNumber}`]}
        length={item.length}
        wideDimension={false}
        category={item.category}
      />
    );
  };

  return (
    <ScrollView>
      <View style={styles.main}>
        <Mega />
      </View>

      <RowSectionHeader text={`Popular Classes`} />

      <View style={styles.bottom}>
        <FlatList
          data={data.popularLessons}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal={true}
        />

        <RowSectionHeader text={`Popular Meditations`} />
        <MeditationComponent
          dataProps={'popularMeditations'}
          horizontal={true}
          queryValue={PopularQuery}
        />

        <RowSectionHeader text={`Meet our instructors`} />
        <InstructorProfileThumb
          name={'Matt Wellman'}
          img={
            'https://elasticbeanstalk-us-east-2-325970805780.s3.us-east-2.amazonaws.com/fitness_mega_4.jpg'
          }
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    //  flex: 1,
  },
  main: {
    flex: 1,
    marginTop: -50,
  },
  bottom: {
    // flex: 1,
  },
});

export default Home;
