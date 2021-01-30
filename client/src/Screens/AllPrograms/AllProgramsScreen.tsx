import React, {useRef} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useQuery} from 'urql';
import {useNavigation, useScrollToTop} from '@react-navigation/native';
import ProgramCard from '../../ReusableComponents/UiCards/ProgramCard';
import LoadingScreen from '../SplashScreens/Loading';
import ErrorScreen from '../SplashScreens/ErrorScreen';
import GetAllCourses from '../../Urql_Requests/Querys/GetAllCourses_ProgramsScreen';
import {iRenderAllCourseProps} from '../../Interfaces/ProgamsInterface';

interface ProgramsProps {}

const Programs: React.FC<ProgramsProps> = () => {
  const top = useRef<HTMLElement | any>(null);
  const nav = useNavigation();
  useScrollToTop(top);
  const [result] = useQuery({
    query: GetAllCourses,
  });

  let {data, fetching, error} = result;

  if (fetching) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error.message} />;

  const sendToLesson = (e: EventTarget, courseName: string) => {
    nav.navigate('ProgramDetail', {courseName});
  };

  const renderItem = ({item}: {item: iRenderAllCourseProps}) => {
    return (
      <TouchableOpacity
        onPress={(e: React.SyntheticEvent) => sendToLesson(e, item.courseName)}>
        <ProgramCard
          button={false}
          id={item.id}
          onPress={(e: EventTarget) => sendToLesson(e, item.courseName)}
          instructor={item.instructor}
          photo={item.courseImg}
          title={item.courseName}
          bulletPoints={`${item.lectureCount} Classes *  ${item.length}`}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.main} ref={top}>
      <FlatList
        data={data.courses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    height: '100%',
  },
});

export default Programs;
