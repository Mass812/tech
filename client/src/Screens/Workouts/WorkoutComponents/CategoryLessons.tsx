import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
  Dimensions,
} from 'react-native';
import ProgramCard from '../../../ReusableComponents/UiCards/ProgramCard';
import {useQuery} from 'urql';
import LoadingScreen from '../../SplashScreens/Loading';
import ErrorScreen from '../../SplashScreens/ErrorScreen';
import {useNavigation, useRoute} from '@react-navigation/native';
import FindCoursesByCategory from '../../../Urql_Requests/Querys/FindCourseByCategory_WorkoutScreen';
import {
  WorkoutCardProps,
  Category,
  ParamList,
} from '../../../Interfaces/WorkoutScreenInterfaces';

const width = Dimensions.get('screen').width;

const WorkoutCard: React.FC<WorkoutCardProps> = () => {
  const nav = useNavigation();
  const route = useRoute<ParamList>();

  const {category} = route.params ?? 'HIIT';

  const [results] = useQuery({
    query: FindCoursesByCategory,
    variables: {category},
  });

  const {data, error, fetching} = results;

  if (fetching) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error.message} />;

  const renderItem = ({item}: {item: Category}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          nav.navigate('LessonDetail', {
            courseName: item.courseName,
            instructor: item.instructor,
            weekNumber: item.weekNumber,
            lessonNumber: item.lessonNumber,
          })
        }>
        <ProgramCard
          instructor={item.instructor}
          photo={`${item.img}`}
          title={item.courseName}
          bulletPoints={`Lesson ${item.lessonNumber} * ${item.length}`}
          button={false}
          displayAsCard={true}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.parent}>
      <FlatList
        data={data.categoryLessons}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    display: 'flex',
    width: width,
    // height: 800,
  },
});
export default WorkoutCard;
