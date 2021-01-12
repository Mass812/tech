import {faTextWidth} from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import ProgramCard from '../../../ReusableComponents/UiCards/ProgramCard';
import {useQuery} from 'urql';
import LoadingScreen from '../../SplashScreens/Loading';
import ErrorScreen from '../../SplashScreens/ErrorScreen';

const width = Dimensions.get('screen').width;

const findCoursesByCategory = `
query($category: String!){
    coursesByCategory(category: $category){
        courseName
        instructor
        length
        equipment
        img
    }
}

`;

interface WorkoutCardProps {
  onPress: () => void;
  text: string;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({text, onPress}) => {
  const [results, reexecuteQuery] = useQuery({
    query: findCoursesByCategory,
    variables: {category: 'Cardio'},
  });

  const {data, error, fetching} = results;

  if (fetching) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error.message} />;

  console.log('WorkoutCard : ', data);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.parent}>
        <ProgramCard
          instructor={data.coursesByCategory[0].instructor}
          photo={data.coursesByCategory[0].img}
          title={data.coursesByCategory[0].courseName}
          bulletPoints={`${data.coursesByCategory[0].instructor} * ${data.coursesByCategory[0].length}`}
          button={false}
          id={data.coursesByCategory[0].id}
          displayAsCard={true}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  parent: {
    display: 'flex',
    width: width,
    minWidth: 200,
    maxWidth: 375,
    height: 220,
    margin: 10,
    alignSelf: 'center',
  },
  cardBlock: {
    display: 'flex',
    minWidth: 200,
    maxWidth: 375,
    height: 220,
    justifyContent: 'center',
    backgroundColor: 'tan',
    textAlign: 'center',
    borderRadius: 11,
  },
  image: {
    minWidth: 200,
    maxWidth: 375,
    height: 220,
    position: 'absolute',
    borderRadius: 11,
    opacity: 0.87,
  },
  text: {
    fontSize: 21,
    fontWeight: '500',
    color: 'white',
    alignSelf: 'center',
    textShadowColor: 'black',
    textShadowRadius: 9,
  },
});
export default WorkoutCard;
