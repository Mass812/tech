import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBolt} from '@fortawesome/free-solid-svg-icons';

interface WorkoutsAcheivementIconBlockProps {
  lessonsCompleted: number;
  selfGuidedCompleted: number;
}

const WorkoutsAcheivementIconBlock: React.FC<WorkoutsAcheivementIconBlockProps> = ({
  lessonsCompleted = 0,
  selfGuidedCompleted = 0,
}) => {
  return (
    <View style={styles.iconColumn}>
      <View style={styles.iconHalo}>
        <FontAwesomeIcon icon={faBolt} size={30} color={'#0896a3'} />
      </View>
      <Text style={styles.detailTitle}>Workouts</Text>
      <View style={styles.detailColumn}>
        <View style={styles.detailRow}>
          <Text style={styles.detalColored}>{lessonsCompleted} </Text>
          <Text style={styles.detailRegular}>classes</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detalColored}>{selfGuidedCompleted} </Text>
          <Text style={styles.detailRegular}> self-guided</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  iconColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: 130,
    justifyContent: 'center',
    padding: 5,
  },
  iconHalo: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#abced4',
    borderRadius: 30,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  detailColumn: {
    height: 36,
    marginTop: 4,
    justifyContent: 'flex-start',
  },
  detailTitle: {
    margin: 0,
    fontWeight: '700',
  },
  detailRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  detalColored: {
    color: 'teal',
  },
  detailRegular: {
    color: 'darkgrey',
  },
  detailOne: {
    fontWeight: '500',
    color: 'red',
  },
  detailTwo: {
    fontWeight: '500',
    color: 'seagreen',
  },
});
export default WorkoutsAcheivementIconBlock;
