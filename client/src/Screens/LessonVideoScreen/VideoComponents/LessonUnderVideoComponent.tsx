import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import RowSectionHeader from '../../../ReusableComponents/RowSectionHeader';

const MockDataArray = [
  {
    exerciseNumber: {exerciseCount: 10},
    exercises: [
      {id: 1, text: 'One arm pull ups', time: 3600},
      {id: 2, text: 'One arm pull ups', time: 3600},
      {id: 3, text: 'One arm pull ups', time: 1800},
      {id: 4, text: 'One arm pull ups', time: 3600},
      {id: 5, text: 'One arm pull ups', time: 1800},
      {id: 6, text: 'One arm pull ups', time: 3600},
    ],
  },
];

interface LessonUnderVideoContentProps {
  time: number;
  text: string;
  exerciseCount: number;
  exerciseNumber: iExerciseNumber;
}

interface iExerciseNumber {
  exerciseCount: number;
}

const LessonUnderVideoContent: React.FC<LessonUnderVideoContentProps> = () => {
  return (
    <View style={styles.container}>
      <View style={styles.thinHeaderBanner}>
        <Text>Exercises</Text>
        <Text>
          `${MockDataArray[0].exerciseNumber.exerciseCount} Exercises`
        </Text>
      </View>
      <View>
        <Text></Text>
      </View>
      <RowSectionHeader text={'Recommended for you'} />
      <View style={styles.tableRow}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',

    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  thinHeaderBanner: {
    height: 23,
    width: '100%',
    backgroundColor: 'lightgrey',
  },
  tableRow: {
    width: '100%',
    height: 150,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },

  title: {
    fontSize: 20,
    color: 'green',
  },
});
export default LessonUnderVideoContent;
