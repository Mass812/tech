import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollViewComponent,
} from 'react-native';
import {useQuery} from 'urql';
import {useNavigation} from '@react-navigation/native';
import Mega from '../HomeScreen/Mega';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ProgramCard from '../../ReusableComponents/UiCards/ProgramCard';
import LoadingScreen from '../SplashScreens/Loading';
import ErrorScreen from '../SplashScreens/ErrorScreen';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const CoursesQuery = `
query {
    courses {
        courseName
        instructor
        description
        lectureCount
        length
        equipment
        id
        courseImg
    }
}
`;

interface AllCoursesProps {
  courseName: string;
  instructor: string;
  description: string;
  lectureCount: string;
  length: string;
  created: string;
  equipment: string[];
  id: string;
  courseImg: string;
}

interface ProgramsProps {}

const Programs: React.FC<ProgramsProps> = () => {
  const nav = useNavigation();

  const [result, reexecuteQuery] = useQuery({
    query: CoursesQuery,
  });

  let {data, fetching, error} = result;

  if (fetching)
    return (
      <View style={styles.main}>
        <LoadingScreen />
      </View>
    );
  if (error) return <ErrorScreen error={error.message} />;

  const sendToLesson = async (e: EventTarget, courseName: string) => {
    nav.navigate('ProgramDetail', {courseName});
  };

  const renderItem = ({item}: {item: AllCoursesProps}) => {
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
    <View style={styles.main}>
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
  bottom: {},
});

export default Programs;
