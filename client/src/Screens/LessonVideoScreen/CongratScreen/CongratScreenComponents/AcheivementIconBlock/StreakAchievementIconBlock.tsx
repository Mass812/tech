import React, {useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faDumbbell} from '@fortawesome/free-solid-svg-icons';

interface StreakAcheivementIconBlockProps {
  streak: number;
}

const StreakAcheivementIconBlock: React.FC<StreakAcheivementIconBlockProps> = ({
  streak = 0,
}) => {
  return (
    <View style={styles.iconColumn}>
      <View style={styles.iconHalo}>
        <FontAwesomeIcon icon={faDumbbell} size={30} color={'#0896a3'} />
      </View>
      <Text style={styles.detailTitle}>Streak</Text>
      <View style={styles.detailColumn}>
        <View style={styles.detailRow}>
          <Text style={styles.detalColored}>{streak} </Text>
          <Text style={styles.detailRegular}> days</Text>
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
    backgroundColor: '#83c0c9',
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
export default StreakAcheivementIconBlock;
