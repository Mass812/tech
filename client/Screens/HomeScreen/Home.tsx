import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, FlatList} from 'react-native';

import {useQuery} from 'urql';
import {useNavigation} from '@react-navigation/native';
import Mega from './Mega';
import {ScrollView} from 'react-native-gesture-handler';
import InstructionalLessonCard from '../../ReusableComponents/UiCards/InstructionalLessonCard';
import LoadingScreen from '../SplashScreens/Loading';
import ErrorScreen from '../SplashScreens/ErrorScreen';
import MeditationComponent from '../MeditationScreen/MeditationComponent';
import InstructorProfileThumb from '../../ReusableComponents/UiCards/InstructorProfileThumb';
import RowSectionHeader from '../../ReusableComponents/RowSectionHeader';

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
    img
    id
    length
    equipment
    title
    contentUrl
    
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
interface PopularLessonsProps {
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
  equipemnt: string[];
}

interface PopularSelfGuided {
  contentUrl: string;
  title: string;
  length: string;
  id: string;
  exerciseSections: string;
  img: string;
  equipment: [string];
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

  const sendToLessonDetail = (
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

  const sendToVideoScreen = (
    e: EventTarget,
    contentUrl: string,
    exerciseSections: string,
    length: string,
    id: string,
    title: string,
    img: string,
  ) => {
    nav.navigate('SelfGuidedVideoScreen', {
      contentUrl,
      exerciseSections,
      id,
      length,
      title,
      img,
    });
  };

  const renderPopular = ({item}: {item: PopularLessonsProps}) => {
    return (
      <InstructionalLessonCard
        onPress={(e: EventTarget) =>
          sendToLessonDetail(
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
      />
    );
  };

  const renderSelfGuided = ({item}: {item: PopularSelfGuided}) => {
    return (
      <InstructionalLessonCard
        onPress={(e: EventTarget) =>
          sendToVideoScreen(
            e,
            item.contentUrl,
            item.exerciseSections,
            item.length,
            item.id,
            item.title,
            item.img,
          )
        }
        superscriptTitle={item.exerciseSections}
        img={item.img}
        title={item.title}
        //  additionalInfo={[`${item.weekNumber} ${item.lessonNumber}`]}
        length={item.length}
        wideDimension={true}
      />
    );
  };

  return (
    <ScrollView
      decelerationRate={'fast'}
      scrollEventThrottle={9}
      showsHorizontalScrollIndicator={false}
      // disableIntervalMomentum={true}
    >
      <View style={styles.main}>
        <Mega />
      </View>

      <RowSectionHeader text={`Popular Classes`} />
      {/*          290, 350                 */}
      <FlatList
        data={data.popularLessons}
        renderItem={renderPopular}
        keyExtractor={(item) => item.id}
        horizontal={true}
        snapToAlignment={'center'}
        snapToInterval={300}
        decelerationRate={'fast'}
        scrollEventThrottle={8}
        showsHorizontalScrollIndicator={false}
        disableIntervalMomentum={true}
      />

      <RowSectionHeader text={`Popular Self Guided`} />
      <FlatList
        data={data.popularSelfGuided}
        renderItem={renderSelfGuided}
        keyExtractor={(item) => item.id}
        horizontal={true}
        snapToAlignment={'center'}
        snapToInterval={360}
        decelerationRate={'fast'}
        scrollEventThrottle={8}
        showsHorizontalScrollIndicator={false}
        disableIntervalMomentum={true}
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
