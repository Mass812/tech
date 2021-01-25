import React, {useState, useRef} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {useQuery} from 'urql';
import {useNavigation} from '@react-navigation/native';
import {useScrollToTop} from '@react-navigation/native';
import Mega from './HomescreenComponents/Mega';
import {ScrollView} from 'react-native-gesture-handler';
import InstructionalLessonCard from '../../ReusableComponents/UiCards/InstructionalLessonCard';
import LoadingScreen from '../SplashScreens/Loading';
import ErrorScreen from '../SplashScreens/ErrorScreen';
import InstructorProfileThumb from '../../ReusableComponents/UiCards/InstructorProfileThumb';
import RowSectionHeader from '../../ReusableComponents/RowSectionHeader';
import HomeScreenMeditationComponent from '../MeditationScreen/MeditationComponents/HomeScreenMeditationComponent';
import PopularQuery_HomeScreen from '../../Urql_Requests/Querys/PopularQuery_HomeScreen';
import {
  PopularLessonsProps,
  PopularSelfGuided,
  MeditationProps,
} from '../../Interfaces/HomeScreenInterfaces';

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const nav = useNavigation();
  const screen = useRef<HTMLElement | any>(null);
  const [picsLoaded, setPicsLoaded] = useState<boolean>(false);
  useScrollToTop(screen);

  const [result, reexecuteQuery] = useQuery({
    query: PopularQuery_HomeScreen,
  });

  let {data, fetching, error} = result;

  if (fetching) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error.message} />;

  const renderPopularLessons = ({item}: {item: PopularLessonsProps}) => {
    const {
      courseName,
      instructor,
      weekNumber,
      lessonNumber,
      img,
      title,
      length,
      category,
      equipment,
    } = item;

    const lessonDetailParams = {
      courseName,
      instructor,
      weekNumber,
      lessonNumber,
    };

    return (
      <InstructionalLessonCard
        onPress={() => nav.navigate('LessonDetail', lessonDetailParams)}
        superscriptTitle={instructor}
        img={img}
        title={title}
        additionalInfo={equipment.slice(0, 2)}
        length={length}
        wideDimension={false}
        category={category}
      />
    );
  };

  const renderSelfGuided = ({item}: {item: PopularSelfGuided}) => {
    const {contentUrl, id, title, length, exerciseSections, img} = item;
    const selfGuidedParams = {contentUrl, id, title};
    return (
      <InstructionalLessonCard
        onPress={() => nav.navigate('SelfGuidedVideoScreen', selfGuidedParams)}
        superscriptTitle={exerciseSections}
        img={img}
        title={title}
        length={length}
        wideDimension={true}
      />
    );
  };

  const renderPopularMeditations = ({item}: {item: MeditationProps}) => {
    const {
      contentUrl,
      contentImg,
      instructor,
      category,
      length,
      title,
      description,
      id,
    } = item;
    const meditationParams = {
      contentUrl,
      contentImg,
      instructor,
      category,
      length,
      title,
      description,
      id,
    };
    return (
      <HomeScreenMeditationComponent
        img={contentImg}
        title={title}
        rowDetailOne={`${instructor}`}
        rowDetailTwo={`${length}`}
        onPress={() => nav.navigate('MeditationPlayer', meditationParams)}
      />
    );
  };

  return (
    <ScrollView ref={screen} decelerationRate={'fast'} scrollEventThrottle={9}>
      <View style={styles.main}>
        <Mega />
      </View>

      <RowSectionHeader text={`Popular Classes`} />
      <FlatList
        data={data.popularLessons}
        renderItem={renderPopularLessons}
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
      <FlatList
        data={data.popularMeditations}
        keyExtractor={(item) => item.id}
        renderItem={renderPopularMeditations}
        snapToAlignment={'center'}
        snapToInterval={350}
        decelerationRate={'fast'}
        scrollEventThrottle={8}
        showsHorizontalScrollIndicator={false}
        disableIntervalMomentum={true}
        horizontal={true}
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
  main: {
    flex: 1,
    marginTop: -50,
  },
});

export default Home;
