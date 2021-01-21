import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import TimeAcheivementIconBlock from './AcheivementIconBlock/TimeAcheivementIconBlock';
import WorkoutsAcheivementIconBlock from './AcheivementIconBlock/WorkoutsAchievementIconBlock';
import StreakAcheivementIconBlock from './AcheivementIconBlock/StreakAchievementIconBlock';
import {VideoStore} from '../../../../Context/LessonVideoContext';

interface AcheivementProps {
  subject?: string;
  dataPoints?: string;
  minutes: number;
  seconds: number;
  lessonsCompleted: number;
  selfGuidedCompleted: number;
  streak: number;
}

const Acheivement: React.FC<AcheivementProps> = ({
  minutes,
  seconds,
  lessonsCompleted,
  selfGuidedCompleted = 0,
  streak,
}) => {
  return (
    <View style={styles.parent}>
      <Text style={styles.title}>WEEKLY PROGRESS</Text>
      <View style={styles.badgeRow}>
        <TimeAcheivementIconBlock minutes={minutes} seconds={seconds} />
        <WorkoutsAcheivementIconBlock
          lessonsCompleted={lessonsCompleted}
          selfGuidedCompleted={selfGuidedCompleted}
        />
        <StreakAcheivementIconBlock streak={streak} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    borderColor: 'grey',
    // borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    color: 'grey',
    marginBottom: 10,
    letterSpacing: 4,
  },
  badgeRow: {
    borderTopColor: 'grey',
    borderTopWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    height: 130,
    width: '100%',
    justifyContent: 'space-evenly',
    paddingTop: 5,
  },
});

export default Acheivement;
