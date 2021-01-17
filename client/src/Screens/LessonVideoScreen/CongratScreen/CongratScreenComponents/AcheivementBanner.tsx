import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import TimeAcheivementIconBlock from './AcheivementIconBlock/TimeAcheivementIconBlock';
import WorkoutsAcheivementIconBlock from './AcheivementIconBlock/WorkoutsAchievementIconBlock';
import StreakAcheivementIconBlock from './AcheivementIconBlock/StreakAchievementIconBlock';
import {VideoStore} from '../../LessonVideoScreen';

interface AcheivementProps {
  subject?: string;
  dataPoints?: string;
}

const Acheivement: React.FC<AcheivementProps> = () => {
  const {state, dispatch} = React.useContext(VideoStore);

  return (
    <View style={styles.parent}>
      <Text style={styles.title}>WEEKLY PROGRESS</Text>
      <View style={styles.badgeRow}>
        <TimeAcheivementIconBlock accumulativeTime={888882} />
        <WorkoutsAcheivementIconBlock
          lessonsCompleted={1}
          selfGuidedCompleted={2}
        />
        <StreakAcheivementIconBlock streak={3} />
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
