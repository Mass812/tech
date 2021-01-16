import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useQuery} from 'urql';
import ProgramCard from '../../ReusableComponents/UiCards/ProgramCard';
import CourseOverview from '../../ReusableComponents/UiCards/CourseOverview';
import LoadingScreen from '../SplashScreens/Loading';
import ErrorScreen from '../SplashScreens/ErrorScreen';
import FocusGraph from '../../ReusableComponents/FocusGraph/FocusGraph';
import GetLesson_LessonDetailScreen from '../../Urql_Requests/Querys/GetLessons_LessonDetailScreen';
import {
  LessonDetailProps,
  ParamList,
} from '../../Interfaces/LessonDetailScreenInterfaces';

const LessonDetail: React.FC<LessonDetailProps> = () => {
  const nav = useNavigation();
  const route = useRoute<ParamList>();
  let {courseName, weekNumber, lessonNumber, instructor} = route.params;

  const [result] = useQuery({
    query: GetLesson_LessonDetailScreen,
    variables: {courseName, instructor, lessonNumber, weekNumber},
  });

  let {data, fetching, error} = result;

  let {
    img,
    contentUrl,
    length,
    title,
    targets,
    outfitTopName,
    outfitTopImgUrl,
    outfitBottomName,
    outfitBottomImgUrl,
    description,
    targetLegsValue,
    targetArmsValue,
    targetAbsValue,
    targetBackValue,
    id,
    equipment,
    category,
  } = data.lesson;

  if (fetching) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error.message} />;

  const sendToProgram = (e: EventTarget, id: string, courseName: string) => {
    nav.navigate('ProgramDetail', {courseName});
  };

  return (
    <ScrollView style={styles.container}>
      <ProgramCard
        button={true}
        buttonText={'Start Class'}
        instructor={instructor}
        photo={img}
        title={title}
        bulletPoints={`Lesson ${lessonNumber}  *  ${length}`}
        displayAsCard={false}
        onPress={() => {
          nav.navigate('LessonVideoScreen', {
            contentUrl,
            weekNumber,
            lessonNumber,
            courseName,
            instructor,
            title,
            targets,
            outfitTopName,
            outfitTopImgUrl,
            outfitBottomName,
            outfitBottomImgUrl,
          });
        }}
      />

      <CourseOverview
        equipment={equipment}
        instructor={instructor}
        length={length}
        courseName={courseName}
        description={description}
        targets={targets}
        category={category}
        img={img}
        displayProgramLink={true}
        onPress={(e: EventTarget) => sendToProgram(e, id, courseName)}
      />
      <FocusGraph
        //targetChestValue={targetChestValue}
        targetLegsValue={targetLegsValue}
        targetArmsValue={targetArmsValue}
        targetAbstValues={targetAbsValue}
        targetBackValue={targetBackValue}
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
