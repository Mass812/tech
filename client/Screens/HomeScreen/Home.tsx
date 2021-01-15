import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
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
import ProgramCard from '../../ReusableComponents/UiCards/ProgramCard';
import HomeScreenMeditationComponent from '../MeditationScreen/MeditationComponents/HomeScreenMeditationComponent';

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
  equipment: string[];
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

interface MeditationProps {
  category?: string;
  contentUrl?: string;
  contentImg: string;
  description?: string;
  id?: string;
  instructor?: string;
  title: string;
  horizontal?: boolean;
  queryValue?: string;
  length?: string;
  dataProps?: string;
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
    id: string,
    title: string,
  ) => {
    nav.navigate('SelfGuidedVideoScreen', {
      contentUrl,
      id,
      title,
    });
  };

  const renderLessons = ({item}: {item: PopularLessonsProps}) => {
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
        additionalInfo={item.equipment.slice(0, 2)}
        length={item.length}
        wideDimension={false}
        category={item.category}
      />
    );
  };

  const renderSelfGuided = ({item}: {item: PopularSelfGuided}) => {
    return (
      <InstructionalLessonCard
        onPress={(e: EventTarget) =>
          sendToVideoScreen(e, item.contentUrl, item.id, item.title)
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

  const renderItem = ({item}: {item: MeditationProps}) => {
    return (
      <View key={item.id}>
        <TouchableOpacity
          key={item.id}
          onPress={() =>
            nav.navigate('MeditationPlayer', {
              contentUrl: item.contentUrl,
              contentImg: item.contentImg,
              instructor: item.instructor,
              category: item.category,
              length: item.length,
              title: item.title,
              description: item.description,
              id: item.id,
            })
          }>
          <HomeScreenMeditationComponent
            img={item.contentImg}
            title={item.title}
            rowDetailOne={`${item.instructor}`}
            rowDetailTwo={`${item.length}`}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView
      decelerationRate={'fast'}
      scrollEventThrottle={9}
      showsHorizontalScrollIndicator={false}
      horizontal={false}>
      <View style={styles.main}>
        <Mega />
      </View>

      <RowSectionHeader text={`Popular Classes`} />
      <FlatList
        data={data.popularLessons}
        renderItem={renderLessons}
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
      <FlatList<MeditationProps>
        data={data.popularMeditations}
        renderItem={renderItem}
        snapToAlignment={'center'}
        snapToInterval={300}
        decelerationRate={'fast'}
        scrollEventThrottle={8}
        showsHorizontalScrollIndicator={false}
        disableIntervalMomentum={true}
        horizontal={true}
      />
      {/* <MeditationComponent
        dataProps={'popularMeditations'}
        horizontal={true}
        queryValue={PopularQuery}
      /> */}

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
  main: {
    flex: 1,
    marginTop: -50,
  },
});

export default Home;
