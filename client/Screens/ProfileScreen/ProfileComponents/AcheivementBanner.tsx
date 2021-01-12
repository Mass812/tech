import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faClock, faDumbbell, faBolt} from '@fortawesome/free-solid-svg-icons';
import AcheivementIconBlock from './AcheivementBannerIconBlock';

interface AcheivementProps {
  subject?: string;
  dataPoints?: string;
}

const Acheivement: React.FC<AcheivementProps> = () => {
  return (
    <View style={styles.parent}>
      <Text style={styles.title}>WEEKLY PROGRESS</Text>
      <View style={styles.badgeRow}>
        <AcheivementIconBlock icon={faClock} textSubject={'Time'} />
        <AcheivementIconBlock icon={faDumbbell} textSubject={'Workouts'} />
        <AcheivementIconBlock icon={faBolt} textSubject={'Streak'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    borderColor: 'grey',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    color: 'grey',
    marginBottom: 15,
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
    padding: 1,
  },
});

export default Acheivement;
