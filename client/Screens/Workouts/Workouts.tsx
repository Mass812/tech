import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import LessonThumbnail from './WorkoutComponents/LessonThumbNail';
import WorkoutCard from './WorkoutComponents/WorkoutCards';

interface WorkoutsProps {
  text: string;
}

const Workouts: React.FC<WorkoutsProps> = ({text}) => {
  const nav = useNavigation();

  const handleBarreLookUp = () => {};
  const handleCardioLookUp = () => {};
  const handleDanceLookUp = () => {};
  const handleHIITLookUp = () => {};
  const handleMeditationsLookUp = () => {};
  const handlePilatesLookUp = () => {};
  const handleRecoveryLookUp = () => {};
  const handleStrengthLookUp = () => {};
  const handleToningLookUp = () => {};
  const handleYogaLookUp = () => {};

  return (
    <ScrollView>
      <View style={styles.container}>
        <LessonThumbnail text={'Barre'} onPress={handleBarreLookUp} />
        <LessonThumbnail text={'Cardio'} onPress={handleCardioLookUp} />
        <LessonThumbnail text={'Dance'} onPress={handleDanceLookUp} />
        <LessonThumbnail text={'HIIT'} onPress={handleHIITLookUp} />
        <LessonThumbnail
          text={'Meditations'}
          onPress={handleMeditationsLookUp}
        />
        <LessonThumbnail text={'Pilates'} onPress={handlePilatesLookUp} />
        <LessonThumbnail text={'Recovery'} onPress={handleRecoveryLookUp} />
        <LessonThumbnail text={'Strength'} onPress={handleStrengthLookUp} />
        <LessonThumbnail text={'Toning'} onPress={handleToningLookUp} />
        <LessonThumbnail text={'Yoga'} onPress={handleYogaLookUp} />
      </View>
      <WorkoutCard text={'Hi'} onPress={() => console.log('hitme')} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
    justifyContent: 'space-around',
    //padding: 30,
  },
});
export default Workouts;
